import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Titles() {
    const location = useLocation();

    useEffect(() => {
        // Update the document title based on the current URL path
        const currentPath = location.pathname;

        const pageTitle = getTitleForRoute(currentPath);
        document.title = pageTitle;
    }, [location.pathname]);

    const getTitleForRoute = (route: unknown) => {
        switch (route) {
            // case "/my-app": return "Homepage | Website Name";
            case '/':
                return 'SMM Panel';
            case '/orders':
                return 'Orders';
            case '/services':
                return 'Services';
            case '/tickets':
                return 'Tickets';
            case '/massorder':
                return 'Mass Order';
            case '/updates':
                return 'Updates';
            default:
                return 'SMM Panel | Page Not Found';
        }
    };

    return null;
}
