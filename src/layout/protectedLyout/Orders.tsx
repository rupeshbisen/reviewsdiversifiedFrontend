import { useContext, useEffect } from "react";
import { getAllOrdersForUser } from "../../service/order";
import { AuthContext } from "../../contexts";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import moment from "moment";
import { orderTypes } from "./admin/AdminNewOrder";

export default function Ticket() {

  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(AuthContext);

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id as string);

    if (res.success) {
      setPageLevelLoader(false);
      const date = res.data.createdAt
      const formattedDate = moment(date).format('DD/MM/YYYY');

      const updatedArrayOfObjects = res.data.map((obj: orderTypes) => ({
        ...obj,
        createdAt: formattedDate
      }));

      setAllOrdersForUser(updatedArrayOfObjects);
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
    if (user !== null) extractAllOrders();
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
    <div className="my-12">
      <div className="bg-white mx-9 px-8 py-8 pt-5 rounded-lg">
        <h1 className="font-bold"><u>HAVING ANY ISSUE IN ORDER?</u> <a href="/tickets" className="text-blue-700">CLICK HERE FOR SEND NEW TICKET</a></h1>
      </div>

      <div className="bg-white m-9  px-8 rounded-lg py-6 overflow-x-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-200 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="w-full text-gray-700 bg-gray-200 py-2 outline-none"
            type="text"
            placeholder="Search something.." />
        </div>
        <div>
          <table className="w-full mt-9 table-auto">
            <thead>
              <tr className="border-b border-gray-200 text-gray-800">
                <th className="px-2">Id</th>
                <th className="px-2">Date</th>
                <th className="px-2">Link</th>
                <th className="px-2">Charge</th>
                <th className="px-2">Quantity</th>
                <th className="px-2">Service</th>
                <th className="px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                allOrdersForUser.map((value,index) => (
                  <tr key={value._id} className={`text-gray-700 text-center ${index % 2===0 ? 'bg-pink-100' : ''}`}>
                    <td className="p-3">{value._id}</td>
                    <td className="b-3">{value.createdAt}</td>
                    <td className="p-3">{value.link}</td>
                    <td className="p-3">{value.charges}</td>
                    <td className="p-3">{value.quantity}</td>
                    <td className="p-3">{value.service}</td>
                    <td className="p-3">
                      {value.isProcessing
                        ? "In Process"
                        : "Completed"
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <Notification />
    </div>
  )
}