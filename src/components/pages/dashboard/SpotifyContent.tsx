import { useState } from "react";
import { FetchMusicDataResponse } from "../constants-types";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui";
import { useSearchParams } from "react-router-dom";

export const SpotifyContent = (): JSX.Element => {
    const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const handleSpotifyAuthClick = () => {
        const clientID = "5b29e1d4b2464531bac914c3b00be5ec";
        const url = `https://accounts.spotify.com/en/authorize?client_id=${clientID}&response_type=code&scope=user-read-private+user-read-email+playlist-read-private+playlist-modify-public+playlist-modify-private&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdashboard&show_dialog=True`;
        window.location.replace(url);
    };

    if (code)
        console.log('code: ' + code);

    const fetchMusicData = async () => {
        setIsFetchLoading(true);
        try {
            // console.log('code: ' + code);
            // const response = await axios.post<FetchMusicDataResponse>('http://127.0.0.1:5000/spotify/fetchUserData', { code: code, userId: userId });
            // console.log('response: ', response.data);
        } catch (error) {
            setIsFetchLoading(false);
            console.log('Error: ' + error);
        } finally {
            setIsFetchLoading(false);
        }
    }

    return (
        <div >
            <Button onClick={() => handleSpotifyAuthClick()}>Auth</Button>
            <Button onClick={() => fetchMusicData()} disabled={isFetchLoading}>
                Fetch
                {isFetchLoading && <Loader2 className="animate-spin" />}
            </Button>
        </div>
    )
}