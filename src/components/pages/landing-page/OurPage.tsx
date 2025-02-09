
import { NavBar } from '../NavBar'
import { UserLocation } from '../constants-types'
import {
    Card,
    CardContent
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

    // const fetchBackground = useMemo(() => renderBackground(), []);

    return (
      <div>
        <div className= 'bg-slate-400'>
          <NavBar userLocation={UserLocation.LANDING} />
          <div className="pt-20 p-8 flex items-start justify-center min-h-screen bg-cover bg-center bg-gradient-to-b from-indigo-600 via-blue-400 to-sky-300"> 
              <div className="text-center z-10 relative">
                  <h1 className="text-4xl font-bold p-6 text-white">Meet The Team</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                      {teamMembers.map((member, index) => (
                          <Card key={index} className="p-4 shadow-md rounded-2xl item-center  dark:bg-zinc-900 dark:border-zinc-700 intersect:motion-preset-slide-up">
                          <CardContent className="flex flex-col items-center justify-center p-3">
                              <Avatar className="w-[100px] h-[100px]">
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <h2 className="text-xl font-bold dark:text-gray-100">{member.name}</h2>
                              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                              <p className="mt-2 dark:text-gray-100">{member.bio}</p>
                          </CardContent>
                          </Card>
                      ))}
                  </div>
              </div>
          </div>
        </div>
      </div>  
    )
}