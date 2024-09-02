import React, { useContext, useState } from 'react'
import "./ResultForm.css"
import Backend_Url from '../../config/config';
import UpdateContex from '../CreateContex/CreateContex';
import { useCookies } from 'react-cookie';

const ResultForm = () => {
    const [EventTitle, setEventTitle] = useState(null)
    const [URL, setURL] = useState(null)
    const [File, setFile] = useState(null)
    const [status, setStatus] = useState(null)
    const { UpdateRTitle, setUpdateRTitle,
        UpdateRURL, setUpdateRURL,
        UpdateRStatus, setUpdateRStatus,
        UpdateRFile, setUpdateRFile,
        UpdateRId, setUpdateRID } = useContext(UpdateContex)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])

    const handlesubmit = async function (e) {
        e.preventDefault();
        const confirm = window.confirm('Check all details?')
        if (!confirm) {
            return
        }


        const form = new FormData();
        form.append('EventTitle', EventTitle)
        form.append('URL', URL)
        form.append('Status', status)
        form.append('File', File)

        try {
            await fetch(`${Backend_Url}/Result/create`,
                {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: form,
                }
            )
                .then((res) => res.status == 200 ? window.alert("Successfully created") : window.alert("Can't create"))
                .then((res) => window.location.reload())
        } catch (error) {
            console.log(error)
        }

    }


    const cancelHandler = () => {
        setUpdateRTitle(null)
        setUpdateRURL(null)
        setUpdateRStatus(null)
        setUpdateRFile(null)
        setUpdateRID(null)
    }

    const deletehandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this?')

        if (!confirm) {
            return
        }

        await fetch(`${Backend_Url}/Result/delete`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            },
            body: JSON.stringify({
                ids: [id]
            })
        })
            .then((res) => res.status == 200 && window.alert("Delete successfully"))
            .then(() => window.location.reload())
    }

    const UpdateHandler = async () => {
        const confirm = window.confirm('Are you sure you want to update this Result?')
        if (!confirm) {
            return
        }

        const form = new FormData();
        form.append('UpdateEventTitle', UpdateRTitle)
        form.append('UpdateStatus', UpdateRStatus)
        form.append('UpdateURL', UpdateRURL)
        form.append('FileData', UpdateRFile)

        try {
            await fetch(`${Backend_Url}/Result/update/${UpdateRId}`, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })
                .then((res) => res.status == 200 ? window.alert('Update Successfully') : null)
                .then(() => window.location.reload())
                .catch((e) => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] !shadow-none border !border-[#ccc]" onSubmit={(e) => handlesubmit(e)}>
                <div className={`allinput-update`}>
                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Enter Title</label>
                        <input
                            type="text"
                            placeholder='Enter Title'
                            defaultValue={UpdateRTitle}
                            id="name"
                            className='form-input-update'
                            onChange={(e) => { UpdateRId != null ? setUpdateRTitle(e.target.value) : setEventTitle(e.target.value) }}
                            required
                        />
                    </div>


                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>URL</label>
                        <input
                            type="text"
                            id="Fname"
                            onChange={(e) => { UpdateRId != null ? setUpdateRURL(e.target.value) : setURL(e.target.value) }}
                            placeholder='Enter URL'
                            className='form-input-update'
                            defaultValue={UpdateRURL}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>
                            File
                        </label>
                        <input
                            type="file"
                            id="Mname"
                            placeholder='Select File'
                            className='form-input-update'
                            onChange={(e) => UpdateRId != null ? setUpdateRFile(e.target.files[0]) : setFile(e.target.files[0])}
                            required
                        />
                        {
                            UpdateRFile != null ? <p className={`w-auto`}>{UpdateRFile}</p> : null
                        }
                    </div>



                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' onChange={(e) => e.target.value == "True" ? UpdateRStatus != null ? setUpdateRStatus(true) : setStatus(true) : UpdateRStatus != null ? setUpdateRStatus(false) : setStatus(false)} className={`form-input-update`} >
                            <option>{UpdateRId != null ? UpdateRStatus == true ? "True" : "False" : "--Select--"}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>

                <div className={`form-btn-update`}>
                    <button type={UpdateRId != null ? "button" : "submit"} onClick={() => UpdateRId != null ? UpdateHandler() : null} className="form-submit-btn-update">
                        {UpdateRId != null ? 'UPDATE' : 'CREATE'}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        UpdateRId != null ?
                            <button className="form-cancel-btn-update " onClick={() => cancelHandler()}>
                                CLEAR
                            </button> : null
                    }
                </div>
            </form>
        </div>
    )
}

export default ResultForm