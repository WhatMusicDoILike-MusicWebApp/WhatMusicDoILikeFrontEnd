import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";

import { DashboardBanner } from "./DashboardBanner";
import { SideBar } from "./SideBar";
import { SidebarProvider } from "../../ui";
import { MainContent, UserResponse } from "../constants-types";
import axios from "axios";
import { YoutubeContent } from "./YoutubeContent";
import { SpotifyDashboardContent } from "./SpotifyDashboardContent";
import { BACKEND_ENDPOINT } from "@/main";
import { InsightsContent } from "./Insights/Insights";
import { TransferContent } from "./TransferContent";

export const DashboardPage = (): JSX.Element => {
    const [currentMainContent, setCurrentMainContent] = useState<MainContent>(MainContent.Spotify);
    const [userInfo, setUserInfo] = useState<UserResponse>({ userId: '', email: '', name: '', spotifyAuthToken: '', spotifyRefreshToken: '', ytToken: '', pendingYoutubeAuth: false, youtubeDeviceCode: '' });

    const clerk = useClerk();
    const { session } = useSession();
    const { userId } = useAuth();

    const mainContent = (content: MainContent) => {
        switch (content) {
            case MainContent.Spotify:
                return <SpotifyDashboardContent userInfo={userInfo} setUserInfo={setUserInfo} />;
            case MainContent.YoutubeMusic:
                return <YoutubeContent userInfo={userInfo} setUserInfo={setUserInfo} />;
            case MainContent.Transfer:
                return <TransferContent userInfo={userInfo} />;
            case MainContent.Insights:
                return <InsightsContent />;
            default:
                return <>Hello! This is the Dashboard Page.</>;
        }
    }

    useEffect(() => {
        if (session?.expireAt && session.expireAt < new Date()) {
            clerk.signOut();
        }
    }, [session]);

    useEffect(() => {
        const fetchUser = async () => {

            try {
                await axios.get<UserResponse>(`${BACKEND_ENDPOINT}/users?userId=${userId}`).then(response => {
                    const setUserConfig = {
                        userId: response.data.userId,
                        email: response.data.email,
                        name: response.data.name,
                        spotifyAuthToken: response.data.spotifyAuthToken,
                        spotifyRefreshToken: response.data.spotifyRefreshToken,
                        ytToken: response.data.ytToken,
                        pendingYoutubeAuth: response.data.pendingYoutubeAuth,
                        youtubeDeviceCode: response.data.youtubeDeviceCode
                    }
                    setUserInfo(setUserConfig);
                });
            } catch (error) {
                console.log('Error: ' + error);
            }

        }

        if (userId != '' && userId != null && userId != undefined)
            fetchUser();
    }, [userId]);

    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar setCurrentMainContent={setCurrentMainContent} />
            <main className="flex flex-col h-screen w-full bg-gradient-to-b from-black via-gray-500 to-white">
                <DashboardBanner currentMainContent={currentMainContent} />
                {mainContent(currentMainContent)}
            </main>
        </SidebarProvider>
    )
}