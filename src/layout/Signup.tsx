import { useContext, useEffect, useState } from "react";
import { SignupFormControls } from "../utils";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../service/register";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts";
import ComponentLevelLoader from "../components/loader/ComponentLevelLoader";

export interface registerUserType {
  username: string;
  email: string;
  phoneNumber: string;
  city: string;
  password: string;
  confirmPassword: string;
  role?:string;
  [key: string]: string | undefined ;
}
const initialFormData: registerUserType = {
  username: "",
  email: "",
  phoneNumber: "",
  city: "",
  password: "",
  confirmPassword: "",
}
export default function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  function isFormValid() {
    return formData &&
      formData.username &&
      formData.username.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.phoneNumber &&
      formData.phoneNumber.trim() !== "" &&
      formData.city &&
      formData.city.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword
      ? true
      : false;
  }
  async function handleSignup() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      navigate("/")
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }
  }

  useEffect(() => {
    if (isAuthUser) navigate("/");
  }, [isAuthUser, navigate]);

  return (

    <div className="">
      <h2 className="text-4xl text-white my-5 font-bold text-center">The Cheapest & Best SMM Panel</h2>
      <div className="flex flex-col items-center justify-between py-8 pr-10 pl-10 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl text-gray-900 font-medium text-center font-serif">
                Sign up
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {SignupFormControls.map((controlItem) =>
                  <div key={controlItem.id} className="relative">
                    <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                      {controlItem.label}
                    </p>
                    <input
                      placeholder={controlItem.placeholder}
                      type={controlItem.type}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                      value={formData[controlItem.id] as string}
                      className="border placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                  </div>
                )}
                <button
                  className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-blue-950 px-6 py-4 text-lg rounded-xl
                                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isFormValid()}
                  onClick={handleSignup}
                >
                  {pageLevelLoader ? (
                    <ComponentLevelLoader
                      text={"Registering"}
                      color={"#ffffff"}
                      loading={pageLevelLoader}
                    />
                  ) : (
                    "Sign up"
                  )}
                </button>
                <div className="flex flex-col gap-2 text-center">
                  <p className='text-gray-800' >Already have an account ? <a href="/" className="text-blue-700">Sign in</a> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
