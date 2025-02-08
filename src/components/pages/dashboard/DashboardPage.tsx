import { useEffect, useMemo } from "react";
import { renderBackground, UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";


export const DashboardPage = (): JSX.Element => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    const clerk = useClerk();
    const { userId } = useAuth();
    const { session, isSignedIn } = useSession();

    const handleSignOutConfirmClick = () => {
        clerk.signOut();
    };

    useEffect(() => {
        const handleUnload = () => {
            if (isSignedIn) {
                clerk.signOut();
            }
        }

        window.addEventListener('beforeunload', handleUnload)
        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }
    }, [isSignedIn, session])

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.DASHBOARD} handleSignOutConfirmClick={handleSignOutConfirmClick} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('${fetchBackground}')` }}
            >
                Hello! This is the Dashboard Page.
            </div>
        </div>
    )
}