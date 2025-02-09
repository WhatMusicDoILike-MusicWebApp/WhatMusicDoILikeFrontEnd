import { useEffect, useMemo, useState } from "react";
import { renderBackground, UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { useAuth, useClerk, useSession } from "@clerk/clerk-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"


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

    const [theme, setTheme] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className = 'flex flex-col w-full dark:bg-zinc-900 '>
                <SidebarTrigger />
                <AppSidebar/>
                <div className = 'flex'>
                </div>
            </main>
        </SidebarProvider>
    )
}