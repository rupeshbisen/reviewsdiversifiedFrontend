import { useState } from "react";
import QrCode from "../assets/QrCode.jpeg"

export interface addFund {
  order: string,
  amount: string,
}

const addFundData: addFund = {
  order: "",
  amount: "",
}
export default function Services() {
  const [formData, setFormData] = useState(addFundData);
  const [showTable, setShowTable] = useState(false);

  function isFormValid() {
    return formData &&
      formData.order &&
      formData.order.trim() !== "" &&
      formData.amount &&
      formData.amount.trim() !== ""
  }

  function handleAddFunds() {
    setShowTable(true);
    console.log(formData);
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
          <label className="text-gray-700 font-bold text-lg">Order Id</label>
          <input className="w-full py-2 outline-none text-gray-700 px-3 bg-gray-200 text-sm rounded-lg"
            type="number" value={formData.order}
            onChange={(event) => {
              setFormData({
                ...formData,
                order: event.target.value,
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
                amount: event.target.value,
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
          disabled={!isFormValid()}
          onClick={handleAddFunds}
          className="disabled:opacity-50 bg-blue-950 my-5 text-white text-lg font-bold w-full p-3 rounded-lg">
          Check
        </button>

        <div className="m-9 p-5 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-gray-800">
                <th >Id</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {showTable && (
                <tr className="text-gray-700 text-center">
                  <td className="py-2">{formData.order}</td>
                  <td className="py-2">{new Date().toLocaleString()}</td>
                  <td className="py-2">Paytm / Phonepay (Min 50 INR)</td>
                  <td className="py-2">{formData.amount}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
