import { NavLink } from 'react-router-dom'
import Logo from './../assets/react.svg'
import { nonAuthNavOption } from '../utils';

interface NavItemsProps {
    navClick?: boolean;
    onNaveClick: () => void;
}
export default function Navbar(props: NavItemsProps) {
    const { navClick, onNaveClick } = props;

    return (

        <nav className={`bg-[#034042]  w-screen`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                    <img src={Logo} className={`h-10`} alt="Logo" />
                </a>

                <button data-collapse-toggle="navbar-user" type="button"
                    onClick={(e) => { e.preventDefault(); onNaveClick() }}
                    className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden`}
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

                <div className={`items-center justify-between w-full md:flex md:w-auto ${navClick ? '' : 'hidden'}`} id="navbar-user">
                    <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4  md:flex-row md:space-x-8  md:mt-0 md:border-0 `}>
                        {nonAuthNavOption.map(item => (
                            <li key={item.id}>
                                <NavLink to={item.path}
                                    key={item.id}
                                    onClick={() => { onNaveClick() }}
                                    className="block py-2 pl-3 pr-4 rounded text-white  hover:bg-[#478385] hover:text-white"
                                    style={({ isActive }) => ({
                                        background: isActive ? '#478385' : '',
                                    })}>
                                    <i className={`pe-3 fa ${item.icon}`}></i>
                                    {item.lable}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>

    )
}
