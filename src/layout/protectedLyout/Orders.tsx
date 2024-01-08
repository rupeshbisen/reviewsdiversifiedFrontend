export default function Ticket() {

  const TableData = [
    {
      Id: '1',
      date: '10-10-2022',
      link: 'Mobile',
      charge: '10-10-2022',
      start_Count: '22',
      quantity: '20',
      service: 'test',
      status: 'update',
      remains: '1',
    },
    {
      Id: '2',
      date: '10-10-2022',
      link: 'Mobile',
      charge: '10-10-2022',
      start_Count: '22',
      quantity: '20',
      service: 'test',
      status: 'update',
      remains: '1',
    },
    {
      Id: '3',
      date: '10-10-2022',
      link: 'Mobile',
      charge: '10-10-2022',
      start_Count: '22',
      quantity: '20',
      service: 'test',
      status: 'update',
      remains: '1',
    },
  ]

  const ProcessData = [
    {
      title: 'Pending',
    },
    {
      title: 'In Process',
    },
    {
      title: 'Completed',
    },
    {
      title: 'Partial',
    },
    {
      title: 'Processing',
    },
    {
      title: 'Cancelled',
    },
  ]
  return (
    <div className="my-12">
      <div className="bg-white mx-9 px-8 py-8 pt-5 rounded-lg">
        <h1 className="font-bold"><u>HAVING ANY ISSUE IN ORDER?</u> <a href="" className="text-blue-700">CLICK HERE FOR SEND NEW TICKET</a></h1>
      </div>

      <div>
        <div className="md:flex list-none mx-9 my-9">
          <button className="p-3 bg-white text-gray-700 w-full md:w-auto rounded-lg mr-3 mb-2">All</button>
          {
            ProcessData.map((item) => (
              <button className="p-3 bg-gray-800 text-white hover:text-gray-700 mb-2 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">{item.title}</a></button>
            ))
          }
        </div>
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg py-6 overflow-x-auto">
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
                <th>Id</th>
                <th>Date</th>
                <th>Link</th>
                <th>Charge</th>
                <th>Start Count</th>
                <th>Quantity</th>
                <th>Service</th>
                <th>Status</th>
                <th>Remains</th>
              </tr>
            </thead>
            <tbody>
              {
                TableData.map((value) => (
                  <tr key={value.Id} className="text-gray-700 text-center">
                    <td className="pb-4">{value.Id}</td>
                    <td className="pb-4">{value.date}</td>
                    <td className="pb-4">{value.link}</td>
                    <td className="pb-4">{value.charge}</td>
                    <td className="pb-4">{value.start_Count}</td>
                    <td className="pb-4">{value.quantity}</td>
                    <td className="pb-4">{value.service}</td>
                    <td className="pb-4">{value.status}</td>
                    <td className="pb-4">{value.remains}</td>
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