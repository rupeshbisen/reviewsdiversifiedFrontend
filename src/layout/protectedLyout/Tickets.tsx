
export default function Ticket() {

  const TableData = [
    {
      Id: '1',
      Subject: 'Email',
      Status: 'Mobile',
      Last_Date: '10-10-2022',
    },
    {
      Id: '2',
      Subject: 'Email',
      Status: 'Mobile',
      Last_Date: '10-10-2022',
    },
    {
      Id: '3',
      Subject: 'Email',
      Status: 'Mobile',
      Last_Date: '10-10-2022',
    },
  ]
  return (
    <div className='bg-gray-950'>
      <div className="bg-white mx-9 px-8 rounded-lg">
        <h1 className="text-2xl mb-5 text-red-700 font-bold text-center">IMPORTANT THINGS</h1>
        <ul className="list-inside text-black">
          <li className="list-disc">For Problem with Orders, use subject <b>Order</b></li>
          <li className="list-disc">For Problem with Payments, <a href="" className="font-bold underline text-red-700">CLICK HERE</a></li>
          <li className="list-disc">If you need any Payment method/Service/Feature, Use subject <b>Request</b></li>
          <li className="list-disc">If Any Bug in the website, Use the subject <b>Bug Report</b></li>
          <li className="font-bold list-disc">If anyone want to attach screenshot go to this website https://prnt.sc/ and upload the screenshot and then copy the link and paste it in ticket with issue</li>
          <br />
          <p className="font-bold">Note :</p>
          <li className="font-bold">&#x2713; We will respond within 30 mint To 6 hours, depending on the tickets overload.</li>
          <li className="font-bold">&#x2713; If the ticket is solved, please use another ticket</li>
          <li className="font-bold">&#x2713; Please do not create multiple tickets for the same order Id!</li>
          <br /><br />
          <li>⚠Do not raise ticket for <b>PAYMENT</b> realted ,For payment issues <a href="" className="font-bold underline text-red-700">CLICK HERE</a></li>
          <br />
        </ul>
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg mt-8 py-8">
        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Subject</label>
          <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 font-bold text-lg">Message</label>
          <textarea className="w-full outline-none py-2 px-3 leading-tight bg-gray-100 text-sm rounded-lg "
            rows={7}
          ></textarea>
        </div>
        <div className="flex mb-4">
          <p className="text-gray-700 font-bold text-lg mr-5" >Attach a file</p>
          <input type="file" className="cursor-pointer" />
        </div>
        <button className="bg-blue-950 my-5 text-white text-lg font-bold w-full p-5 rounded-lg">Submit Ticket</button>
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg mt-8 py-8">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            className="w-full text-gray-700 bg-gray-100 py-2 outline-none"
            type="text"
            placeholder="Search something.." />
        </div>

        <div>
          <table className="w-full mt-9">
            <thead>
              <tr className="border-b border-gray-200 text-gray-800">
                <th>Id</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {
                TableData.map((value) => (
                  <tr key={value.Id} className="text-gray-700 text-center">
                    <td className="pb-4">{value.Id}</td>
                    <td className="pb-4">{value.Subject}</td>
                    <td className="pb-4">{value.Status}</td>
                    <td className="pb-4">{value.Last_Date}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
