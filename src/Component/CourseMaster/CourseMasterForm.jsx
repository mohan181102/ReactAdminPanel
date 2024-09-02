import JoditEditor from 'jodit-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const CourseMasterForm = ({ fetchdata }) => {
    const [title, setTitle] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [status, setStatus] = useState(null)
    const [BgColor, setBGColor] = useState("")
    const [textContent, settextcontent] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateCMID, setUpdateCMID,
        UpdateCoMTitle, setUpdateComTitle,
        UpdateComTextcontent, setUpdateComTextcontent,
        UpdateComPriority, setUpdateComPriority,
        UpdateComBgcolor, setUpdateComBgcolor,
        UpdateComStatus, setUpdateComStatus,
    } = useContext(UpdateContex)
    const editor = useRef()



    const handlesubmit = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("all details check?")
        if (!confirm) return

        try {
            const data = {
                "Title": title,
                "Priority": Priority,
                "Bgcolor": BgColor,
                "Status": status,
                "TextContent": textContent
            }

            await fetch(`${Backend_Url}/coursemaster/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert("Course created successfully"))
                .then(() => fetchdata())
        } catch (error) {
            console.log(error)
            alert("error while deleting creating course")
        }
    }

    const cancelHandler = () => {
        setUpdateCMID(null)
        setUpdateComTitle(null)
        setUpdateComTextcontent(null)
        setUpdateComPriority(null)
        setUpdateComBgcolor(null)
        setUpdateComStatus(null)
        setUpdateComTextcontent(null)
    }


    const UpdateHandler = async function () {
        const confirm = window.confirm("are you sure you want to update?")
        if (!confirm) return

        try {
            const data = {
                UpdateTitle: UpdateCoMTitle,
                UpdatePriority: UpdateComPriority,
                UpdateBgcolor: UpdateComBgcolor,
                UpdateStatus: UpdateComStatus,
                UpdateTextContent: UpdateComTextcontent
            }
            await fetch(`${Backend_Url}/coursemaster/update/${UpdateCMID}`,
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
                .then(() => fetchdata())
        } catch (error) {
            console.log(error)
            window.alert('Error while fetching')
        }
    }



    return (
        <div className="container">
            <form className="upload-form !bg-white form-update" onSubmit={(e) => handlesubmit(e)} >
                <div className={` allinput-update flex-col`}>
                    <div className={`w-full h-auto mb-[10px] flex items-center justify-start`}>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'> Title</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                defaultValue={UpdateCoMTitle}
                                className='form-input-update'
                                onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-gruop-update ">
                            <label htmlFor="name" className='form-label-update'>Priority</label>
                            <input
                                type="number"
                                placeholder={"Enter priority"}
                                id="name"
                                defaultValue={UpdateComPriority}
                                className='form-input-update !border !border-[#ccc] !w-full'
                                onChange={(e) => UpdateCMID != null ? setUpdateComPriority(e.target.value) : setPriority(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>BgColor</label>
                            <input
                                type="color"
                                placeholder={"Enter priority"}
                                id="name"
                                value={UpdateCMID != null ? UpdateComBgcolor : BgColor}
                                className='form-input-update'
                                onChange={(e) => UpdateCMID != null ? setUpdateComBgcolor(e.target.value) : setBGColor(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Status</label>
                            <select id='select' onChange={(e) => e.target.value == "True" ? UpdateCMID != null ? setUpdateComStatus(true) : setStatus(true) : UpdateCMID != null ? setUpdateComStatus(false) : setStatus(false)} className='form-input-update' >
                                <option>{UpdateCMID != null ? UpdateComStatus ? "True" : "False" : "--select--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                    </div>
                    <div className={`w-full h-auto`}>
                        <JoditEditor
                            ref={editor}
                            value={UpdateCMID != null ? UpdateComTextcontent : ""}
                            onBlur={(newContent) => UpdateCMID != null ? setUpdateComTextcontent(newContent) : settextcontent(newContent)}

                        />
                    </div>
                </div>
                <div className={` form-btn-update`}>
                    <button type={UpdateCMID != null ? "button" : "submit"} onClick={() => UpdateCMID != null && UpdateHandler()} className="form-submit-btn-update">
                        {UpdateCMID != null ? "UPDATE" : "CREATE"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        UpdateCMID != null ?
                            <button className="form-cancel-btn-update" onClick={() => { cancelHandler() }}>
                                Cancel
                            </button> : null
                    }
                </div>
            </form>
        </div>
    )
}

export default CourseMasterForm