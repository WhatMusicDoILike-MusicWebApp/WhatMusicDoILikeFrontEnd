import { useEffect, useState } from "react";
import { FetchMusicDataResponse } from "../constants-types";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

interface SpotifyContentProps {
    isSpotifyConnected: boolean;
}

export const SpotifyContent = ({ isSpotifyConnected }: SpotifyContentProps): JSX.Element => {
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
    const [displaySpotifyConnect, setDisplaySpotifyConnect] = useState<boolean>(!isSpotifyConnected);
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
                console.log('response: ', response.data);
            } catch (error) {
                console.log('Error: ' + error);
            }
            setDisplaySpotifyConnect(false);
        }


        if (code != null && displaySpotifyConnect) {
            console.log('code Received fetching data with: ' + code);
            establishSpotifyConnection();
        }

    }, [code]);

    const handleFetchDataClick = () => {
        const fetchMusicData = async () => {
            setIsFetchLoading(true);
            try {
                console.log('code: ' + code);
                const response = await axios.get<FetchMusicDataResponse>('http://127.0.0.1:5000/spotify/fetchUserData', { params: { userId: userId } });
                console.log('response: ', response.data);
            } catch (error) {
                setIsFetchLoading(false);
                console.log('Error: ' + error);
            } finally {
                setIsFetchLoading(false);
            }
        }

        if (!displaySpotifyConnect) {
            fetchMusicData();
        }
    }

    return (
        <div>
            {displaySpotifyConnect && <Button onClick={() => handleSpotifyAuthClick()}>Connect Your Spotify</Button>}
            {!displaySpotifyConnect &&
                (<Button disabled={isFetchLoading} onClick={() => handleFetchDataClick()}>
                    Fetch Your Spotify Data
                    {isFetchLoading && <Loader2 className="animate-spin" />}
                </Button>)}
        </div>
    )
}