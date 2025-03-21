import { UserLocation } from "./constants-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Button,
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "../ui";


interface NavigationBarProps {
    userLocation?: UserLocation;
    handleSignOutConfirmClick?: () => void;
}

export const NavBar = ({ userLocation }: NavigationBarProps): JSX.Element => {
    const [navItems, setNavItems] = useState<JSX.Element[]>([]);
    const navigate = useNavigate();



    const getStartedButton = <Button className="hover:bg-zinc-800 transition-all duration-300 hover:scale-105" onClick={() => navigate('/sign-up')}>Get Started</Button>;
    const signInButton =
        <NavigationMenuLink onClick={() => navigate('/sign-in')}
            className="block px-4 py-2 rounded-md text-gray-900
                    dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-800 
                    transition-all duration-300 hover:scale-105">
            Sign In
        </NavigationMenuLink>;

    const signUpButton = <Button onClick={() => navigate('/sign-up')}>Sign Up</Button>;

    const renderNavBarUtils = (userLocation?: UserLocation): JSX.Element[] => {
        switch (userLocation) {
            case UserLocation.SIGNUP:
                return [signInButton];
            case UserLocation.LOGIN:
                return [signUpButton];
            default:
                return [signInButton, getStartedButton];
        }
    };

    useEffect(() => {
        setNavItems(renderNavBarUtils(userLocation));
    }, [userLocation]);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-900 shadow-md z-50 h-16">
            <div className="flex justify-between items-center p-3">
                <NavigationMenu orientation="horizontal">
                    <NavigationMenuList className="flex items-center space-x-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 
                                hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
                                onClick={() => navigate('/')}
                            >
                                <div className="flex items-center">
                                    <img src="/LittleLogoIS.svg" className="w-6 h-6 mr-3 transition-transform duration-300"></img>
                                    WhatMusicDoILike?
                                </div>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {userLocation === UserLocation.LANDING && (
                            <NavigationMenuItem>
                                <NavigationMenuLink className="block px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 
                                    hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
                                    href="#team-page"
                                >
                                    The Team
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                    <NavigationMenuList className="flex items-center space-x-2">
                        {navItems.map((button, index) => (
                            <NavigationMenuItem key={index}>{button}</NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
};
