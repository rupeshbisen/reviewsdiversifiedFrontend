import { Dispatch, SetStateAction, createContext } from "react";
import { registerUserType } from "../layout/Signup";

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
}

export const AuthContext = createContext<Auth>({} as Auth)