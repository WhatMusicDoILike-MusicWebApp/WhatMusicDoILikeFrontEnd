import { SignUpStep, UserLocation } from '../constants-types'
import { NavBar } from '../NavBar'
import { useEffect, useState } from 'react';
import { SignUpForm } from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { EmailVerificationForm } from './EmailVerificationForm';
import { useAuth, useSession } from '@clerk/clerk-react';

export const SignUpPage = (): JSX.Element => {
    const [dbUserEmail, setDBUserEmail] = useState<string>('');
    const [dbUserName, setDBUserName] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<SignUpStep>(SignUpStep.SignUp);
    const navigate = useNavigate();
    const { userId, isLoaded } = useAuth();
    const { session } = useSession();

    useEffect(() => {
        const createUser = async () => {
            if (session) {
                const response = await axios.post(`https://api.whatmusicdoilike.com/users`, { userId: userId, email: dbUserEmail, name: dbUserName });
                console.log("Created User:", response.data);
                navigate(`/dashboard`);
            }

            //add in error handling to check if user was created, if not, display error message and have user re signup and break clerk session
        };

        if (userId && isLoaded)
            createUser();
    }, [userId, isLoaded, session]);

    const steps = (step: SignUpStep) => {
        switch (step) {
            case SignUpStep.SignUp:
                return <SignUpForm setCurrentStep={setCurrentStep} setDBUserEmail={setDBUserEmail} setDBUserName={setDBUserName} />
            case SignUpStep.Verification:
                return <EmailVerificationForm />
        }
    }

    return (
        <div className=' flex flex-col dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.SIGNUP} />
            <div className="pt-20 p-8 flex flex-col items-center justify-center h-screen bg-cover bg-center bg-gradient-to-b from-black via-gray-500 to-white">
                <div className="text-center z-10 relative w-full max-w-2xl mx-auto">
                    <div className="flex justify-center items-center">
                        {steps(currentStep)}
                    </div>
                </div>
            </div>
        </div>
    );

}
