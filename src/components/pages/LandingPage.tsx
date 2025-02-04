import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { renderBackground, UserLocation } from './constants-types'
import { NavBar } from './NavBar'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useMemo } from 'react'

export const LandingPage = (): JSX.Element => {

    const navigate = useNavigate();
    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LANDING} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('${fetchBackground}')` }}
            >
                <div className="text-center z-10 relative">
                    <h1 className="text-4xl font-bold p-8 text-white">Welcome to WhatMusicDoILike?</h1>
                    <Card className="max-w-2xl w-full shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0">
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
                    <Card className="max-w-2xl w-full shadow-lg dark:bg-zinc-900 text-gray-900 dark:text-gray-100 text-start border-0 mt-3">
                        <CardHeader>
                            <CardTitle className="text-start ml-2">Inspiration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-md text-gray-900 dark:text-gray-100">
                                We believe that music is a universal language that connects people across the globe.
                                Our goal is to help users explore new music and share their music preferences with others.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <div className='flex justify-end mr-2'>
                        <Button variant='link' className="mt-4 transition-all duration-300 hover:scale-105" onClick={() => console.log('About Us Clicked!')}>About Us</Button>
                        <Button className="mt-4 hover:bg-zinc-800 transition-all duration-300 hover:scale-105" onClick={() => navigate('/sign-up')}>Get Started</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
