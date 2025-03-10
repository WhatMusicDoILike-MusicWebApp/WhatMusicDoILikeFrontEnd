import { useEffect, useState } from "react";
import { FetchMusicDataResponse, UserResponse } from "../constants-types";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

interface SpotifyContentProps {
    userInfo: UserResponse;
    setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}

export const SpotifyContent = ({ userInfo, setUserInfo }: SpotifyContentProps): JSX.Element => {
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const { userId } = useAuth();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const handleSpotifyAuthClick = () => {
        const clientID = "5b29e1d4b2464531bac914c3b00be5ec";
        const url = `https://accounts.spotify.com/en/authorize?client_id=${clientID}&response_type=code&scope=user-read-private+user-read-email+playlist-read-private+playlist-modify-public+playlist-modify-private&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdashboard&show_dialog=True`;
        window.location.replace(url);
    };

    useEffect(() => {

        const establishSpotifyConnection = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/spotify/initializeConnection', { userId, code: code });

                setUserInfo({ ...userInfo, spotifyAuthToken: response.data.spotifyAuthToken, spotifyRefreshToken: response.data.spotifyRefreshToken });

            } catch (error) {
                console.log('Error: ' + error);
            }

        }

        if (code && !userInfo.spotifyAuthToken) {
            console.log('code Received fetching data with: ' + code);
            establishSpotifyConnection();
        }

    }, [code]);

    const handleRefreshSpotifyDataClick = () => {
        const fetchMusicData = async () => {
            setIsFetchLoading(true);
            try {
                const response = await axios.get<FetchMusicDataResponse>('http://127.0.0.1:5000/spotify/fetchUserData', { params: { userId: userId } });
                console.log(response.data);
            } catch (error) {
                setIsFetchLoading(false);
                console.log('Error: ' + error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        fetchMusicData();
    }

    const displaySpotifyConnect = !userInfo.spotifyAuthToken || !userInfo.spotifyRefreshToken;

    return (
        <div>
            {displaySpotifyConnect ? (
                <Button onClick={handleSpotifyAuthClick}>Connect Your Spotify</Button>
            ) : (
                <Button disabled={isFetchLoading} onClick={handleRefreshSpotifyDataClick}>
                    Fetch Your Spotify Data {isFetchLoading && <Loader2 className="animate-spin" />}
                </Button>
            )}
        </div>
    )
}