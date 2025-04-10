
import axios from "axios";
import { Button, Separator } from "../../ui";
import { useAuth } from "@clerk/clerk-react";
import { FetchMusicDataResponse, Playlist } from "../constants-types";
import { BACKEND_ENDPOINT } from "@/main";
import { PlaylistCards } from "./PlaylistCards";
import { useState } from "react";

export const YoutubeContent = (): JSX.Element => {
    const { userId } = useAuth();
    const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
    

    const handleYtAuthClick = async () => {
        try {
            const response = await axios.post<Playlist[]>(`${BACKEND_ENDPOINT}/youtube/yt_auth`, {  userId } );
            console.log(response.data);  // Log response properly
            setPlaylistData(response.data)
        } catch (error) {
            console.error("Error during YouTube Auth:", error);
        }
    };  

    const handlePlaylist = async () => {
        try {
            const response = await axios.post<FetchMusicDataResponse>(`${BACKEND_ENDPOINT}/youtube/yt_create_playlist`, {  userId } );
            console.log(response.data);  // Log response properly
        } catch (error) {
            console.error("Error during YouTube Auth:", error);
        }
    };  


    return (
        <>
            <div className="flex flex-row items-center justify-start px-8">
                <h1 className="text-2xl font-bold text-gray-100 pr-4">Playlists</h1>
                    <Button onClick={handleYtAuthClick}>Connect and Fetch Your Youtube</Button>
                <h2 className="text-2xl font-bold text-gray-100 pr-4">Create PLaylist</h2>
                    <Button onClick={handlePlaylist}>Playlist Test</Button>
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