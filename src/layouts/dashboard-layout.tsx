import { useEffect } from 'react';
import { useAuth, useSession } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth();
    const { session } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in')
        }
    }, [isLoaded, session])

    if (!isLoaded) return <>Loading...</>;

    return <Outlet />
}