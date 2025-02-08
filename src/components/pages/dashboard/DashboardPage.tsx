import { useMemo } from "react";
import { renderBackground, UserLocation } from "../constants-types"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"


export const DashboardPage = ({ children }: { children: React.ReactNode }): JSX.Element => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
                <div className='dark:bg-zinc-900 dark:text-gray-100'>
                    <div className="p-8 flex items-start justify-center h-screen bg-cover bg-center"
                        style={{ backgroundImage: `url('${fetchBackground}')` }}
                    >
                    Hello! This is the Dashboard Page.
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}