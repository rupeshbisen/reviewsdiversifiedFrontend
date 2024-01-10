
export default function Updates() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between bg-white mx-9 px-8 rounded-lg my-9 py-8">
        <div className="mr-3 mb-3 sm:mb-0 w-full sm:w-fit">
          <select
            className="w-full py-2 outline-none text-white px-3 bg-gray-600 text-xl rounded-lg"
          >
            <option value="All">All</option>
            <option value="New">New Service</option>
            <option value="Increase">Rate Increase</option>
            <option value="Decrease">Rate Decrease</option>
            <option value="Enable">Service Enable</option>
            <option value="Disable">Service Disable</option>
          </select>
        </div>
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
      </div>

      <div className="bg-white m-9 p-5 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-gray-800">
              <th >Service</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700 text-center">
              <td className="py-2">5 star ⭐  Google rating</td>
              <td className="py-2">09-01-2024</td>
              <td className="py-2">Rate increased from ₹1036.15 to ₹1037.36</td>
            </tr>
            <tr className="text-gray-700 text-center">
              <td className="py-2">5 star ⭐  rating + comment</td>
              <td className="py-2">09-01-2024</td>
              <td className="py-2">Rate increased from ₹1036.15 to ₹1037.36</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
