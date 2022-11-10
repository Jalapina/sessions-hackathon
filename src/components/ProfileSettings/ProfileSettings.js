import React from 'react';
import "./ProfileSettings.css"


const ProfileSettings = () => {
    return (
        <div className='settingsContainer'>
            <div className='leftSide'>
                <h4>Change Password</h4>
                <h4>Change Email</h4>
                <h4>Change Username</h4>
                <h4>Add Link</h4>
            </div>
            <div className='rightSide'>
                <div className='changePicture'>
                    *Rob- add pciture edit code
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;