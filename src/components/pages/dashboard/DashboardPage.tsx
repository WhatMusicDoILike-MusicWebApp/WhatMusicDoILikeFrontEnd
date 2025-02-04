import { useMemo } from "react";
import { renderBackground, UserLocation } from "../constants-types"
import { NavBar } from "../NavBar"


export const DashboardPage = (): JSX.Element => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.DASHBOARD} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('${fetchBackground}')` }}
            >
                Hello! This is the Dashboard Page.
            </div>
        </div>
    )
}