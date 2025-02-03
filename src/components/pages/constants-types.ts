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