import React from 'react';
import EditProfile from './Settings/editProfile';
import DisplaySettings from './Settings/DisplaySettings';
import UserNav from './Navbar/UserNav';

const Settings = () => {
    return (
        <>
           <UserNav className="lg:ml-[7em]"/>
     
        <div className='flex flex-row w-full'>
            <DisplaySettings />
            {/* <EditProfile /> */}
        </div>
        </>
    );
}

export default Settings;
