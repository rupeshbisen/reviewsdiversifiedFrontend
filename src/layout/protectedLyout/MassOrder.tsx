export default function MassOrder() {
  return (
    <div className="my-12">
      <div className="bg-white mx-9 px-8 pt-5 rounded-lg">
        <label className="text-gray-700 font-bold text-lg">One order per line in format</label>
        <textarea className="w-full py-2 outline-none px-3 leading-tight bg-gray-200 text-sm rounded-lg "
          rows={7}
          placeholder='service_id | link | quantity'
        ></textarea>
        <button className="bg-blue-950 my-5 text-white text-lg font-bold w-full p-5 rounded-lg">Submit</button>
      </div>
    </div>
  )
}