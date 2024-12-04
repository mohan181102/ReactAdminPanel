import React, { useContext, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import "./HPContentMasterForm.css"
import JoditEditor from 'jodit-react';
import { useRef, useMemo, useState } from 'react';
import axios from 'axios';
import Backend_Url from '../../config/config';
import UpdateContex from '../CreateContex/CreateContex';
import { useCookies } from 'react-cookie';



const HPContentMasterForm = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [Title, setTitle] = useState(null);
    const [Status, setStatus] = useState(null);
    const [Priority, setPriority] = useState(null);
    const [BackColor, setBackcolor] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { UpdateCMTitle, setUpdateCMTitle,
        UpdateCMContent, setUpdateCMContent,
        UpdateCMStatus, setUpdateCMStatus,
        UpdateCMPriority, setUpdateCMPriority,
        UpdateCMId, setUpdateCMId,
        UpdateBgcolor, setBgcolor, } = useContext(UpdateContex)

    const handleSubmit = async (e) => {
        e.preventDefault()
        debugger
        const confirm = window.confirm('All details Checked?')
        if (!confirm) {
            return
        }
        console.log(Backend_Url)
        try {
            debugger
            const form = new FormData()
            form.append('title', Title)
            form.append('status', Status)
            form.append('priority', Priority)
            form.append('bgColor', BackColor)

            await axios.post(`${Backend_Url}/HPContentMaster/create`, {
                Title: Title,
                Status: Status,
                Priority: Priority,
                Color: BackColor,
                Content: content
            },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.status == 200 ? window.alert("Successfully created Content") : null)
                .then(() => window.location.reload())
                .catch((err) => {
                    console.log(err.message)
                    alert(err.response.data.message)
                });

        } catch (error) {
            console.log(error)
            window.alert(error.message);
        }
    }

    useEffect(() => { setContent(UpdateCMContent) }, [UpdateCMContent])

    const CancelUpdate = (e) => {
        setUpdateCMTitle(null)
        setUpdateCMContent(null)
        setUpdateCMStatus(null)
        setUpdateCMPriority(null)
        setUpdateCMId(null)
        setBgcolor(null)
    }


    // UPDATE
    const updateHandler = async () => {
        debugger
        const confirm = window.confirm('Are you sure you want to update this Content?')
        if (!confirm) return

        try {
            await axios.put(`${Backend_Url}/HPContentMaster/update/${UpdateCMId}`, {
                UpdateTitle: UpdateCMTitle,
                UpdateStatus: UpdateCMStatus,
                UpdatePriority: UpdateCMPriority,
                UpdateColor: UpdateBgcolor,
                UpdateContent: UpdateCMContent
            }, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            })
                .then((res) => res.status == 200 ? window.alert("Successfully updated Content") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Error updating Content", err));
        } catch {
            window.alert("!Error updating Content")
        }
    }




    return (
        <div className="container">
            <form className="form form-update" onSubmit={(e) => handleSubmit(e)} >

                {/* DESIGN ALL INPUT */}
                <div className={``}>
                    <div className={`allinput-update flex-wrap`}>
                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Title</label>
                            <input
                                type="text"

                                placeholder={`Enter Title`}
                                id="name"
                                defaultValue={UpdateCMTitle}
                                onChange={(e) => UpdateCMId != null ? setUpdateCMTitle(e.target.value) : setTitle(e.target.value)}
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>BgColor</label>
                            <input
                                type="color"
                                id="url"
                                value={UpdateBgcolor != null ? UpdateBgcolor : BackColor}
                                onChange={(e) => UpdateBgcolor != null ? setBgcolor(e.target.value) : setBackcolor(e.target.value)}
                                style={{ height: '40px' }}
                                className='form-input-update'
                                required
                            />
                            {
                                BackColor != null && UpdateBgcolor != null ? <p>{BackColor}</p> : null
                            }
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="priority" className='form-label-update'>Priority</label>
                            <input
                                type="number"
                                id="priority"
                                className={`form-input-update`}
                                defaultValue={UpdateCMPriority}
                                onChange={(e) => UpdateCMPriority != null ? setUpdateCMPriority(e.target.value) : setPriority(e.target.value)}
                                placeholder='Set priority'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Status</label>
                            <select id='select' className={`form-input-update`} onChange={(e) => e.target.value == "True" ? UpdateCMStatus != null ? setUpdateCMStatus(true) : setStatus(true) : UpdateCMStatus != null ? setUpdateCMStatus(false) : setStatus(false)} >
                                <option>{UpdateCMStatus != null ? UpdateCMStatus ? "True" : "False" : "--status--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                    </div>
                    <div className={`form-group conten-section`}>
                        <label className='form-label-update'>Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={(newContent) => UpdateCMContent != null ? setUpdateCMContent(newContent) : setContent(newContent)}
                            className='form-input-update'
                        />
                    </div>
                </div>


                <div className={`form-btn-update`}>
                    <button type={UpdateCMId != null ? "button" : "submit"} onClick={() => UpdateCMId != null ? updateHandler() : null} className="form-submit-btn-update !w-[200px]">
                        {UpdateCMId != null ? "Update" : "Create"}

                    </button>
                    {
                        UpdateCMId != null ?
                            <button type={"button"} className="form-cancel-btn-update !w-[200px] " onClick={(e) => { CancelUpdate(e) }}>
                                Cancel
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default HPContentMasterForm