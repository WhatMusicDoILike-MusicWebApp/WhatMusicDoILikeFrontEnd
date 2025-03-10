import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";

import { DashboardBanner } from "./DashboardBanner";
import { SideBar } from "./SideBar";
import { SidebarProvider } from "../../ui";
import { MainContent, UserResponse } from "../constants-types";
import { SpotifyContent } from "./SpotifyContent";
import axios from "axios";

export const DashboardPage = (): JSX.Element => {
    const [currentMainContent, setCurrentMainContent] = useState<MainContent | null>(null);
    const [userInfo, setUserInfo] = useState<UserResponse>({ userId: '', email: '', name: '', spotifyAuthToken: '', spotifyRefreshToken: '' });

    const clerk = useClerk();
    const { session } = useSession();
    const { userId } = useAuth();

    const mainContent = (content: MainContent | null) => {
        switch (content) {
            case MainContent.Spotify:
                return <SpotifyContent userInfo={userInfo} setUserInfo={setUserInfo} />;
            case MainContent.YoutubeMusic:
                return <>YoutubeMusic</>;
            case MainContent.Transfer:
                return <>Transfer</>;
            default:
                return (
                    <>
                        Hello! This is the Dashboard Page.
                    </>
                )
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
                await axios.get<UserResponse>('http://127.0.0.1:5000/users?userId=' + userId).then(response => {
                    const setUserConfig = {
                        userId: response.data.userId,
                        email: response.data.email,
                        name: response.data.name,
                        spotifyAuthToken: response.data.spotifyAuthToken,
                        spotifyRefreshToken: response.data.spotifyRefreshToken
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
                <DashboardBanner />
                <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center bg-gradient-to-b from-black via-gray-500 to-white">
                    {mainContent(currentMainContent)}
                </div>
            </main>
        </SidebarProvider>
    )
}