import { renderBackground, SignUpStep, UserLocation } from '../constants-types'
import { NavBar } from '../NavBar'
import { useEffect, useMemo, useState } from 'react';
import { SignUpForm } from './SignUpForm';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { EmailVerificationForm } from './EmailVerificationForm';

export const SignUpPage = (): JSX.Element => {
    const [dbUserEmail, setDBUserEmail] = useState<string>('');
    const [dbUserName, setDBUserName] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<SignUpStep>(SignUpStep.SignUp);
    const navigate = useNavigate();

    // const databaseEndpoint = 1; 

    // useEffect(() => {
    //     // const createUser = async () => {
    //     //     if (userId && isLoaded) {
    //     //         console.log('User ID:', userId);
    //     //         const response = await axios.post(`https://${databaseEndpoint}/users`, { id: userId, email: dbUserEmail, name: dbUserName });
    //     //         console.log("Created User:", response.data);
    //     //         navigate(`/dashboard/${userId}`);
    //     //     }
    //     // };
    //     // createUser();
    // }, [userId, isLoaded]);

    const steps = (step: SignUpStep) => {
        switch (step) {
            case SignUpStep.SignUp:
                return <SignUpForm setCurrentStep={setCurrentStep} setDBUserEmail={setDBUserEmail} setDBUserName={setDBUserName} />
            case SignUpStep.Verification:
                return <EmailVerificationForm />
        }
    }

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className=' flex flex-col dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.SIGNUP} />
            <div className="pt-20 p-8 flex flex-col items-center justify-center h-screen bg-cover bg-center bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-600">
                <div className="text-center z-10 relative w-full max-w-2xl mx-auto">
                    {/* <h1 className="text-4xl font-bold p-8 text-white">Create Your Account</h1> */}
                    <div className="flex justify-center items-center">
                        {steps(currentStep)}
                    </div>
                </div>
            </div>
        </div>
    );

}
