import { useEffect, useState } from "react";
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { DashboardBanner } from "./DashboardBanner";
import { SideBar } from "./SideBar";
import { Button, SidebarProvider } from "../../ui";
import { FetchMusicDataResponse } from "../constants-types";
import { Loader2 } from "lucide-react";

export const DashboardPage = (): JSX.Element => {
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

    const clerk = useClerk();
    const { session } = useSession();
    const { userId } = useAuth();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    console.log('session: ' + session?.expireAt);
    console.log('userId: ' + userId);

    if (code)
        console.log('code: ' + code);

    useEffect(() => {
        if (session?.expireAt && session.expireAt < new Date()) {
            clerk.signOut();
        }
    }, [session]);

    const handleSpotifyAuthClick = () => {
        const clientID = "5b29e1d4b2464531bac914c3b00be5ec";
        const url = `https://accounts.spotify.com/en/authorize?client_id=${clientID}&response_type=code&scope=user-read-private+user-read-email+playlist-read-private+playlist-modify-public+playlist-modify-private&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdashboard&show_dialog=True`;
        window.location.replace(url);
    };

    const fetchMusicData = async () => {
        setIsFetchLoading(true);
        try {
            console.log('code: ' + code);
            const response = await axios.post<FetchMusicDataResponse>('http://127.0.0.1:5000/spotify/fetchUserData', { code: code, userId: userId });
            console.log('response: ', response.data);
        } catch (error) {
            setIsFetchLoading(false);
            console.log('Error: ' + error);
        } finally {
            setIsFetchLoading(false);
        }
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar />
            <main className="flex flex-col h-screen w-full bg-gradient-to-b from-black via-gray-500 to-white">
                <DashboardBanner />
                <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center bg-gradient-to-b from-black via-gray-500 to-white">
                    Hello! This is the Dashboard Page.

                    <Button onClick={() => handleSpotifyAuthClick()}>Auth</Button>
                    <Button onClick={() => fetchMusicData()} disabled={isFetchLoading}>
                        Fetch
                        {isFetchLoading && <Loader2 className="animate-spin" />}
                    </Button>
                </div>
            </main>
        </SidebarProvider>
    )
}