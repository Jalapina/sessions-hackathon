import React, {useState} from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import "./ProfileSettings.css"
import dummy from "./dummy.png"

const ProfileSettings = () => {
        const [image, setimage] = useState("");
        const [imagecrop, setimagecrop] = useState("");
    return (
        <div className='profile_img text-center p-4'>
        <div className='flex flex-column justify-content-center align-items-center'>
        
        <img className='imageStyling' 
            src={dummy} alt=""
        />
        <label htmlFor='' className='mt-3 font-semibold text-5x1'>Rob Matthews</label>
        
<Dialog
visible={imagecrop}
        header={() => (
            <p htmlFor='' className='text-2x1 font-semibold textColor'>
                Update Profile
            </p>
        )}
        onHide={() => setimagecrop(false)}
>
<p>hi</p>


</Dialog>
       
       
        <InputText
            type="file"
            accept="/image/*"
            onChange={(event)=>{
                const file = event.target.files[0];
                if (file && file.type.substring(0,5)==="image"){
                    setimage(file);
                } else {
                    setimage(null);
                }
            }}
        />

        </div>
        </div>
    );
};

export default ProfileSettings;