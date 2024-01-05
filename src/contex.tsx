import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./layout/Login";
import Signup from "./layout/Signup";
import Services from "./layout/Services";
import PageNotFound from "./layout/PageNotFound";
import SideNavbar from "./components/SideNavbar";
import NewOrder from "./layout/protectedLyout/NewOrder";
import Orders from "./layout/protectedLyout/Orders";
import Tickets from "./layout/protectedLyout/Tickets";
import MassOrder from "./layout/protectedLyout/MassOrder";
import Updates from "./layout/protectedLyout/Updates";
import Unauthorized from "./layout/Unauthorized";
import Titles from "./components/Titles";
import { useContext, useState } from 'react'
import { Global } from "./Global";

export default function Childern() {
    const [navClick, setNavClick] = useState(false)
    const onMenuClick = () => {
        setNavClick(!navClick);
    }
    const {
        isAuthUser,

    } = useContext(Global);
    return (
        <div>
            <BrowserRouter>

                {!isAuthUser &&
                    <div className="bg-[#0e5658] h-screen overflow-x-hidden">
                        <Navbar
                            navClick={navClick}
                            onNaveClick={onMenuClick}
                        />
                        <Routes>
                            <Route index element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                            <Route path='services' element={<Services />} />

                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </div>
                }
                {isAuthUser &&
                    <div className="flex flex-col md:flex-row ">
                        <div className=" md:w-1/5 md:h-screen overflow-y-auto " >
                            <SideNavbar
                                navClick={navClick}
                                onNaveClick={onMenuClick}
                            />
                        </div>
                        <div className="flex-auto md:w-4/5 md:h-screen overflow-y-auto ">
                            <Routes>
                                <Route index element={<NewOrder />} />
                                <Route path='orders' element={<Orders />} />
                                <Route path='services' element={<Services />} />
                                <Route path='tickets' element={<Tickets />} />
                                <Route path='massorder' element={<MassOrder />} />
                                <Route path='updates' element={<Updates />} />
                                <Route path='unauthorized-page' element={<Unauthorized />} />

                                <Route path='*' element={<PageNotFound />} />
                            </Routes>
                        </div>
                    </div>
                }
                <Titles />
            </BrowserRouter>
        </div>
    )
}
