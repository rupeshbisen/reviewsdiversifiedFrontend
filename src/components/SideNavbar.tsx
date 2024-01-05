import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './../assets/react.svg'
import { useContext, useEffect, useState } from 'react';
import { navOption } from '../utils';
import { AuthContext } from '../contexts';

interface NavItemsProps {
    navClick?: boolean;
    onNaveClick: () => void;
}
export default function SideNavbar(props: NavItemsProps) {
    const { navClick, onNaveClick } = props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const navigate = useNavigate();

    const {
        isAuthUser,
        setIsAuthUser,
        setUser
      } = useContext(AuthContext);
      console.log("user isAuthUser",  isAuthUser)
    const handelLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        localStorage.clear();
        navigate("/");
    }

    return (

        <nav className="md:bg-[#353551]" >
            <div className="flex flex-wrap flex-row md:flex-col justify-between mx-auto p-4 px-5">
                <a href="/" className="flex self-center md:pb-8">
                    <img src={Logo} className={`h-10 ${isScrolled ? 'brightness-50' : ''}`} alt="Logo" />
                </a>

                <button data-collapse-toggle="navbar-user" type="button"
                    onClick={(e) => { e.preventDefault(); onNaveClick() }}
                    className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden ${isScrolled ? 'brightness-50' : ''}`}
                    aria-controls="navbar-user" aria-expanded="false">
                    {!navClick &&
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    }
                    {navClick &&
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                </button>

                <div className={`items-center justify-between w-full md:contents ${navClick ? '' : 'hidden'}`} id="navbar-user">
                    <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 bg-white shadow-lg shadow-slate-500/50 rounded-lg  md:bg-transparent md:shadow-none  md:mt-0 md:border-0 `}>
                        {navOption.map(item => (
                            <li key={item.id} className='md:py-3'>
                                <NavLink to={item.path}
                                    key={item.id}
                                    onClick={() => { onNaveClick() }}
                                    className="block py-2 pl-3 pr-4 text-white font-bold rounded-lg hover:bg-gray-400 hover:text-[#353551] "
                                    target={item.target}
                                    style={({ isActive }) => ({
                                        background: isActive ? 'white' : '',
                                        color: isActive ? '#353551' : ''
                                    })}>
                                    <i className={`pe-3 fa ${item.icon}`}></i>
                                    {item.lable}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                        <button onClick={handelLogout} className={"buttonClass"}>Log out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
