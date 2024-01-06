import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NewOrder from './layout/protectedLyout/NewOrder'
import Services from "./layout/Services";
import Orders from "./layout/protectedLyout/Orders";
import Tickets from "./layout/protectedLyout/Tickets";
import Updates from "./layout/protectedLyout/Updates";
import PageNotFound from "./layout/PageNotFound";
import Titles from "./components/Titles";
import { useEffect, useState } from 'react';
import SideNavbar from "./components/SideNavbar";
import Login from "./layout/Login";
import Navbar from "./components/Navbar";
import Signup, { registerUserType } from "./layout/Signup";
import { AuthContext, ComponentLevelLoader } from "./contexts";
import AddService from "./layout/protectedLyout/AddService";
import RequestService from "./layout/protectedLyout/RequestService";
import ComponentLevelNav from "./components/ComponentLevelNav";
import Account from "./layout/protectedLyout/Account";

function App() {
  const element = document.getElementById('root')
  if (element) {
    document.body.style.minWidth = window.innerWidth + "px";
  }

  const [navClick, setNavClick] = useState(false)
  const onMenuClick = () => {
    setNavClick(!navClick);
  }

  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState<ComponentLevelLoader>({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<registerUserType | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken && accessToken !== null) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser({} as registerUserType);
    }
  }, []);
  console.log("isAuthenticated", isAuthUser)
  console.log("user", user)
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthUser, setIsAuthUser, user, setUser, componentLevelLoader, setComponentLevelLoader, pageLevelLoader, setPageLevelLoader }}>

        {!isAuthUser &&
          <div className="bg-[#0e5658] h-screen overflow-x-hidden">
            <Navbar
              navClick={navClick}
              onNaveClick={onMenuClick}
            />
            <Routes>
              <Route index element={<Login />} />
              <Route path='signup' element={<Signup />} />

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
        }
        {isAuthUser &&
          <div className="flex flex-col md:flex-row ">
            <div className=" md:w-1/5 md:h-screen overflow-y-auto md:bg-[#353551] " >
              <SideNavbar
                navClick={navClick}
                onNaveClick={onMenuClick}
              />
            </div>
            <div className="flex-auto md:w-4/5 md:h-screen overflow-y-auto ">
              <ComponentLevelNav />
              <Routes>
                <Route index element={<NewOrder />} />
                <Route path='orders' element={<Orders />} />
                <Route path='services' element={<Services />} />
                <Route path='tickets' element={<Tickets />} />
                <Route path='addservice' element={<AddService />} />
                <Route path='requestservice' element={<RequestService />} />
                <Route path='updates' element={<Updates />} />
                <Route path='account' element={<Account />} />

                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        }
      </AuthContext.Provider>
      <Titles />
    </BrowserRouter>
  )
}

export default App
