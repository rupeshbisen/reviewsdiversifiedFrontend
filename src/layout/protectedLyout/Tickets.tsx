import { useContext, useEffect, useState } from "react";
import { createTicket, getAllTicketForUser } from "../../service/ticket";
import { AuthContext } from "../../contexts";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../../components/loader/ComponentLevelLoader";
import Notification from "../../components/Notification";
import { registerUserType } from "../Signup";
import moment from "moment";
import { PulseLoader } from "react-spinners";

// interface File {
//   name: string;
//   type: string;
//   size: number;
// }
export interface ticketTypes {
  _id?: string;
  user?: registerUserType;
  orderId: string
  subject: string;
  message: string;
  isProcessing: boolean;
  updatedAt?: string
  // attachment:File|null
}

const initialTicketdata: ticketTypes = {
  orderId: "",
  subject: "",
  message: "",
  isProcessing: true
  // attachment: {
  //   name: '',
  //   type: '',
  //   size: 0
  // },
};
export default function Ticket() {

  // const TableData = [
  //   {
  //     Id: '1',
  //     Subject: 'Email',
  //     Status: 'Mobile',
  //     Last_Date: '10-10-2022',
  //   },
  //   {
  //     Id: '2',
  //     Subject: 'Email',
  //     Status: 'Mobile',
  //     Last_Date: '10-10-2022',
  //   },
  //   {
  //     Id: '3',
  //     Subject: 'Email',
  //     Status: 'Mobile',
  //     Last_Date: '10-10-2022',
  //   },
  // ]

  const [ticketFormData, setTicketFormData] = useState(initialTicketdata);
  const {
    user,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
    allTicketForUser,
    setAllTicketUser
  } = useContext(AuthContext);


  // const validateFileType = () => {
  //   setError('');
  //   if (!ticketFormData.attachment) {
  //     setError("Please upload a file.");
  //     return;
  //   }

  //   if (ticketFormData.attachment.size > 20480) {
  //     setError("Please upload a file that is less than or equal to 20kb.");
  //     return;
  //   }

  //   setError('');
  // };

  function isValidForm() {
    return ticketFormData &&
      ticketFormData.subject &&
      ticketFormData.subject.trim() !== "" &&
      ticketFormData.message &&
      ticketFormData.message.trim() !== ""
      ? true
      : false;
  }
  async function handleTicket() {
    setComponentLevelLoader({ loading: true, id: "" });
    const createFinalFormData = {
      ...ticketFormData,
      user: user?._id,
      isProcessing: true,
    }
    const res = await createTicket(createFinalFormData as ticketTypes);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTicketFormData(initialTicketdata);
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllTicket();
    } else {
      toast.error(res.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function extractAllTicket() {
    setPageLevelLoader(true);
    const res = await getAllTicketForUser(user?._id as string);

    if (res.success) {
      setPageLevelLoader(false);
      const date = res.data.updatedAt
      const formattedDate = moment(date).format('DD/MM/YYYY');
      const updatedArrayOfObjects = res.data.map((obj: ticketTypes) => ({
        ...obj,
        updatedAt: formattedDate
      }));

      setAllTicketUser(updatedArrayOfObjects);
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
    if (user !== null) extractAllTicket();
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
      <div className="bg-white mx-9 px-8 rounded-lg">
        <h1 className="text-2xl mb-5 text-red-700 font-bold text-center py-5">IMPORTANT THINGS</h1>
        <ul className="list-inside list-disc">
          <li>For Problem with Orders, use subject <b>Order</b></li>
          <li>For Problem with Payments, <a href="" className="font-bold underline text-red-700">CLICK HERE</a></li>
          <li>If you need any Payment method/Service/Feature, Use subject <b>Request</b></li>
          <li>If Any Bug in the website, Use the subject <b>Bug Report</b></li>
        </ul>
        <br />
        <h1 className="font-bold">Note :
          <p>&#x2713; We will respond within 30 mint To 6 hours, depending on the tickets overload.</p>
          <p>&#x2713; If the ticket is solved, please use another ticket</p>
          <p>&#x2713; Please do not create multiple tickets for the same order Id!</p>
        </h1>
        <br /><br />
        {/* <p>⚠Do not raise ticket for <b>PAYMENT</b> realted ,For payment issues <a href="" className="font-bold underline text-red-700">CLICK HERE</a></p> */}
        <br />
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg mt-8 py-8">
        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Order ID</label>
          <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg"
            placeholder='Enter your subject'
            type="text"
            value={ticketFormData.orderId}
            onChange={(event) => {
              setTicketFormData({
                ...ticketFormData,
                orderId: event.target.value,
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Subject</label>
          <input className="w-full py-2 outline-none px-3 bg-gray-200 text-sm rounded-lg"
            placeholder='Enter your subject'
            type="text"
            value={ticketFormData.subject}
            onChange={(event) => {
              setTicketFormData({
                ...ticketFormData,
                subject: event.target.value,
              });
            }}
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Message</label>
          <textarea className="w-full outline-none py-2 px-3 leading-tight bg-gray-200 text-sm rounded-lg "
            rows={7}
            placeholder='Enter your subject'
            value={ticketFormData.message}
            onChange={(event) => {
              setTicketFormData({
                ...ticketFormData,
                message: event.target.value,
              });
            }}
          ></textarea>
        </div>
        {/* <div className="flex mb-4">
          <p className="text-gray-700 font-bold text-lg mr-5" >Attach a file</p>
          <input type="file"
            className="cursor-pointer"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {

              const files = event.target.files;
              if (files && files.length > 0) {
                setTicketFormData({
                  ...ticketFormData,
                  attachment: files[0],
                });
              }

            }}
            onBlur={validateFileType}
          />
          {error && <p className="text-red-700">{error}</p>}
        </div> */}
        <button
          className="disabled:opacity-50 inline-flex items-center justify-center bg-blue-950 my-5 text-white text-lg font-bold w-full p-5 rounded-lg
                                     transition-all duration-200 ease-in-out focus:shadow "
          disabled={!isValidForm()}
          onClick={handleTicket}
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
            "Submit Ticket"
          )}
        </button>
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg mt-8 py-8 overflow-x-auto">
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
          <table className="w-full mt-9">
            <thead>
              <tr className="border-b border-gray-200 text-gray-800">
                <th className="px-2">Order Id</th>
                <th className="px-2">Subject</th>
                <th className="px-2">Status</th>
                <th className="px-2">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {
                allTicketForUser.map((value, index) => (
                  <tr key={value._id} className={`text-gray-700 text-center ${index % 2===0 ? 'bg-pink-100' : ''}`}>
                    <td className="p-3">{value.orderId}</td>
                    <td className="p-3">{value.subject}</td>
                    <td className="p-3">
                      {value.isProcessing
                        ? "In Process"
                        : "Completed"
                      }
                    </td>
                    <td className="p-3">{value.updatedAt}</td>
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
