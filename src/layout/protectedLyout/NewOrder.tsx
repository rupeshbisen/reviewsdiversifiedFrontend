import { useContext, useEffect, useState } from "react";
import { createNewOrder } from "../../service/order";
import { AuthContext } from "../../contexts";
import ComponentLevelLoader from "../../components/loader/ComponentLevelLoader";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";

export interface newOrder {
  link: string,
  quantity: number,
  charges: number,
  service: string;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
}

const newOrderData: newOrder = {
  link: "",
  quantity: 0,
  charges: 0,
  service: "",
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true
}

interface toggleAccor {
  value: {
    heading: string
    dis: string
  }
}

const Accordion = ({ value }: toggleAccor) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccord = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-5">
      <div className="border my-10 w-full md:w-9/12 mx-auto bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center p-2 cursor-pointer" onClick={toggleAccord}>
          <h2 className="text-xl font-bold text-center">{value.heading}</h2>
          <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform`}>
            &#9660;
          </span>
        </div>
        {isOpen && <p>{value.dis}</p>}
      </div>
    </div>
  );
};

export default function NewOrder() {

  const AccordionData = [
    {
      heading: 'What makes people look for SMM panels?',
      dis: 'SMM panels are online stores that sell different kinds of SMM services.',
    },
    {
      heading: 'What SMM services does your panel have?',
      dis: 'We provide Google page rating SMM services',
    },
    {
      heading: 'Is it safe to purchase your SMM services?',
      dis: 'Using our SMM services is 100% safe, your accounts wont be banned.',
    },
  ]

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggle = () => {
    setIsOpen2(!isOpen2);
  };

  const [formData, setFormData] = useState(newOrderData);
  const { user, componentLevelLoader, setComponentLevelLoader, } = useContext(AuthContext);
  function isFormValid() {
    return formData &&
      formData.link &&
      formData.link.trim() !== "" &&
      formData.quantity &&
      formData.quantity !== 0 &&
      formData.charges &&
      formData.charges !== 0 &&
      formData.service &&
      formData.service.trim() !== ""
  }
  useEffect(() => {
    const multiplier = formData.service === "5 star Google rating" ? 20 : 25;
    const charges = parseInt((formData.quantity * multiplier).toFixed(2));
    console.log('Charges:', charges);
    setFormData({
      ...formData,
      charges: charges,
    });
    return
  }, [formData.service, formData.quantity, formData]);

  async function handleNewOrder() {
    console.log(formData);
    setComponentLevelLoader({ loading: true, id: "" });
    const createFinalCheckoutFormData = {
      ...formData,
      user: user?._id,
      isPaid: true,
      isProcessing: true,
      paidAt: new Date(),
    }
    const res = await createNewOrder(createFinalCheckoutFormData);
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(newOrderData);
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return (
    <div className="my-12">
      <h1 className="text-3xl mx-5 text-center font-bold text-white">🤛🏻<u>OUR BELIEVE - QUALITY OVER QUANTITY</u>🤜🏻</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-12 mx-4">
        <div className="bg-white p-5 rounded-lg flex justify-around items-center">
          <div className="text-5xl">
            <i className="fa-solid fa-address-book"></i>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{user?.username}</h1>
            <br />
            <p>Welcome to panel!</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg flex justify-around items-center">
          <div className="text-5xl">
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">₹0.00</h1>
            <br />
            <p>Spent balance</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg flex justify-around items-center">
          <div className="text-5xl">
            <i className="fa-solid fa-square-check"></i>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">5771970</h1>
            <br />
            <p>Panel orders</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg flex justify-around items-center">
          <div className="text-5xl">
            <i className="fa-brands fa-cc-amazon-pay"></i>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">₹0.00</h1>
            <br />
            <p>To Add more Fund <br /><a href="" className="text-blue-700 underline">CLICK HERE</a> </p>
          </div>
        </div>
      </div>

      <div className="mx-5">
        <div className="border mb-5 w-full md:w-9/12 md:mx-auto bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center p-2 cursor-pointer" onClick={toggleAccordion}>
            <h2 className="text-lg font-bold text-red-600">THINGS TO BE KNOWN BEFORE PLACING ORDER</h2>
            <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform`}>
              &#9660;
            </span>
          </div>
          {isOpen && <ul className="px-3 list-disc">
            <li>Be sure to read the full description of each service which you want to order</li>
            <li>Do not use two services at the same time for same link.If you do this , we will not able to fix it,wait for the first order to be completed,then place new order.</li>
            <li>No refund in case of wrong link entered so place order carefully</li>
            <li>We work on start count+quantity=final quantity</li>
          </ul>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5">
        <div className="bg-white px-8 py-8 pt-5 rounded-lg w-full">
          <div className="mb-4">
            <label className="text-gray-700 font-bold text-lg">Services</label>
            <select
              className="w-full py-2 outline-none text-gray-600 px-3 bg-gray-200 text-sm rounded-lg"
              value={formData.service}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  service: event.target.value,
                });
              }}
            >
              <option>Select Service</option>
              <option value="5 star Google rating">5 star ⭐  Google rating </option>
              <option value="5 star Google rating + comment">5 star ⭐ Google rating + comment</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-bold text-lg">Description</label>
            <p className="text-gray-700 bg-gray-200 px-5 shadow-xl rounded-xl">
              {
                formData.service === "5 star Google rating" ? "5 star ⭐  Google rating " : "5 star ⭐ Google rating + comment"
              }
              <br />
              {
                formData.service === "5 star Google rating" ?
                  <p>🎉 Offer &nbsp;
                    <span className="line-through text-gray-400" > Rs:25 </span>&nbsp;
                    <span className="text-blue-800"> Rs:20</span>
                  </p>
                  :
                  <p>🎉 Offer &nbsp;
                    <span className="line-through text-gray-400" > Rs:30 </span>&nbsp;
                    <span className="text-blue-800" > Rs:25</span>
                  </p>
              }
              🔘 Start Time -Instant<br />
              🚀 Speed - 50-200k per day<br />
              ⭐ Quality - All Are Super Real user rating <br />
              ❤️ Guaranteed - Lifetime<br />
              🔥 Stability - Full Stable
            </p>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-bold text-lg">Link</label>
            <input className="w-full py-2 outline-none px-3 bg-gray-200 text-sm rounded-lg"
              type="text" value={formData.link}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  link: event.target.value,
                });
              }} />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-bold text-lg">Quantity</label>
            <input className="w-full py-2 outline-none px-3 bg-gray-200 text-sm rounded-lg"
              type="number" value={formData.quantity}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  quantity: parseInt(event.target.value)

                });
              }} />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-bold text-lg">Charges</label>
            <input disabled className="w-full py-2 outline-none px-3 bg-gray-200 text-sm rounded-lg"
              type="text" value={formData.charges}
            />
          </div>

          <button
            className="disabled:opacity-50 inline-flex items-center justify-center bg-blue-950 my-5 text-white text-lg font-bold w-full p-3 rounded-lg
          transition-all duration-200 ease-in-out focus:shadow "
            disabled={!isFormValid()}
            onClick={handleNewOrder}
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={"Submit"}
                color={"#ffffff"}
                loading={
                  componentLevelLoader && componentLevelLoader.loading
                }
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div className="bg-white px-8 py-8 pt-5 rounded-lg w-full h-fit">
          <h1>What is SMM Panel?</h1>
          <p><b>SMM Panel</b> is used to access Social Networks, and making use of it for profits. You can use the <b>SMM Panel</b> to get your marketing move on to the next stage of developing plans for your product or services. Buy Best SMM Panel Services from SMMPanel and grow your business. Reviewsdiversified is the best and cheapest smm panel in the market.</p>
        </div>
      </div>

      <div className="mx-5">
        <div className="border my-10 w-full md:w-9/12 md:mx-auto bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center p-2 cursor-pointer" onClick={toggle}>
            <h2 className="text-3xl font-bold text-center">IMPORTANT CONDITIONS FOR PLACING ORDERS</h2>
            <span className={`transform ${isOpen2 ? 'rotate-0' : 'rotate-180'} transition-transform`}>
              &#9660;
            </span>
          </div>
          {isOpen2 && <ol className="px-3 list-decimal">
            <li>Do Not place multiple orders for the same link at the same time, wait until the first order will be Completed / Canceled or Partial</li>
            <li>No Refund in case of wrong link entered so place order carefully</li>
            <li>we work on starter count+ Quantity = Final Quantity</li>
          </ol>}
        </div>
      </div>

      {AccordionData.map((value, index) => (
        <Accordion key={index} value={value} />
      ))}

      <p className="text-white px-5">SMM (Social Media Marketing) is the use of social media platforms Google page to promote yourself or your company. If you are looking for a way to boost your online presence, then your best choice is our SMM panel where we offer services to help you boost your online presence across social media platforms at the cheapest prices.</p>
      <Notification />
    </div>
  )
}
