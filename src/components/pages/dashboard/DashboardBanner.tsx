import { SidebarTrigger } from "../../ui"
import { AccountDropDown } from "./AccountDropDown"

export const DashboardBanner = (): JSX.Element => {

    return (
        <div className="flex flex-row justify-between items-center top-0 left-0 w-full z-50 h-16 ">
            <div className="px-4 ">
                <SidebarTrigger />
            </div>
            <AccountDropDown />

        </div>
    )
}