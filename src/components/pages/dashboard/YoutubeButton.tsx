import { useEffect, useState } from "react";
import { FetchMusicDataResponse, Playlist, UserResponse } from "../constants-types";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { BACKEND_ENDPOINT, DEV_MODE } from "@/main";

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
            const response = await axios.post<string>(`http://127.0.0.1:5000/youtube/yt_auth`, {  userId } );
            console.log(response.data);  // Log response properly
            setUserInfo({ ...userInfo, ytToken: response.data});

        } catch (error) {
            console.error("Error during YouTube Auth:", error);
        }
    };  

    const handleRefreshYtDataClick = () => {
        const fetchMusicData = async () => {
            setIsFetchLoading(true);
            try {
                const response = await axios.get<Playlist[]>(`http://127.0.0.1:5000/youtube/yt_fetch_data`, { params: { userId: userId } });
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