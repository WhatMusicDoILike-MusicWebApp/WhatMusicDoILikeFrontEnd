
import axios from "axios";
import { Button } from "../../ui";
import { useAuth } from "@clerk/clerk-react";

export const YoutubeContent = (): JSX.Element => {
    const { userId } = useAuth();

    const handleYtAuthClick = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/youtube/yt_auth', { userId });
            console.log(response.data);  // Log response properly
        } catch (error) {
            console.error("Error during YouTube Auth:", error);
        }
    };  


    return (
        <div>
            <Button onClick={handleYtAuthClick}>Connect and Fetch Your Youtube</Button>
        </div>
    )
}