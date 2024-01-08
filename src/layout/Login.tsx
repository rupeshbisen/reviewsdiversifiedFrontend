import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/login";
import Notification from "../components/Notification";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts";
import ComponentLevelLoader from "../components/loader/ComponentLevelLoader";

export interface loginUserTypes {
  email: string
  password: string
}

const initialFormdata: loginUserTypes = {
  email: "",
  password: "",
};
export default function Login() {

  const {
    isAuthUser,
    setIsAuthUser,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader, } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormdata);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }
  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.data?.user);
      setFormData(initialFormdata);
      localStorage.setItem("token", res?.data?.accessToken);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  useEffect(() => {
    if (isAuthUser) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthUser]);

  return (
    <div className="">
      <h2 className="text-4xl text-white my-5 font-bold text-center">The Cheapest & Best SMM Panel</h2>
      <div className="flex justify-center">
        <ul className="text-white list-disc">
          <li>Main Supplier of SMM Services</li>
          <li>Whatsapp Support ⚡</li>
          <li>We beat any price/any quality !</li>
          <li>Best panel Support in the market !</li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl text-black font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <div className="relative">
                  <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                    Email
                  </p>
                  <input
                    placeholder='Enter your email'
                    type="Email"
                    value={formData.email}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      });
                    }}
                    className="border placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                    Password
                  </p>
                  <input
                    placeholder='Enter your password'
                    type='password'
                    value={formData.password}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        password: event.target.value,
                      });
                    }}
                    className="border placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-blue-950 px-6 py-4 text-lg rounded-xl
                                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging In"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2 text-center">
                  <p className='text-gray-800' >Do not have an account ? <a href="signup" className='text-blue-700'>Sign up</a> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
      <h1 className="text-3xl text-white my-5 font-bold text-center">Best Indian SMM Followers Panel</h1>
    </div>
  )
}
