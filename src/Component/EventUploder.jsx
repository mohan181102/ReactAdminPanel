import React, { useState } from 'react'
import "./EventUploder.css"
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import Backend_Url from '../config/config'
import Modal from './modal'
import UpdateEvent from './UpdateEvent'
import { useCookies } from 'react-cookie'

const EventUploder = ({ name = "EventTitle", endpoint = Backend_Url }) => {
    const [Name, setName] = useState("");
    const [imgdata, setImgdata] = useState(null);
    const [status, setstatus] = useState(false);
    const [Priority, setPriority] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const handleNameChange = (e) => {
        // console.log(e.target.value)
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        const files = Array.from(e.target.files)
        console.log(files)
        // setImgdata(e.target.files[0]);
        setImgdata(files);
    };


    async function handlesubmit(e) {
        e.preventDefault();
        console.log(imgdata)

        e.preventDefault();

        const formData = new FormData();
        formData.append("EventTitle", Name);
        // formData.append("Image", imgdata);  //single upload

        formData.append("Status", status)

        formData.append("Priority", Priority)

        imgdata.forEach((file, index) => {
            formData.append(`Image`, file); // Using the same key for multiple files
        });


        console.log(formData);

        try {
            const response = await axios.post(
                `${Backend_Url}/Event/create`, formData,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            );
            alert("Image uploaded successfully!");
            console.log(response.data);
            setName(" ");
            setImgdata(" ");
            document.getElementById('image').value = '';
            window.location.reload();
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
        }
    }

    /* form-update
form-cancel-btn-update 
form-submit-btn-update
form-btn-update
allinput-update
form-input-update
form-label-update
form-gruop-update
form-update 
*/
    return (
        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] !border !border-[#ccc] !shadow-none" onSubmit={(e) => handlesubmit(e)}>
                <div className='allinput-update'>
                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>{name}</label>
                        <input
                            type="text"
                            id="name"
                            className='form-input-update'
                            placeholder='Enter Event'
                            value={Name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Image</label>
                        <input
                            type="file"
                            id="image"
                            className='form-input-update'
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update '>Priority</label>
                        <input
                            className='form-input-update sm:!w-full !w-[150px]'
                            placeholder='Enter priority'
                            onChange={(e) => setPriority(e.target.value)}
                            type="number"
                            id="priority"
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' className='form-input-update' onChange={(e) => setstatus(e.target.value)}>
                            <option>-SELECT-</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>
                <div className='form-btn-update'>
                    <button type="submit" className="form-submit-btn-update">
                        CREATE
                    </button>
                </div>
            </form>


        </div>
    )
}

export default EventUploder