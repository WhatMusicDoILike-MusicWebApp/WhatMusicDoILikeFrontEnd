import { CirclePlay , Home, Cloud , Search, SquareUser , Music } from "lucide-react"


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
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Apple Music",
    url: "#",
    icon: Music,
  },
  {
      title: "Spotify",
      url: "#",
      icon: Search,
    },
    {
        title: "Youtube Music",
        url: "#",
        icon: CirclePlay,
    },
    {
      title: "SoundCloud",
      url: "#",
      icon: Cloud,
    },
    {
        title: "Profile",
        url: "#",
        icon: SquareUser,
    },
]

const logout = [
    {
        title: "Log Out",
        icon: Home,
    }
]

export function AppSidebar() {
  return (
        <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Welcome UsernameHere</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <SidebarMenu>
                {logout.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
        </SidebarFooter>
        </Sidebar>
  )
}
