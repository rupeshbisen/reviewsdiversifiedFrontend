import { useContext, useEffect, useState } from "react";
import QrCode from "../assets/QrCode.jpeg"
import { registerUserType } from "./Signup";
import { AuthContext } from "../contexts";
import ComponentLevelLoader from "../components/loader/ComponentLevelLoader";
import { createAddFund, getAllFundForUser } from "../service/addFund";
import { toast } from "react-toastify";
import Notification from "../components/Notification";
import { PulseLoader } from "react-spinners";
import moment from "moment";

export interface addFund {
  _id?: string
  user?: registerUserType,
  isProcessing?: boolean,
  createdAt?: string,
  orderId: string,
  amount: number,
}

const addFundData: addFund = {
  orderId: "",
  amount: 0,
}
export default function Services() {
  const [formData, setFormData] = useState(addFundData);

  const {
    user,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
    allFundForUser,
    setAllFundForUser,
  } = useContext(AuthContext);

  function isFormValid() {
    return formData &&
      formData.orderId &&
      formData.orderId.trim() !== "" &&
      formData.amount &&
      formData.amount > 0
  }

  async function handleAddFunds() {
    setComponentLevelLoader({ loading: true, id: "" });
    const createFinalCheckoutFormData = {
      ...formData,
      user: user?._id,
      isProcessing: true,
      paidAt: new Date(),
    }
    const res = await createAddFund(createFinalCheckoutFormData as addFund);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(addFundData);
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllFund()
    } else {
      toast.error(res.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function extractAllFund() {
    setPageLevelLoader(true);
    const res = await getAllFundForUser(user?._id as string);

    if (res.success) {
      setPageLevelLoader(false);
      const date = res.data.createdAt
      const formattedDate = moment(date).format('DD/MM/YYYY');

      const updatedArrayOfObjects = res.data.map((obj: addFund) => ({
        ...obj,
        createdAt: formattedDate
      }));

      setAllFundForUser(updatedArrayOfObjects);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllFund();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div className="bg-white m-8 p-8 pt-5 rounded-lg">
      <div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Method</label>
          <select
            className="w-full py-2 outline-none text-gray-600 px-3 bg-gray-200 text-sm rounded-lg"
            value="Paytm / Phonepay (Min 50 INR)"
          >
            <option>Paytm / Phonepay (Min 50 INR)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Order Id / Transaction Id</label>
          <input className="w-full py-2 outline-none text-gray-700 px-3 bg-gray-200 text-sm rounded-lg"
            type="text" value={formData.orderId}
            onChange={(event) => {
              setFormData({
                ...formData,
                orderId: event.target.value,
              });
            }} />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Amount</label>
          <input className="w-full py-2 outline-none text-gray-700 px-3 bg-gray-200 text-sm rounded-lg"
            type="number" value={formData.amount}
            onChange={(event) => {
              setFormData({
                ...formData,
                amount: parseInt(event.target.value)
              });
            }} />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Instruction</label>
          <div className="text-center leading-10 text-blue-800 text-2xl font-serif font-semibold">
            <p className="text-red-500">We Are Keep Changing Qr Codes So Please Check Before Paying🙏</p>
            <p>Step:1 - Scan the barCodes</p>
            <p>Step:2 - Pay Amount</p>
            <p>Step:3 - Put Amount & Transaction ID</p>
            <p>Step:4 - Click on Pay Button</p>
          </div>
        </div>

        <div>
          <img src={QrCode} alt="this is qr" className="w-full md:w-1/2 md:mx-auto" />
        </div>

        <button
          className="disabled:opacity-50 inline-flex items-center justify-center bg-blue-950 my-5 text-white text-lg font-bold w-full p-3 rounded-lg
          transition-all duration-200 ease-in-out focus:shadow "
          disabled={!isFormValid()}
          onClick={handleAddFunds}
        >
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader
              text={"Check"}
              color={"#ffffff"}
              loading={
                componentLevelLoader && componentLevelLoader.loading
              }
            />
          ) : (
            "Check"
          )}
        </button>

        <div className="m-9 p-5 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-gray-800">
                <th className="px-2">Id</th>
                <th className="px-2">Date</th>
                <th className="px-2">Method</th>
                <th className="px-2">Amount</th>
                <th className="px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {allFundForUser.map((value, index) => (
                <tr key={value._id} className={`text-gray-700 text-center ${index % 2 === 0 ? 'bg-pink-100' : ''}`}>
                  <td className="p-3">{value.orderId}</td>
                  <td className="p-3">{value.createdAt}</td>
                  <td className="p-3">Paytm / Phonepay</td>
                  <td className="p-3">{value.amount}</td>
                  <td className="p-3">
                    {value.isProcessing
                      ? "In Process"
                      : "Completed"
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Notification />
    </div>
  )
}
