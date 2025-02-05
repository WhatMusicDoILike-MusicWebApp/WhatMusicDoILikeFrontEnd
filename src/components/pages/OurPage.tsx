import { useMemo } from 'react';
import { NavBar } from './NavBar'
import { renderBackground, UserLocation } from './constants-types'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


  const teamMembers = [
    {
      name: "Ethan Pan",
      role: "FrontEnd Developer",
      bio: "Ethan designs webpages using ShadCN, Tailwind, and React.",
    },
    {
      name: "Maayan Israel",
      role: "FullStack Developer",
      bio: "Knows Everything.....",
    },
    {
      name: "Caleb Ng",
      role: "BackEnd Developer",
      bio: "Caleb focuses on server-side logic and database management.",
    },
    {
      name: "Iker Goni",
      role: "BackEnd Developer",
      bio: "Iker works with setting up all API endpoints.",
    },
  ];

export const OurPage= () => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LANDING} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('${fetchBackground}')` }}
            >
                <div className="text-center z-10 relative">
                    <h1 className="text-4xl font-bold p-8 text-white">Meet The Team</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="p-4 shadow-md rounded-2xl">
                            <CardContent>
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-bold">{member.name}</h2>
                                <p className="text-gray-500">{member.role}</p>
                                <p className="mt-2">{member.bio}</p>
                            </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>   
    )
}