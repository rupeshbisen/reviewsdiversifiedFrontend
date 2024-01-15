import { Dispatch, SetStateAction, createContext } from "react";
import { registerUserType } from "../layout/Signup";
import { orderTypes } from "../layout/protectedLyout/admin/AdminNewOrder";
import { ticketTypes } from "../layout/protectedLyout/Tickets";
import { addFund } from "../layout/AddFunds";

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
    allNewOrdersForAdmin: Array<orderTypes>
    setAllNewOrdersForAdmin: Dispatch<SetStateAction<Array<orderTypes>>>;
    closedAllOrdersForAdmin: Array<orderTypes>
    setClosedAllOrdersForAdmin: Dispatch<SetStateAction<Array<orderTypes>>>;
    allTicketForAdmin: Array<ticketTypes>
    setAllTicketForAdmin: Dispatch<SetStateAction<Array<ticketTypes>>>;
    allTicketForUser: Array<ticketTypes>
    setAllTicketUser: Dispatch<SetStateAction<Array<ticketTypes>>>;
    allFundForUser: Array<addFund>
    setAllFundForUser: Dispatch<SetStateAction<Array<addFund>>>;
    addFundForAdmin: Array<addFund>
    setAddFundForAdmin: Dispatch<SetStateAction<Array<addFund>>>;
    remainingAmount: number
    setRemainingAmount: Dispatch<SetStateAction<number>>;
    spentAmount: number
    setSpentAmount: Dispatch<SetStateAction<number>>;

}

export const AuthContext = createContext<Auth>({} as Auth)