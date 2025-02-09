import {  UserLocation } from './constants-types'
import { NavBar } from './NavBar'


import ObserverProvider from '../ui/observerprovider';
import { OurPage } from './landing-page/OurPage'
import { WelcomePage } from './landing-page/WelcomePage'


export const LandingPage = (): JSX.Element => {

    // const fetchBackground = useMemo(() => renderBackground(), []);

    return (
        <ObserverProvider>
            <div className=' flex flex-col dark:bg-zinc-900 dark:text-gray-100'>
                <NavBar userLocation={UserLocation.LANDING} />
                <WelcomePage />
                <OurPage />
            </div>
        </ObserverProvider>
    )
}
