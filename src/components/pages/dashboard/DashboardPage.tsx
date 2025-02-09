import { useEffect } from "react";
import { UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { useClerk, useSession } from "@clerk/clerk-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "./SideBar";

export const DashboardPage = (): JSX.Element => {

    const clerk = useClerk();
    // const { userId } = useAuth();
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
        <SidebarProvider>
            <NavBar userLocation={UserLocation.DASHBOARD} handleSignOutConfirmClick={handleSignOutConfirmClick} />
            <main className='flex flex-col w-full dark:bg-zinc-900 '>
                <SidebarTrigger />
                <SideBar />
                <div className='flex'>
                </div>
            </main>
        </SidebarProvider>
    )
}