import { useEffect } from "react";
import { UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export const DashboardPage = (): JSX.Element => {

    const clerk = useClerk();
    const { session } = useSession();
    const { userId } = useAuth();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    console.log('session: ' + session?.expireAt);

    if (code)
        console.log('code: ' + code);

    useEffect(() => {

        const fetchMusicData = async (code: string) => {
            console.log('code: ' + code);
            const response = await axios.post('http://127.0.0.1:5000/spotify/fetchData', { code: code });
            console.log('reponse' + response);
        }

        if (code)
            fetchMusicData(code);
    }, [code]);

    useEffect(() => {
        if (session?.expireAt && session.expireAt < new Date()) {
            clerk.signOut();
        }
    }, [session]);

    const handleSignOutConfirmClick = () => {
        clerk.signOut();
    };

    const handleSpotifyAuthClick = () => {
        //params = {
        //    'client_id': CLIENT_ID,
        //   'response_type': 'code',
        //    'scope': scope, user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private'
        //  'redirect_uri': REDIRECT_URI,
        // } */

        const clientID = "5b29e1d4b2464531bac914c3b00be5ec";

        const url = `https://accounts.spotify.com/en/authorize?client_id=${clientID}&response_type=code&scope=user-read-private+user-read-email+playlist-read-private+playlist-modify-public+playlist-modify-private&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdashboard&show_dialog=True`;

        window.location.replace(url);

    };

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.DASHBOARD} handleSignOutConfirmClick={handleSignOutConfirmClick} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center bg-gradient-to-b from-black via-gray-500 to-white">
                Hello! This is the Dashboard Page.
                <Button onClick={() => handleSpotifyAuthClick()}>Auth</Button>
            </div>
        </div>
    )
}