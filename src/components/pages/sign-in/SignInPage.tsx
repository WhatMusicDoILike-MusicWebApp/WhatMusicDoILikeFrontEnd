import { useMemo } from "react";
import { renderBackground, UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { SignInForm } from "./SignInForm"

export const SignInPage = () => {


    // const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LOGIN} />
            <div className="pt-20 p-8 flex flex-col items-center justify-center  h-screen bg-cover bg-center bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-600"
            >
                <div className="text-center z-10 relative w-full max-w-2xl mx-auto">
                    {/* <h1 className="text-4xl font-bold p-8 text-white">Sign Up</h1> */}
                    <div className="flex justify-center items-center">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}