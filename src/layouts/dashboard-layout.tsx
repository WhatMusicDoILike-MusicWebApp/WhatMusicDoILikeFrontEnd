import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    const [theme, setTheme] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in')
        }
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Function to update theme dynamically
        const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
        };

        // Listen for theme changes
        mediaQuery.addEventListener("change", handleChange);

        // Apply the theme immediately
        document.documentElement.classList.toggle("dark", theme === "dark");

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [isLoaded, theme])

    if (!isLoaded) return <>Loading...</>;

    return <Outlet/>
}