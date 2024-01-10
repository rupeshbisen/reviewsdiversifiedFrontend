import { Dispatch, SetStateAction, createContext } from "react";
import { registerUserType } from "../layout/Signup";
import { orderTypes } from "../layout/protectedLyout/Admin";
import { ticketTypes } from "../layout/protectedLyout/Tickets";

export interface ComponentLevelLoader {
    loading: boolean;
    id: string;
}
type Auth = {
    isAuthUser: boolean
    setIsAuthUser: Dispatch<SetStateAction<boolean>>
    user: registerUserType | null;
    setUser: Dispatch<SetStateAction<registerUserType | null>>;
    componentLevelLoader: ComponentLevelLoader;
    setComponentLevelLoader: Dispatch<SetStateAction<ComponentLevelLoader>>;
    pageLevelLoader: boolean;
    setPageLevelLoader: Dispatch<SetStateAction<boolean>>;
    allOrdersForUser: Array<orderTypes>;
    setAllOrdersForUser: Dispatch<SetStateAction<Array<orderTypes>>>;
    allOrdersForAllUsers: Array<orderTypes>
    setAllOrdersForAllUsers: Dispatch<SetStateAction<Array<orderTypes>>>;
    allTicketForAdmin: Array<ticketTypes>
    setAllTicketForAdmin: Dispatch<SetStateAction<Array<ticketTypes>>>;
    allTicketForUser: Array<ticketTypes>
    setAllTicketUser: Dispatch<SetStateAction<Array<ticketTypes>>>;
}

export const AuthContext = createContext<Auth>({} as Auth)