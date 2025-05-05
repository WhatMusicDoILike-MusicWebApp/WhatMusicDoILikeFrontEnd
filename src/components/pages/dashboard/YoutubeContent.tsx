
import axios from "axios";
import { Button, Separator } from "../../ui";
import { useAuth } from "@clerk/clerk-react";
import { FetchMusicDataResponse, Playlist, UserResponse } from "../constants-types";
import { BACKEND_ENDPOINT } from "@/main";
import { PlaylistCards } from "./PlaylistCards";
import { useEffect, useState } from "react";
import { YtConnectRefreshButton } from "./YoutubeButton";


interface YtDashboardContentProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}

export const YoutubeContent = ({userInfo, setUserInfo}: YtDashboardContentProps): JSX.Element => {
    const { userId } = useAuth();
    const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
    

    const handlePlaylist = async () => {
        try {
            const response = await axios.post<FetchMusicDataResponse>(`${BACKEND_ENDPOINT}/youtube/yt_create_playlist`, {  userId } );
            console.log(response.data);  // Log response properly
        } catch (error) {
            console.error("Error during YouTube Auth:", error);
        }
    };  

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get<Playlist[]>(`${BACKEND_ENDPOINT}/youtube/yt_fetch_data`, { params: { userId } });
                console.log(response.data);
                setPlaylistData(response.data);
            } catch (error) {
                console.log('Error: ' + error);
            }
        };
    
        if (userInfo.ytToken) {
            fetchMusicData();
        }
    }, [userInfo, userId]);


    return (
        <>
            <div className="flex flex-row items-center justify-start px-8">
                <h1 className="text-2xl font-bold text-gray-100 pr-4">Playlists</h1>
                    <YtConnectRefreshButton userInfo={userInfo} setUserInfo={setUserInfo} setPlaylistData={setPlaylistData}/>
            </div>

            <div className='flex flex-col justify-center items-center w-full'>
                <div className='w-full px-8'>
                    <Separator className="my-4 rounded-sm" />
                </div>
            </div>
            <PlaylistCards playlistData={playlistData} />
        </>
    )
}