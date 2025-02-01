import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"

export const NavBar = (): JSX.Element => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-900 shadow-md z-50">
            <div className="flex justify-between items-center p-3">
                <NavigationMenu orientation="horizontal">
                    <NavigationMenuList className="flex items-center space-x-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100  
                                transition-all duration-300 hover:scale-105"
                            >
                                <img src="/LittleLogoIS.svg" className="w-6 h-6 transition-transform duration-300"></img>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 
                                hover:bg-gray-200 dark:hover:bg-zinc-800 
                                transition-all duration-300 hover:scale-105"
                            >
                                WhatMusicDoILike?
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 
                                hover:bg-gray-200 dark:hover:bg-zinc-800 
                                transition-all duration-300 hover:scale-105"
                            >
                                The Team
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                    <NavigationMenuList className="flex items-center space-x-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className="block px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 
                                hover:bg-gray-200 dark:hover:bg-zinc-800 
                                transition-all duration-300 hover:scale-105"
                            >
                                Sign In
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button>Get Started</Button>
                            {/* <NavigationMenuLink
                                className="block px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 
                                hover:bg-gray-200 dark:hover:bg-zinc-800 
                                transition-all duration-300 hover:scale-105"
                            >
                                Sign In
                            </NavigationMenuLink> */}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}