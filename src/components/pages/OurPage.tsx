import { useMemo } from 'react';
import { NavBar } from './NavBar'
import { renderBackground, UserLocation } from './constants-types'

export const OurPage= () => {

    const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <div className='dark:bg-zinc-900 dark:text-gray-100'>
            <NavBar userLocation={UserLocation.LANDING} />
            <div className="pt-32 p-8 flex items-start justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url('${fetchBackground}')` }}
            >
                
            </div>
        </div>   
)
}