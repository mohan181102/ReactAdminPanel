import React from 'react'
import Backend_Url from '../config/config'
import UpdateContex from './CreateContex/CreateContex'
import UpdateProvider from './CreateContex/ContexProvider'
import { useContext } from 'react'
import "./DownloadFormCSS.css"
import { useCookies } from 'react-cookie'

const DownloadForm = () => {
    const [name, setName] = React.useState(null)
    const [File, setFile] = React.useState(null)
    const [Status, setStatus] = React.useState(null)
    const [URL, setURL] = React.useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { UpdataTitle, UpdateFile, UpdateStatus, UpdateID, UpdateURL, setUpdateTitle, setUpdateFile, setUpdateStatus, setUpdateID, setUpdateURL } = useContext(UpdateContex)

    const handlesubmit = async function (e) {
        try {

            const formData = new FormData()
            formData.append("Title", name)
            formData.append("URL", URL)
            formData.append("Status", Status)
            formData.append("file", File)

            e.preventDefault()
            console.log(File)
            const CreateEvent = await fetch(`${Backend_Url}/Download/create/`, {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: formData,
            }).then((res) => res.json()).catch((err) => console.log("Something went wrong", err))

            if (CreateEvent) {
                window.alert("Download created successfully")
                window.location.reload()
            } else {
                window.alert("Failed to create Download");
            }
        } catch (error) {
            console.log(error)
        }
    }


    // UPDATE DOWNLOAD
    const handleUpdate = async function (ID) {
        try {
            const confirmed = window.confirm('Are you sure you want to update')
            if (!confirmed) {
                return
            }

            const form = new FormData()
            form.append("Title", UpdataTitle)
            form.append("URL", UpdateURL)
            form.append("Status", UpdateStatus)
            form.append("file", File != null ? File : UpdateFile)
            console.log("update ", File)
            const update = await fetch(`${Backend_Url}/Download/update/${ID}`, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })

            if (update.status == 200) {
                window.alert("Download updated successfully")
                window.location.reload()
            } else {
                window.alert("Failed to update Download");
            }
        } catch (error) {
            console.log("Something went wrong", error)
        }
    }

    const cancelHandler = async function () {
        setUpdateTitle(null)
        setUpdateID(null)
        setUpdateStatus(null)
        setUpdateURL(null)
        setUpdateFile(null)
    }


    return (


        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] shadow-none !border !border-[#ccc]" onSubmit={(e) => handlesubmit(e)}>
                <div className='allinput-update'>
                    <div className="  form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Download Title</label>
                        <input
                            type="text"
                            placeholder={`${UpdataTitle != null ? UpdataTitle : "Enter Title"}`}
                            id="name"
                            defaultValue={UpdataTitle}
                            className='form-input-update'
                            onChange={(e) => UpdataTitle != null ? setUpdateTitle(e.target.value) : setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="  form-gruop-update ">
                        <label htmlFor="image" className='form-label-update'>File</label>
                        <div className=' '>
                            <input
                                type="file"
                                id="file"
                                className='form-input-update'
                                onChange={(e) => setFile(e.target.files[0])}
                                accept="*/*"
                                multiple
                                required
                            />
                            {UpdateFile != null ? <p className={`update-file`}>{UpdateFile}</p> : null}
                        </div>
                    </div>

                    <div className="  form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>URL</label>
                        <input
                            type="text"
                            id="url"
                            onChange={(e) => UpdateURL != null ? setUpdateURL(e.target.value) : setURL(e.target.value)}
                            defaultValue={UpdateURL}
                            className='form-input-update'
                            placeholder='Enter URL'
                            required
                        />
                    </div>

                    <div className="  form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' className={`form-input-update`} onChange={(e) => e.target.value == "True" ? UpdateStatus != null ? setUpdateStatus(true) : setStatus(true) : UpdateStatus != null ? setUpdateStatus(false) : setStatus(false)} >
                            <option>{UpdateStatus != null ? UpdateStatus ? "True" : "False" : "--select--"}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>
                <div className={`form-btn-update`}>
                    <button type={`${UpdateID != null ? "button" : "submit"}`} onClick={() => UpdateID != null ? handleUpdate(UpdateID) : null} className="form-submit-btn-update">
                        {UpdateID != null ? "EDIT" : "CREATE"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        UpdateID != null ?
                            <button className="form-cancel-btn-update " onClick={() => cancelHandler()}>
                                CLEAR
                            </button> : null
                    }
                </div>
            </form>
        </div>

    )
}

export default DownloadForm