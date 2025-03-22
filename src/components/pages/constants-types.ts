export enum UserLocation {
    LANDING,
    SIGNUP,
    LOGIN,
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

export enum MainContent {
    Spotify = 'Spotify',
    YoutubeMusic = 'YoutubeMusic',
    Transfer = 'Transfer',
    Insights = 'Insights',
}

export interface FetchMusicDataResponse {
    userId: string;
    playlists: Playlist[];
}

export interface UserResponse {
    userId: string;
    email: string;
    name: string;
    spotifyAuthToken: string;
    spotifyRefreshToken: string;
}

export interface Track {
    name: string;
    artist_string: string;
    artists: string[];
    imageUrl: string;
    url: string;
}

export interface Playlist {
    url: string;
    imageUrl: string;
    playlistName: string;
    tracks: Track[];
}

export interface UpdateUserPasswordParams {
    newPassword: string;
    currentPassword?: string;
    signOutOfOtherSessions?: boolean;
};