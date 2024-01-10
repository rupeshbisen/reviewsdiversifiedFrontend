import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NewOrder from './layout/protectedLyout/NewOrder'
import Services from "./layout/AddFunds";
import Orders from "./layout/protectedLyout/Orders";
import Tickets from "./layout/protectedLyout/Tickets";
import Updates from "./layout/protectedLyout/Updates";
import MassOrder from "./layout/protectedLyout/MassOrder";
import PageNotFound from "./layout/PageNotFound";
import Titles from "./components/Titles";
import { useEffect, useState } from 'react';
import SideNavbar from "./components/SideNavbar";
import Login from "./layout/Login";
import Navbar from "./components/Navbar";
import Signup, { registerUserType } from "./layout/Signup";
import { AuthContext, ComponentLevelLoader } from "./contexts";
import Unauthorized from "./layout/Unauthorized";
import AddFunds from "./layout/AddFunds";

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
    if (localStorage.getItem('accessToken') !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser({} as registerUserType);
    }
  }, []);
  console.log("isAuthenticated", isAuthUser)
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthUser, setIsAuthUser, user, setUser, componentLevelLoader, setComponentLevelLoader,pageLevelLoader, setPageLevelLoader }}>

        {!isAuthUser &&
          <div className="bg-gray-950 h-screen overflow-x-hidden">
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
                <Route path='addfunds' element={<AddFunds />} />
                <Route path='tickets' element={<Tickets />} />
                <Route path='massorder' element={<MassOrder />} />
                <Route path='updates' element={<Updates />} />
                <Route path='unauthorized' element={<Unauthorized />} />

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
