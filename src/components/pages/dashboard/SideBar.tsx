import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "../../ui"
import { CirclePlay, LogOut, Music, SquareUser } from "lucide-react"

export const SideBar = (): JSX.Element => {

    const items = [
        {
            title: "Spotify",
            url: "#",
            icon: Music,
        },
        {
            title: "Youtube Music",
            url: "#",
            icon: CirclePlay,
        },
        {
            title: "Transfer",
            url: "#",
            icon: SquareUser,
        },
    ]

    return (
        <Sidebar collapsible="icon" className=" text-[var(--sidebar - foreground)]">
            < SidebarContent className=" bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 ">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-900 dark:text-gray-100 ">WhatMusicDoILike?</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <a href={item.url} className="flex items-center gap-2 hover:text-black dark:hover:text-black transition-colors">
                                            <item.icon className="text-gray-500 dark:text-gray-400 transition-colors" strokeWidth={3} />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent >
            <SidebarFooter className=" bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 ">
                <SidebarMenu>
                    <SidebarMenuItem key={"Settings"}>
                        <SidebarMenuButton asChild>
                            <a href={'#'}>
                                <LogOut color="white" strokeWidth={3} />
                                <span>{'Settings'}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail className=" bg-black dark:bg-zinc-900 text-gray-900 dark:text-black hover:text-black" />
        </Sidebar >
    )
}