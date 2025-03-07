import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";

import { DashboardBanner } from "./DashboardBanner";
import { SideBar } from "./SideBar";
import { SidebarProvider } from "../../ui";
import { MainContent, User } from "../constants-types";
import { SpotifyContent } from "./SpotifyContent";
import axios from "axios";

export const DashboardPage = (): JSX.Element => {
    const [currentMainContent, setCurrentMainContent] = useState<MainContent>(MainContent.Spotify);
    const [userInfo, setUserInfo] = useState<User>({ userId: '', email: '', name: '', spotifyAuth: false });

    const clerk = useClerk();
    const { session } = useSession();
    const { userId } = useAuth();


    const mainContent = (content: MainContent) => {
        switch (content) {
            case MainContent.Spotify:
                return <SpotifyContent isSpotifyConnected={userInfo.spotifyAuth} />;
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

    console.log('session: ' + session?.expireAt);
    console.log('userId:     ' + userId);

    useEffect(() => {
        if (session?.expireAt && session.expireAt < new Date()) {
            clerk.signOut();
        }
    }, [session]);

    useEffect(() => {
        const fetchUser = async () => {

            try {
                const response = await axios.get('http://127.0.0.1:5000/users?userId=' + userId);
                console.log('response: ', response.data);
                const name = response.data.name;
                const email = response.data.email;
                const spotifyAuth = response.data.spotifyAuth != null;
                if (userId)
                    setUserInfo({ userId: userId, email: email, name: name, spotifyAuth: spotifyAuth });
            } catch (error) {
                console.log('Error: ' + error);
            } finally {
                console.log('User Info: ' + userInfo);
            }


        }

        fetchUser();
    }, []);

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