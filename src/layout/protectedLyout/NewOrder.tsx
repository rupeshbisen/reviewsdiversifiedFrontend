import { useState } from "react";

export interface newOrder {
  link: string,
  quantity: string,
  charges: string,
  selectedOption: string;
}

const newOrderData: newOrder = {
  link: "",
  quantity: "",
  charges: "",
  selectedOption: "",
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

  const CardData = [
    {
      icon: "fa-solid fa-address-book",
      title: 'devtechsmm',
      description: 'Welcome to panel!',
    },
    {
      icon: "fa-solid fa-chart-simple",
      title: '₹0.00',
      description: 'Spent balance',
    },
    {
      icon: "fa-solid fa-square-check",
      title: '5771970',
      description: 'Panel orders',
    },
    {
      icon: "fa-brands fa-cc-amazon-pay",
      title: '₹0.00',
      description: 'To Add more Fund',
      link: 'CLICK HERE'
    },
  ]

  const AccordionData = [
    {
      heading: 'What makes people look for SMM panels?',
      dis: 'SMM panels are online stores that sell different kinds of SMM services.',
    },
    {
      heading: 'What SMM services does your panel have?',
      dis: 'We provide different types of SMM services depending on the platform: followers, likes, views, etc.',
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

  function isFormValid() {
    return formData &&
      formData.link &&
      formData.link.trim() !== "" &&
      formData.quantity &&
      formData.quantity.trim() !== "" &&
      formData.charges &&
      formData.charges.trim() !== "" &&
      formData.selectedOption &&
      formData.selectedOption.trim() !== ""
  }

  function handleNewOrder() {
    console.log(formData);
  }

  return (
    <div className="my-12">
      <h1 className="text-3xl mx-5 text-center font-bold text-white">🤛🏻<u>OUR BELIEVE - QUALITY OVER QUANTITY</u>🤜🏻</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-12 mx-4">
        {
          CardData.map((item, index: number) => (
            <div key={index} className="bg-white p-5 rounded-lg flex justify-around items-center">
              <div className="text-5xl">
                <i className={item.icon}></i>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <br />
                <p>{item.description} <br /><a href="" className="text-blue-700 underline">{item.link}</a> </p>
              </div>
            </div>
          ))
        }
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
            <li>API user get 7% Discount on all Services & Child panel user get 12%</li>
          </ul>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5">
        <div className="bg-white px-8 py-8 pt-5 rounded-lg w-full">
          <form>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-200 overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="w-full text-gray-700 bg-gray-200 py-2 outline-none"
                type="text" placeholder="Search something.." />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-bold text-lg">Category</label>
              <select
                className="w-full py-2 outline-none text-gray-600 px-3 bg-gray-200 text-sm rounded-lg"
                value={formData.selectedOption}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    selectedOption: event.target.value,
                  });
                }}
              >
                <option value="Google rating">5 star ⭐  Google rating</option>
                <option value="rating comment">5 star ⭐  rating + comment</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-bold text-lg">Description</label>
              <p className="text-gray-700 bg-gray-200 px-5 shadow-xl rounded-xl">
                💎 Instagram followers (premium) 💎<br />
                🔘 Start Time -Instant<br />
                🚀 Speed - 50-200k per day<br />
                ⭐ Quality - All Are Super Real DP/Posts/stories<br />
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
                    quantity: event.target.value,
                  });
                }} />
              <p>Min: 50 - Max: 500000</p>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-bold text-lg">Charges</label>
              <input className="w-full py-2 outline-none px-3 bg-gray-200 text-sm rounded-lg"
                type="text" value={formData.charges}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    charges: event.target.value,
                  });
                }} />
            </div>

            <button
              disabled={!isFormValid()}
              onClick={handleNewOrder}
              className="disabled:opacity-50 bg-blue-950 my-5 text-white text-lg font-bold w-full p-3 rounded-lg">
              Submit
            </button>
          </form>
        </div>
        <div className="bg-white px-8 py-8 pt-5 rounded-lg w-full h-fit">
          <h1>What is SMM Panel?</h1>
          <p><b>SMM Panel</b> is used to access Social Networks, and making use of it for profits. You can use the <b>SMM Panel</b> to get your marketing move on to the next stage of developing plans for your product or services. The social media used includes Facebook, twitter, Instagram, YouTube, LinkedIn and more. With this cheapest SMM panel you can grow your business rapidly. Buy Best SMM Panel Services from SMMPanel and grow your business. Cheapestsmmpanels is the best and cheapest smm panel in the market.</p>
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

      <p className="text-white px-5">SMM (Social Media Marketing) is the use of social media platforms such as Instagram, Facebook, Twitter, Youtube and many more to promote yourself or your company. If you are looking for a way to boost your online presence, then your best choice is our SMM panel where we offer services to help you boost your online presence across all social media platforms at the cheapest prices.</p>
    </div>
  )
}
