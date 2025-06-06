import { useEffect, useState } from 'react';
import { Separator } from '../../ui';
import { FetchMusicDataResponse, Playlist, UserResponse } from '../constants-types';
import { SpotifyConnectRefreshButton } from './SpotifyConnectRefreshButton';
import { PlaylistCards } from './PlaylistCards';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/main';

interface SpotifyDashboardContentProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}

export const SpotifyDashboardContent = ({ userInfo, setUserInfo }: SpotifyDashboardContentProps): JSX.Element => {
    const [playlistData, setPlaylistData] = useState<Playlist[]>([]);

    useEffect(() => {
        const fetchSpotifyMusicData = async () => {
            try {
                const response = await axios.get<FetchMusicDataResponse>(`${BACKEND_ENDPOINT}/playlists`, { params: { userId: userInfo.userId } });
                console.log(response.data);
                const filteredPlaylists = response.data.playlists.filter(playlist => playlist.isYtPlaylist == false);
                setPlaylistData(filteredPlaylists);
            } catch (error) {
                console.log('Error: ' + error);
            }
        }

        if (userInfo.userId)
            fetchSpotifyMusicData();
    }, [userInfo]);

    return (
        <>
            <div className="flex flex-row items-center justify-start px-8">
                <h1 className="text-2xl font-bold text-gray-100 pr-4">Playlists</h1>
                <SpotifyConnectRefreshButton userInfo={userInfo} setUserInfo={setUserInfo} setPlaylistData={setPlaylistData} />
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