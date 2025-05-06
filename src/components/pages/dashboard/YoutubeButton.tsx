import { useEffect, useState } from "react";
import {  Playlist, UserResponse } from "../constants-types";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui";
import { useAuth } from "@clerk/clerk-react";
import { BACKEND_ENDPOINT } from "@/main";

interface YtConnectRefreshButtonProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
    setPlaylistData: React.Dispatch<React.SetStateAction<Playlist[]>>;
}

export const YtConnectRefreshButton = ({ userInfo, setUserInfo, setPlaylistData }: YtConnectRefreshButtonProps): JSX.Element => {
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [displayConnect, setDisplayConnect] = useState<boolean>(false);
    const { userId } = useAuth();


    useEffect(() => {
        if (userInfo.ytToken) {
            setDisplayConnect(false);
        } else {
            setDisplayConnect(true);
        }
    }, [userInfo.ytToken]);

    const handleYtAuthClick = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_ENDPOINT}/youtube/yt_auth/init`, { userId });
    
            const { auth_url } = data;
    
            // Open the OAuth URL in a new tab
            window.open(auth_url, "_blank");
    
            // Start polling for OAuth completion
            const pollInterval = setInterval(async () => {
                try {
                    const pollResponse = await axios.get(`${BACKEND_ENDPOINT}/youtube/yt_auth/poll/${userId}`);
                    if (pollResponse.data.status === "authenticated") {
                        clearInterval(pollInterval);
                        // Save token state if you want to mark user as connected
                        setUserInfo({ ...userInfo, ytToken: "authenticated" }); 
                        setPlaylistData(pollResponse.data.playlists); // assuming playlists are returned
                    } else if (pollResponse.data.status === "error") {
                        clearInterval(pollInterval);
                        console.error("Error storing songs:", pollResponse.data.message);
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 5000); // Poll every 5 seconds
    
        } catch (error) {
            console.error("Error starting YouTube Auth:", error);
        }
    };

    const handleRefreshYtDataClick = () => {
        const fetchMusicData = async () => {
            setIsFetchLoading(true);
            try {
                const response = await axios.get<Playlist[]>(`${BACKEND_ENDPOINT}/youtube/yt_fetch_data`, { params: { userId: userId } });
                console.log('Response: ' + JSON.stringify(response.data));
                setPlaylistData(response.data);
            } catch (error) {
                setIsFetchLoading(false);
                console.log('Error: ' + error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchMusicData();
    }


    return (
        <>
            {displayConnect ? (
                <Button onClick={handleYtAuthClick}>Connect YoutubeMusic</Button>
            ) : (
                <Button disabled={isFetchLoading} onClick={handleRefreshYtDataClick}>
                    Refresh Data {isFetchLoading && <Loader2 className="animate-spin" />}
                </Button>
            )}
        </>
    )
}