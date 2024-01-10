import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            window.location.reload();
            navigate('/');
        }, 3000);
    });

    return (
        <div className="w-screen">
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="text-center max-w-screen-xl mx-auto px-4">
                    <h1 className="text-7xl font-bold text-red-700 animate-pulse drop-shadow-[0_15px_35px_blue]">404 Error</h1>
                    <p className="sm:text-3xl text-xl text-white"> Page Not Found </p>
                    <p className="sm:text-3xl text-xl text-white mb-7">The page you are looking for does not exist. </p>
                    <a href="/" className="bg-white p-5 rounded-full font-bold ">Visit the Home Page</a>
                </div>
            </div>
        </div>
    );
}