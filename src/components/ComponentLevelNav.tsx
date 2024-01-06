import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";

export default function ComponentLevelNav() {

    const navigate = useNavigate();

    const { setIsAuthUser, setUser } = useContext(AuthContext);
    const handelLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        localStorage.clear();
        navigate("/");
    }
    return (
        <nav>
            <div className="hidden max-w-screen-xl md:flex flex-wrap items-center justify-end mx-auto p-4">
                <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4  md:flex-row md:space-x-8  md:mt-0 md:border-0 `}>
                    <li className="block py-2 pl-3 pr-4 rounded bg-white">
                        <i className="pe-2 fa-solid fa-indian-rupee-sign"></i>
                        0.00
                    </li>
                    <li>
                        <NavLink to="account"
                            className="block py-2 pl-3 pr-4 rounded text-white  hover:bg-[#478385] hover:text-white"
                            style={({ isActive }) => ({
                                background: isActive ? '#478385' : '',
                            })}>
                            <i className="pe-2 fa-regular fa-user"></i>
                            Account
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handelLogout} className="hidden md:block py-2 pl-3 pr-4 w-full text-left text-white font-bold rounded-lg hover:bg-gray-400 hover:text-[#353551] ">
                            <i className="pe-2 fa-solid fa-right-from-bracket"></i>Log out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
