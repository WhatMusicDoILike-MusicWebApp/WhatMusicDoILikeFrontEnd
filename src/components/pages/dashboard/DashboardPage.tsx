import { SidebarProvider } from "@/components/ui/sidebar"
import { SideBar } from "./SideBar"

import { useClerk, useSession } from "@clerk/clerk-react"
import { useEffect } from "react"
import { DashboardBanner } from "./DashboardBanner"

export const DashboardPage = (): JSX.Element => {

    const clerk = useClerk();
    const { session, isSignedIn } = useSession();

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
    }, [isSignedIn, session]);

    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar name='Maayan' />
            <main className="flex flex-col h-screen w-full bg-gradient-to-b from-black via-gray-500 to-white">
                <DashboardBanner />

            </main>
        </SidebarProvider>
    )
}