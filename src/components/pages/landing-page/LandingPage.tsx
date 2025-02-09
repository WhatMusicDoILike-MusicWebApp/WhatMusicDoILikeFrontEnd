import { UserLocation } from '../constants-types'
import { NavBar } from '../NavBar'


import ObserverProvider from '../../ui/observerprovider';
import { TeamMembers } from './TeamMembers'
import { WelcomeLanding } from './WelcomeLanding'


export const LandingPage = (): JSX.Element => {

    return (
        <ObserverProvider>
            <div className='flex flex-col dark:bg-zinc-900 dark:text-gray-100'>
                <NavBar userLocation={UserLocation.LANDING} />
                <WelcomeLanding />
                <div id="team-page">
                    <TeamMembers />
                </div>
            </div>
        </ObserverProvider>
    )
}
