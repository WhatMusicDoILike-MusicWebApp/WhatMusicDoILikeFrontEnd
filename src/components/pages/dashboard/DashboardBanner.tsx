import { SidebarTrigger } from "../../ui"
import { UserResponse } from "../constants-types";
import { AccountDropDown } from "./AccountDropDown"

interface DashboardBannerProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}

export const DashboardBanner = ({userInfo, setUserInfo} : DashboardBannerProps): JSX.Element => {

    return (
        <div className="flex flex-row justify-between items-center top-0 left-0 w-full z-50 h-16 ">
            <div className="px-4 ">
                <SidebarTrigger />
            </div>
            <AccountDropDown userInfo={userInfo} setUserInfo={setUserInfo}/>

        </div>
    )
}