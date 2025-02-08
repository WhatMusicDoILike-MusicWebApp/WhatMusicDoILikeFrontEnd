import { CirclePlay , Home, Cloud , Search, SquareUser , Music , LogOut } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
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
        url: "#",
        icon: LogOut,
    }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]">
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Welcome UsernameHere</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon color = "#0080ff" strokeWidth={3}/>
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
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
                        <a href={item.url}>
                        <item.icon color = "#0080ff" strokeWidth={3}/>
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
