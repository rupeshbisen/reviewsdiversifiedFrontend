import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/login";
import Notification from "../components/Notification";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts";
import ComponentLevelLoader from "../components/loader/ComponentLevelLoader";
import Accordion from "../components/Accodion";

export interface loginUserTypes {
  email: string
  password: string
}

const initialFormdata: loginUserTypes = {
  email: "",
  password: "",
};
export default function Login() {

  const LoginCard = [
    {
      src: "1",
      title: '1. Sign up',
      description: 'Register into our panel, fill in all the necessary data and get ready to be famous.',
    },
    {
      src: "2",
      title: '2. Add funds',
      description: 'Add money to your SMM account and be ready to rise like a star and give your business a new height.',
    },
    {
      src: "3",
      title: '3. Choose service',
      description: 'Select a service and place an order and get ready to start receiving more publicity on social media.',
    },
    {
      src: "4",
      title: '4. Enjoy popularity',
      description: 'We will create and proceed with an order and inform you once done. Enjoy and stay with us. ',
    },
  ]

  const featureData = [
    {
      icon: "fa fa-solid fa-trophy",
      title: 'Great quality',
      description: 'The quality of our SMM services will pleasantly surprise you.',
      color: 'text-green-600'
    },
    {
      icon: "fa fa-solid fa-credit-card",
      title: 'Multiple payment systems',
      description: 'Great variety of payment methods for you to choose from.',
      color: 'text-blue-600'
    },
    {
      icon: "fa-solid fa-sack-dollar",
      title: 'Really cheap',
      description: 'SMM services that we offer on our panel are extremely cheap.',
      color: 'text-yellow-600'
    },
    {
      icon: "fa fa-solid fa-gauge-high",
      title: 'Extra quick delivery',
      description: 'Customer orders on our panel are processed very fast.',
      color: 'text-pink-600'
    },
  ]

  const AccordionData = [
    {
      heading: 'An SMM panel — what is it?',
      dis: 'An SMM panel is an online store that sells various SMM services.',
    },
    {
      heading: 'What kinds of SMM services can I buy here?',
      dis: 'On our panel you can find different SMM services: followers, likes, views, etc.',
    },
    {
      heading: 'Is it safe to buy SMM services on this panel?',
      dis: 'Sure! Our SMM services are safe to use, you wont get banned or anything like that.',
    },
    {
      heading: 'What is the mass order feature for?',
      dis: 'Using mass orders, it is easy to place several orders with different links at the same time.',
    },
    {
      heading: 'What does "Drip-feed" mean?',
      dis: 'Using Drip-feed helps build the engagement at the speed you want. Here is an example: you order 2000 likes on your IG post, you can either get all 2000 at once or make the process more gradual — as an option, 200 likes per day for 10 days.',
    },
    {
      heading: 'How do mass orders work?',
      dis: 'The mass order option makes it easy to place several orders with different links at the same time.',
    }
  ]

  const custData = [
    {
      desc: 'SMM services I got here did exactly what I expected them to do — they helped my business get more attention and increased my sales. Thank you!',
      title: 'Roberto Santos',
    },
    {
      desc: 'This SMM panel is incredible! All services are so cheap and yet their quality does not disappoint. I m now your regular customer.',
      title: 'Brian Delaney',
    },
    {
      desc: 'No matter how much I tried to promote my business online, I did not get good results. I was just a beginner small business owner so I did not have lots of money to spend on professional online promos. Using this panel helped me save a TON on SMM services.',
      title: 'Adam Lim',
    },
    {
      desc: 'I have been looking for the best SMM solution for my company for some time. It was not really cost-effective to spend those sums that SMM agencies ask for so I wanted something much simpler and cheaper. This panel has everything I need and more.',
      title: 'Devesh Mannan',
    }
  ]

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
    <div>
      <div className="max-w-screen-xl mx-auto px-2">
        <h2 className="text-4xl text-white my-5 font-bold text-center">The Cheapest & Best SMM Panel</h2>
        <div className=" ml-4">
          <ul className="text-white list-disc">
            <li>Main Supplier of SMM Services</li>
            <li>Whatsapp Support ⚡</li>
            <li>We beat any price/any quality !</li>
            <li>Best panel Support in the market !</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-between pt-0 pb-0 px-2 md:px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
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
        <div className="text-center">
          <h1 className="text-3xl text-white my-8 font-bold">Best Indian SMM Followers Panel</h1>
          <p className="text-white mb-8">SMM (Social Media Marketing) is the use of social media platforms such as Instagram, Facebook, Twitter, Youtube and many more to promote yourself or your company. If you are looking for a way to boost your online presence, then your best choice is our SMM panel where we offer services to help you boost your online presence across all social media platforms at the cheapest prices.</p>
        </div>

        <div className="text-center my-20">
          <h1 className="text-3xl text-white my-8 font-bold">Where to begin?</h1>
          <p className="text-white">Want to start placing orders on our panel? Follow these 4 easy steps.</p>
        </div>

        <div className="mx-5">
          {
            LoginCard.map((value, index: number) => (
              <div key={index} className="mb-20 w-full md:w-1/2 md:mx-auto bg-white p-5 rounded-lg flex justify-around items-center">
                <div className="text-5xl px-4">
                  <p>{value.src}</p>
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-bold">{value.title}</h1>
                  <br />
                  <p>{value.description}</p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12 mx-4">
          {
            featureData.map((value, index: number) => (
              <div key={index} className="md:p-5 rounded-lg flex justify-around items-center mb-5">
                <div className={`text-5xl bg-white p-3 rounded-full ${value.color}`}>
                  <i className={value.icon}></i>
                </div>
                <div className="text-white ml-2">
                  <h1 className="text-xl font-bold">{value.title}</h1>
                  <br />
                  <p className="text-white">{value.description} </p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 md:mx-4">
          {AccordionData.map((value, index) => (
            <Accordion key={index} value={value} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 mx-4">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p>Check out what our customers have to say about our panel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {custData.map((value, index: number) => (
              <div key={index} className="bg-white px-8 py-8 pt-5 rounded-lg w-full">
                <p>{value.desc}</p>
                <h1 className="font-bold">{value.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-6">
        <p className="text-center text-gray-600">© Copyright. All Rights Reserved.</p>
      </div>
    </div>
  )
}
