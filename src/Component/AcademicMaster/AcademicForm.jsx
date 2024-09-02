import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const AcademicForm = () => {
    const [EventTitle, setEventTitle] = useState(null)
    const [EventVideoURL, setEventVideoURL] = useState(null)
    const [File, setFile] = useState(null)
    const [Status, setStatus] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateAMId, setUpdateAMId,
        UpdateAMUpdateFile, setUpdateAMFile,
        UpdateAMTitle, setUpdateAMTitle,
        UpdateAMVideoURL, setUpdateAMVideoURL,
        UpdateAMVideoStatus, setUpdateAMVideoStatus,
    } = useContext(UpdateContex)

    // CREATE
    const handlesubmit = async function (e) {
        e.preventDefault()
        const confirm = window.confirm('All details checked')
        if (!confirm) return

        try {
            const form = new FormData();
            form.append('EventTitle', EventTitle)
            form.append('EventVideoURL', EventVideoURL)
            form.append('Status', Status)
            form.append('File', File)
            console.log(File)
            await fetch(`${Backend_Url}/academicmaster/create`,
                {
                    method: 'POST',
                    body: form,
                    headers: {
                        // 'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },

                }
            )
                .then((res) => res.status == 200 && window.alert('Successfully created'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            return alert('error while creating academic')
        }

    }

    const updateHandler = async () => {
        const confirm = window.confirm('Are you sure you want to update this Academic?')
        if (!confirm) return

        try {
            const form = new FormData()
            form.append('UpdateEventTitle', UpdateAMTitle)
            form.append('UpdateEventVideoURL', UpdateAMVideoURL)
            form.append('UpdateStatus', UpdateAMVideoStatus)
            form.append('UpdateFile', UpdateAMUpdateFile)
            console.log(form)
            await fetch(`${Backend_Url}/academicmaster/update/${UpdateAMId}`,
                {
                    method: 'PUT',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: form
                }
            )
                .then((res) => res.status == 200 && window.alert('Academic M Updated Successfully'))
                .then(() => window.location.reload())

        } catch (error) {
            console.log(error)
            return alert('error while updating academic')
        }
    }

    const CancelUpdate = () => {
        setUpdateAMId(null)
        setUpdateAMFile(null)
        setUpdateAMTitle(null)
        setUpdateAMVideoURL(null)
        setUpdateAMVideoStatus(null)
    }

    return (
        <div className="container  ">
            <form className="upload-form !justify-end !p-[7px] !bg-[#f8f8f8] border !border-[#eee]" onSubmit={(e) => handlesubmit(e)}>

                {/* DESIGN ALL INPUT */}
                <div className={`w-full sm:flex-wrap h-auto flex items-center justify-start`}>

                    <div className="form-group sm:min-w-full min-w-[150px] max-w-auto  flex flex-col p-[5px] !items-start justify-center">
                        <label htmlFor="name" className={`text-[12px] font-bold `}>Event Title</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateAMTitle}
                            onChange={(e) => UpdateAMId != null ? setUpdateAMTitle(e.target.value) : setEventTitle(e.target.value)}
                            className={`!h-[40px] sm:!w-full !w-[200px]`}
                            required
                        />
                    </div>

                    <div className="form-group sm:min-w-full min-w-[150px] max-w-auto  flex flex-col p-[5px] !items-start justify-center">
                        <label htmlFor="name" className={`text-[12px] font-bold `}>Event Video URL</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateAMVideoURL}
                            onChange={(e) => UpdateAMId != null ? setUpdateAMVideoURL(e.target.value) : setEventVideoURL(e.target.value)}
                            className={`!h-[40px] sm:!w-full !w-[200px]`}
                            required
                        />
                    </div>


                    <div className="form-group sm:min-w-full min-w-[150px] max-w-auto  flex flex-col p-[5px] !items-start justify-center">
                        <label htmlFor="name" className={`text-[12px] font-bold `}>File</label>
                        <input
                            type="file"
                            placeholder={`Enter file`}
                            id="name"
                            // defaultValue={UpdateCMTitle}
                            onChange={(e) => UpdateAMId != null ? setUpdateAMFile(e.target.files[0]) : setFile(e.target.files[0])}
                            className={`!h-[40px] sm:!w-full !w-[200px]`}
                            required
                        />
                    </div>


                    <div className="form-group min-w-[150px] sm:!w-full max-w-auto  flex flex-col p-[5px] !items-start justify-center">
                        <label htmlFor="image" className={`text-[12px] font-bold `}>Status</label>
                        <select id='select' onChange={(e) => e.target.value == "True" ? UpdateAMId != null ? setUpdateAMVideoStatus(true) : setStatus(true) : UpdateAMId != null ? setUpdateAMVideoStatus(false) : setStatus(false)} className={`select select-cm sm:!w-full`}>

                            <option>{UpdateAMId != null ? UpdateAMVideoStatus ? 'True' : 'False' : '--select--'}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>

                </div>


                <div className={` flex flex-col items-end justify-center gap-2`}>
                    <button type={UpdateAMId != null ? 'button' : 'submit'} onClick={() => UpdateAMId != null && updateHandler()} className=" w-auto h-auto p-[5px] text-white rounded-md bg-[#286090]">
                        {UpdateAMId != null ? 'Update' : 'Create'}
                    </button>
                    {
                        UpdateAMId != null ?
                            <button type={"button"} className="w-auto h-auto p-[5px] text-white rounded-md bg-[#bbbbbb]" onClick={(e) => CancelUpdate()}>
                                No Change
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default AcademicForm