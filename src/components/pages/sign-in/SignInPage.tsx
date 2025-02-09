import { UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"
import { SignInForm } from "./SignInForm"

export const SignInPage = () => {

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LOGIN} />
            <div className="pt-20 p-8 flex flex-col items-center justify-center h-screen bg-cover bg-center bg-gradient-to-b from-black via-gray-500 to-white"
            >
                <div className="text-center z-10 relative w-full max-w-2xl mx-auto">
                    <div className="flex justify-center items-center">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    )
}