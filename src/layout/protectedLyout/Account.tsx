import { useContext } from "react";
import { AuthContext } from "../../contexts";

export default function Account() {

    const { user } = useContext(AuthContext);
    console.log('useraccount', user)
    return (
        <div className="bg-white mx-9 px-8 rounded-lg mt-8 py-8">
            <h1 className="text-2xl py-5 font-bold text-center">Account Details</h1>
            <div className="mb-4">
                <label className="text-gray-700 font-bold text-lg">Username</label>
                <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg"
                    placeholder='Enter your subject'
                    type="text"
                    value={user?.username}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-700 font-bold text-lg">Email</label>
                <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg"
                    placeholder='Enter your subject'
                    type="text"
                    value={user?.email}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-700 font-bold text-lg">Phone Number</label>
                <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg"
                    placeholder='Enter your subject'
                    type="text"
                    value={user?.phoneNumber}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-700 font-bold text-lg">City</label>
                <input className="w-full py-2 outline-none px-3 bg-gray-100 text-sm rounded-lg"
                    placeholder='Enter your subject'
                    type="text"
                    value={user?.city}
                />
            </div>
        </div>
    )
}
