import { SidebarTrigger } from "../../ui"
import { MainContent } from "../constants-types";
import { AccountDropDown } from "./AccountDropDown"

interface DashboardBannerProps {
    currentMainContent: MainContent;
}

export const DashboardBanner = ({ currentMainContent }: DashboardBannerProps): JSX.Element => {

    const fetchHeader = (content: MainContent) => {
        switch (content) {
            case MainContent.Spotify:
                return "Spotify Data";
            case MainContent.YoutubeMusic:
                return "Youtube Music Data";
            case MainContent.Transfer:
                return "Transfer";
            default:
                return "Dashboard";
        }
    }

    return (
        <div className="flex flex-row justify-between items-center top-0 left-0 w-full z-50 h-16 ">
            <div className="px-4">
                <SidebarTrigger />
            </div>
            <div className="text-2xl font-bold text-gray-100">
                {fetchHeader(currentMainContent)}
            </div>
            <AccountDropDown />
        </div>
    )
}