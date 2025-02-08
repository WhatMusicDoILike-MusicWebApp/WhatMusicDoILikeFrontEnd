import { useMemo } from "react";
import { renderBackground, UserLocation } from "../constants-types"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"


export const DashboardPage = ({ children }: { children: React.ReactNode }): JSX.Element => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className = 'flex flex-col w-full dark:bg-zinc-900 '>
                <SidebarTrigger />
                {children}
                <div className = 'flex'>
                </div>
            </main>
        </SidebarProvider>
    )
}