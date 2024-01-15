import { Routes, Route } from "react-router-dom";
import './App.css'
import NewOrder from './layout/protectedLyout/NewOrder'
import Orders from "./layout/protectedLyout/Orders";
import Tickets, { ticketTypes } from "./layout/protectedLyout/Tickets";
import Updates from "./layout/protectedLyout/Updates";
import PageNotFound from "./layout/PageNotFound";
import Titles from "./components/Titles";
import { useEffect, useState } from 'react';
import SideNavbar from "./components/SideNavbar";
import Login from "./layout/Login";
import Navbar from "./components/Navbar";
import Signup, { registerUserType } from "./layout/Signup";
import { AuthContext, ComponentLevelLoader } from "./contexts";
import AddFunds, { addFund } from "./layout/AddFunds";
import AddService from "./layout/protectedLyout/AddService";
import RequestService from "./layout/protectedLyout/RequestService";
import ComponentLevelNav from "./components/ComponentLevelNav";
import Account from "./layout/protectedLyout/Account";
import AdminNewOrder, { orderTypes } from "./layout/protectedLyout/admin/AdminNewOrder";
import AdminTicket from "./layout/protectedLyout/admin/AdminTicket";
import AdminAddFund from "./layout/protectedLyout/admin/AdminAddFund";
import { getTotalAmount } from "./service/addFund";
import AdminClosedOrder from "./layout/protectedLyout/admin/AdminClosedOrder";

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
  const [allNewOrdersForAdmin, setAllNewOrdersForAdmin] = useState<Array<orderTypes>>([]);
  const [closedAllOrdersForAdmin, setClosedAllOrdersForAdmin] = useState<Array<orderTypes>>([]);
  const [allOrdersForUser, setAllOrdersForUser] = useState<Array<orderTypes>>([]);
  const [allTicketForAdmin, setAllTicketForAdmin] = useState<Array<ticketTypes>>([]);
  const [allTicketForUser, setAllTicketUser] = useState<Array<ticketTypes>>([]);
  const [allFundForUser, setAllFundForUser,] = useState<Array<addFund>>([]);
  const [addFundForAdmin, setAddFundForAdmin] = useState<Array<addFund>>([]);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [spentAmount, setSpentAmount] = useState<number>(0);

  const isTokenExpired = () => {
    const accessToken = localStorage.getItem('token');
    if (accessToken && accessToken !== null) {
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      return decodedToken.exp < Date.now() / 1000;
    }
    return true;
  };

  useEffect(() => {
    const tokenExpired = isTokenExpired();
    if (!tokenExpired) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser(null);
      localStorage.clear();
    }
  }, []);

  async function extractAllFund() {
    if (isAuthUser && !user?.role) {
      const res = await getTotalAmount(user?._id as string);

      if (res.success) {
        setRemainingAmount(res.remainingAmount);
        setSpentAmount(res.spentAmount);
      }
    }

  }
  useEffect(() => {
    if (user !== null) extractAllFund();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const contextValue = {
    isAuthUser, setIsAuthUser,
    user, setUser,
    componentLevelLoader, setComponentLevelLoader,
    pageLevelLoader, setPageLevelLoader,
    allNewOrdersForAdmin, setAllNewOrdersForAdmin,
    closedAllOrdersForAdmin, setClosedAllOrdersForAdmin,
    allOrdersForUser, setAllOrdersForUser,
    allTicketForAdmin, setAllTicketForAdmin,
    allTicketForUser, setAllTicketUser,
    allFundForUser, setAllFundForUser,
    addFundForAdmin, setAddFundForAdmin,
    remainingAmount, setRemainingAmount,
    spentAmount, setSpentAmount
  }
  
  return (
    <div>
      <AuthContext.Provider value={contextValue}>

        {!isAuthUser &&
          <div className="bg-gray-950 h-screen overflow-x-hidden">
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
                {
                  user?.role === "admin" ?
                    <Route index element={<AdminNewOrder />} />
                    :
                    <Route index element={<NewOrder />} />
                }
                {
                  user?.role === "admin" ?
                    <Route path="tickets" element={<AdminTicket />} />
                    :
                    <Route path='tickets' element={<Tickets />} />
                }
                {
                  user?.role === "admin" ?
                    <Route path="addfunds" element={<AdminAddFund />} />
                    :
                    <Route path='addfunds' element={<AddFunds />} />
                }
                {
                  user?.role === "admin" ?
                    <Route path='orders' element={<AdminClosedOrder />} />
                    :
                    <Route path='orders' element={<Orders />} />
                }
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
    </div>
  )
}

export default App
