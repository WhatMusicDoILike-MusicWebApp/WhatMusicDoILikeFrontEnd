import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { useNavigate } from "react-router-dom"

export const WelcomeLanding = () => {

    const navigate = useNavigate();

    return (
        <div className=' flex flex-col dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LANDING} />
            <div className="pt-25 flex items-center h-screen bg-cover bg-center justify-evenly gap-15 bg-gradient-to-b from-sky-700 via-sky-300 to-white dark:from-sky-300 dark:via-sky-700 dark:to-slate-800">
                <h1 className=" min-w-[485px] text-5xl font-bold p-8 text-white text-center w-2/5">Welcome to WhatMusicDoILike?</h1>
                <div className="flex flex-col justify-evenly w-screen max-w-[50%]">
                    <Card className="intersect:motion-opacity-in-0 intersect:motion-translate-x-in-100 motion-duration-800 max-w-2xl min-w-[614px] shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0">
                        <CardHeader>
                            <CardTitle className="text-start ml-2">Usability</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-center text-start">
                            <CardDescription className="text-md text-gray-900 dark:text-gray-100 flex-1">
                                Connect your favorite music apps and get insights about your music.
                            </CardDescription>
                            <Separator orientation="vertical" className="h-20 w-0.5 rounded-md bg-zinc-700 mx-4" />
                            <CardDescription className="text-md text-gray-900 dark:text-gray-100 flex-1">
                                Transfer Music from one platform to another with ease.
                            </CardDescription>
                            <Separator orientation="vertical" className="h-20 w-0.5 rounded-md bg-zinc-700 mx-4" />
                            <CardDescription className="text-md text-gray-900 dark:text-gray-100 flex-1">
                                Spice up your music experience with our recommendations.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="min-w-[614px] intersect:motion-opacity-in-0 intersect:motion-translate-x-in-100 motion-duration-800 max-w-2xl w-full shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0 mt-3">
                        <CardHeader>
                            <CardTitle className="text-start ml-2">Inspiration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-md text-gray-900 dark:text-gray-100">
                                We believe that music is a universal language that connects people across the globe.
                                Our goal is to help users explore new music and share their music preferences with others.
                            </CardDescription>
                            <div className='flex justify-end mr-2'>
                                <Button variant='link' className="mt-4 transition-all duration-300 hover:scale-105" onClick={() => (window.location.href = "#team-page")}>About Us</Button>
                                <Button className="mt-4 hover:bg-zinc-800 transition-all duration-300 hover:scale-105" onClick={() => navigate('/sign-up')}>Get Started</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}