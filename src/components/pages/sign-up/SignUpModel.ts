import { ClerkAPIErrorResponse, SignUpStep } from "../constants-types";

const isClerkAPIResponseError = (error: any): error is ClerkAPIErrorResponse => {
    return error.clerkError;
};

export const handleSignUp = async (
    email: string,
    password: string,
    setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    clerk: any,
): Promise<void> => {
    try {
        await clerk.client.signUp.create({ emailAddress: email, password });
        await clerk.client.signUp.prepareEmailAddressVerification();
        setCurrentStep(SignUpStep.Verification);
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
            setIsError(true);
            setErrorMessage(error.errors[0].longMessage);
        } else {
            setIsError(true);
            setErrorMessage('An unexpected error occurred.');
        }
    }
};

export const handleEmailVerification = async (
    code: string,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    clerk: any,
): Promise<void> => {

    try {
        const verify = await clerk.client.signUp.attemptEmailAddressVerification({ code });
        await clerk.setActive({ session: verify.createdSessionId });
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
            setIsError(true);
            const message = error.errors[0].longMessage === 'email_verification_code is not a valid parameter for this request.'
                ? "Invalid verification code. Please try again."
                : error.errors[0].longMessage;
            setErrorMessage(message);
        }
    }
};