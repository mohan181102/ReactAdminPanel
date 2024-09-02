import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../config/config'
import UpdateContex from './CreateContex/CreateContex'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const VideoMasterForm = () => {
    const [Title, setTitle] = useState(null)
    const [URL, setURL] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Status, setStatus] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { UpdateVMTitle, setVMTitle, UpdateVMURL, UpdateVMId, setUpdateVMId, setVMUrl, UpdateVMStatus, setVMStatus, UpdateVMPriority, setUpdateVMPriority } = useContext(UpdateContex)

    useEffect(() => console.log(UpdateVMTitle), [UpdateVMTitle])
    const handleSubmit = async function (e) {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to create new Video")

        if (!confirm) {
            return
        }

        const data = {
            Title: Title,
            URL: URL,
            Priority: Priority,
            Status: Status
        };

        try {
            const response = await axios.post(`${Backend_Url}/VideoMaster/create`, data, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            });
            if (response.status === 200) {
                window.alert("Success!");
                window.location.reload();
            } else {
                window.alert("!Error");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const CancelUpdate = function () {
        setVMTitle(null)
        setUpdateVMId(null)
        setVMUrl(null)
        setVMStatus(null)
        setUpdateVMPriority(null)
    }

    const UpdateHandler = async function (e) {
        const confirm = window.confirm('Are you sure you want to update this Video?')

        if (!confirm) return

        try {
            const data = {
                UpdatePriority: UpdateVMPriority,
                UpdateStatus: UpdateVMStatus,
                UpdateTitle: UpdateVMTitle,
                UpdateURL: UpdateVMURL
            }

            const result = await axios.put(`${Backend_Url}/VideoMaster/update/${UpdateVMId}`, data,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
            if (result.status == 200) {
                window.alert("Video updated successfully!")
                window.location.reload()
            } else {
                window.alert("Error updating Video!")
            }
        } catch (error) {
            console.log("Something went wrong", error)
        }
    }



    return (
        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] !border !border-[#ccc] !shadow-none" onSubmit={(e) => handleSubmit(e)} >

                <div className='allinput-update'>
                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Title</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateVMTitle}
                            onChange={(e) => UpdateVMTitle != null ? setVMTitle(e.target.value) : setTitle(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>URL</label>
                        <input
                            type="text"
                            id="url"
                            defaultValue={UpdateVMURL}
                            className='form-input-update'
                            placeholder='Give url'
                            onChange={(e) => UpdateVMURL != null ? setVMUrl(e.target.value) : setURL(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="priority" className='form-label-update'>Priority</label>
                        <input
                            type="number"
                            id="priority"
                            defaultValue={UpdateVMPriority}
                            className='form-input-update'
                            placeholder='Set priority'
                            onChange={(e) => UpdateVMPriority != null ? setUpdateVMPriority(e.target.value) : setPriority(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' className={`form-input-update`} onChange={(e) => e.target.value == "True" ? UpdateVMStatus != null ? setVMStatus(true) : setStatus(true) : UpdateVMStatus != null ? setVMStatus(false) : setStatus(false)}    >
                            <option>{`${UpdateVMStatus != null ? UpdateVMStatus ? "True" : "False" : "--Select--"}`}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>


                <div className={`form-btn-update`}>
                    <button type={UpdateVMId != null ? "button" : "submit"} onClick={(e) => UpdateVMId != null ? UpdateHandler(e) : null} className="form-submit-btn-update">
                        {UpdateVMId != null ? "Update" : "Create"}
                    </button>
                    {
                        UpdateVMId != null ?
                            <button type={"button"} className="form-cancel-btn-update " onClick={(e) => { CancelUpdate(e) }}>
                                Cancel
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default VideoMasterForm