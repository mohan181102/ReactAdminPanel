import React, { useContext, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'
import axios from 'axios'


function FooterForm() {
    const [title, setTitle] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [status, setStatus] = useState(null)
    const [BgColor, setBGColor] = useState("")
    const [textContent, settextcontent] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateFooterID, setUpdateFooterID,
        UpdateFooterTitle, setUpdateFooterTitle,
        UpdateFooterTextcontent, setUpdateFooterTextcontent,
        UpdateFooterPriority, setUpdateFooterPriority,
        UpdateFooterBgcolor, setUpdateFooterBgcolor,
        UpdateFooterStatus, setUpdateFooterStatus,
    } = useContext(UpdateContex)
    const editor = useRef()

    const handlesubmit = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("All details check?")
        if (!confirm) return

        try {
            const data = {

            }

            await axios.post(`${Backend_Url}/footer/create`,
                {
                    Title: title,
                    Priority: Priority,
                    Bgcolor: BgColor,
                    Status: status,
                    TextContent: textContent
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token
                    }
                }
            )
                .then((res) => res.status == 200 && alert("Footer created successfully"))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert("error while deleting creating footer")
        }
    }

    const cancelHandler = () => {
        setUpdateFooterID(null)
        setUpdateFooterTitle(null)
        setUpdateFooterTextcontent(null)
        setUpdateFooterPriority(null)
        setUpdateFooterBgcolor(null)
        setUpdateFooterStatus(null)
        setUpdateFooterTextcontent(null)
    }


    const UpdateHandler = async function () {
        const confirm = window.confirm("are you sure you want to update?")
        if (!confirm) return

        try {
            const data = {
                UpdateTitle: UpdateFooterTitle,
                UpdatePriority: UpdateFooterPriority,
                UpdateBgcolor: UpdateFooterBgcolor,
                UpdateStatus: UpdateFooterStatus,
                UpdateTextContent: UpdateFooterTextcontent
            }
            await fetch(`${Backend_Url}/footer/update/${UpdateFooterID}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert("Updated coursemaster successfully"))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('Error while fetching')
        }
    }


    return (
        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] border border-[#ccc] " onSubmit={(e) => handlesubmit(e)} >
                <div className={`allinput-update sm:!flex-col sm:items-start `}>
                    <div className="  form-gruop-update">
                        <label htmlFor="name" className='form-label-update'> Title</label>
                        <input
                            type="text"
                            placeholder={"Enter Title"}
                            id="name"
                            defaultValue={UpdateFooterTitle}
                            className='form-input-update'
                            onChange={(e) => UpdateFooterID != null ? setUpdateFooterTitle(e.target.value) : setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="  form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Priority</label>
                        <input
                            type="number"
                            placeholder={"Enter priority"}
                            id="name"
                            defaultValue={UpdateFooterPriority}
                            className='form-input-update !w-full'
                            onChange={(e) => UpdateFooterID != null ? setUpdateFooterPriority(e.target.value) : setPriority(e.target.value)}
                            required
                        />
                    </div>
                    <div className="  form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>BgColor</label>
                        <input
                            type="color"
                            placeholder={"Enter priority"}
                            id="name"
                            value={UpdateFooterID != null ? UpdateFooterBgcolor : BgColor}
                            className='form-input-update !w-full'
                            onChange={(e) => UpdateFooterID != null ? setUpdateFooterBgcolor(e.target.value) : setBGColor(e.target.value)}
                            required
                        />
                    </div>

                    <div className="  form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' onChange={(e) => e.target.value == "True" ? UpdateFooterID != null ? setUpdateFooterStatus(true) : setStatus(true) : UpdateFooterID != null ? setUpdateFooterStatus(false) : setStatus(false)} className='form-input-update !w-full' >
                            <option>{UpdateFooterID != null ? UpdateFooterStatus ? "True" : "False" : "--select--"}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>

                </div>
                <div className={`w-full h-auto`}>
                    <JoditEditor
                        ref={editor}
                        value={UpdateFooterID != null ? UpdateFooterTextcontent : ""}
                        onBlur={(newContent) => UpdateFooterID != null ? setUpdateFooterTextcontent(newContent) : settextcontent(newContent)}

                    />
                </div>
                <div className={`form-btn-update`}>
                    <button type={UpdateFooterID != null ? "button" : "submit"} onClick={() => UpdateFooterID != null && UpdateHandler()} className="form-submit-btn-update">
                        {UpdateFooterID != null ? "UPDATE" : "CREATE"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        UpdateFooterID != null ?
                            <button className="form-cancel-btn-update " onClick={() => { cancelHandler() }}>
                                Cancel
                            </button> : null
                    }
                </div>
            </form >
        </div >
    )
}

export default FooterForm