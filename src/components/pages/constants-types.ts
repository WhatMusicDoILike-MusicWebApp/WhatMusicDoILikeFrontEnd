export enum UserLocation {
    LANDING,
    SIGNUP,
    LOGIN,
    DASHBOARD,
}

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

export const teamMembers = [
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

interface Playlist {
    playlistName: string;
    tracks: string[];
}

export interface FetchMusicDataResponse {
    userId: string;
    playlists: Playlist[];
}

export enum MainContent {
    Spotify = 'Spotify',
    YoutubeMusic = 'YoutubeMusic',
    Transfer = 'Transfer',
}

export interface User {
    userId: string;
    email: string;
    name: string;
    spotifyAuth: boolean;
}