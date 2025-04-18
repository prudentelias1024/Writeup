import React from 'react';
import EditProfile from './Settings/editProfile';
import DisplaySettings from './Settings/DisplaySettings';
import UserNav from './Navbar/UserNav';

const Settings = () => {
    return (
        <div  className="lg:ml-[7em]">
           <UserNav/>
     
        <div className='flex flex-row w-full'>
            <DisplaySettings />
            {/* <EditProfile /> */}
        </div>
        </div>
    );
}

export default Settings;
