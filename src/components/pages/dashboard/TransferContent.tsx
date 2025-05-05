import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { FetchMusicDataResponse, Playlist, UserResponse } from "../constants-types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BACKEND_ENDPOINT } from "@/main";
import axios from "axios";

interface TransferContentProps {
    userInfo: UserResponse;
}

export const TransferContent = ({ userInfo }: TransferContentProps): JSX.Element => {
    const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<number>();
    const [selectedService, setSelectedService] = useState<string>("");

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get<FetchMusicDataResponse>(`${BACKEND_ENDPOINT}/playlists`, { params: { userId: userInfo.userId } });
                console.log(response.data);
                const filteredPlaylists = response.data.playlists;
                setPlaylistData(filteredPlaylists);
            } catch (error) {
                console.log('Error: ' + error);
            }
        }

        if (userInfo.userId)
            fetchMusicData();
    }, [userInfo]);


    const handleTransferClick = async () => {


        // if (!selectedPlaylist || !selectedService) {
        //     console.error("Please select a playlist and a destination service.");
        //     return;
        // }

        // const transferData = {
        //     playlistId: selectedPlaylist,
        //     destinationService: selectedService,
        // };

        try {
            // const response = await axios.post(`${BACKEND_ENDPOINT}/transfer`, transferData);
            console.log("Transfer clicked")
            console.log("Selected Playlist ID:", selectedPlaylist);
            console.log("Selected Service:", selectedService);
        } catch (error) {
            console.error("Error transferring playlist:", error);
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-start px-8">
                <h1 className="text-2xl font-bold text-gray-100 pr-4">Transfer</h1>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                <div className='w-full px-8'>
                    <Separator className="my-4 rounded-sm" />
                </div>
            </div>
            <div className='h-full w-full'>
                <div className='flex flex-row items-center justify-center  py-5 h-full w-full'>

                    {playlistData &&
                        <Card className="w-full max-w-xs min-w-[200px] h-[300px]">
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-bold">Transfer Playlists</CardTitle>
                                <CardDescription>Select which playlist to Transfer</CardDescription>
                            </CardHeader>

                            <CardContent>

                                <div className="flex flex-col items-center justify-center w-full gap-2">

                                    <Select onValueChange={(value) => {
                                        const selected = playlistData.find(playlist => playlist.playlistName == value);
                                        if (selected) setSelectedPlaylist(selected.playlistId);
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Playlist" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {playlistData.length > 0 && playlistData.map((playlist) => (
                                                <SelectItem key={playlist.playlistId} value={playlist.playlistName}>
                                                    <div className="flex items-center justify-start">
                                                        {playlist.playlistImageUrl && <img src={playlist.playlistImageUrl} className="w-8 h-8 rounded-sm" />}
                                                        <div className='pl-2'>
                                                            <a href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
                                                                {playlist.playlistName}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select onValueChange={(value) => setSelectedService(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Destination Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Spotify">
                                                <div className="flex items-center justify-start">
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                                                        className="w-5 h-5 mr-2"
                                                    />
                                                    Spotify
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="YoutubeMusic">
                                                <div className="flex items-center justify-start">
                                                    <img
                                                        src="https://img.icons8.com/color/48/youtube-music.png"
                                                        className="w-5 h-5 mr-2"
                                                    />
                                                    YouTube Music
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button className="w-full bg-black text-white py-2 px-4 rounded" onClick={handleTransferClick}>
                                        Transfer
                                    </Button>
                                </div>


                            </CardContent>
                        </Card>
                    }
                </div>
            </div>


        </>
    )
}