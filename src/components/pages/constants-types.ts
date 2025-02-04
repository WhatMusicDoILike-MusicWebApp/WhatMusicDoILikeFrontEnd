export enum UserLocation {
    LANDING,
    SIGNUP,
    LOGIN,
    DASHBOARD,
}

export const renderBackground = (): string => {
    const images = [
        "/backgroundimage1.png",
        "/backgroundimage2.jpg",
        "/backgroundimage3.jpg",
        "/backgroundimage4.jpg",
    ];

    const selector = Math.floor(Math.random() * images.length);
    return images[selector];
};

export enum SignUpStep {
    SignUp,
    Verification,
}

export interface ClerkAPIError {
    code: string;
    message: string;
    longMessage: string;
    meta?: {
        paramName?: string;
        sessionId?: string;
        emailAddresses?: string[];
        identifiers?: string[];
        zxcvbn?: {
            suggestions: {
                code: string;
                message: string;
            }[];
        };
        permissions?: string[];
    };
}

export interface ClerkAPIErrorResponse {
    status: number;
    clerkError: boolean;
    errors: ClerkAPIError[];
}