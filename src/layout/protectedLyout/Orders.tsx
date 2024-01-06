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
  return (
    <div className='md:top-28 bg-gray-950'>
      <div className="bg-white mx-9 px-8 py-8 pt-5 rounded-lg">
        <h1 className="font-bold text-black"><u>HAVING ANY ISSUE IN ORDER?</u> <a href="" className="text-blue-700">CLICK HERE FOR SEND NEW TICKET</a></h1>
      </div>

      <div>
        <ul className="md:flex list-none mx-9 my-9">
          <li className="p-3 bg-white text-gray-700 rounded-lg mr-3">All</li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">Pending</a></li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">In Process</a></li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">Completed</a></li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">Partial</a></li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">Processing</a></li>
          <li className="p-3 bg-gray-800 text-white hover:text-gray-700 hover:bg-white rounded-lg mr-3 w-full md:w-auto "><a href="">Canaled</a></li>
        </ul>
      </div>

      <div className="bg-white mx-9 px-8 rounded-lg py-6">
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
          <table className="w-full mt-9 overflow-x-auto">
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