import { ClerkAPIErrorResponse } from "../constants-types";
import { useClerk } from "@clerk/clerk-react";

export interface SignInModelProps {
    email: string;
    password: string;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    navigate: (path: string) => void;
    clerk: ReturnType<typeof useClerk>;
}

export const handleSignIn = async ({
    email,
    password,
    setIsError,
    setErrorMessage,
    clerk,
}: SignInModelProps): Promise<void> => {

    try {
        const signInAttempt = await clerk.client.signIn.create({
            identifier: email,
            password,
        });

        if (signInAttempt.status === "complete") {
            await clerk.setActive({ session: signInAttempt.createdSessionId });
        } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
        }
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        const errorString = error as ClerkAPIErrorResponse;
        setIsError(true);
        setErrorMessage(errorString.errors[0].longMessage
            ? errorString.errors[0].longMessage
            : "An unexpected error occurred.");
    }
};