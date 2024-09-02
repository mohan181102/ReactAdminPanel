import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const ClientForm = () => {
    const [Title, setTitle] = useState(null)
    const [URL, setURL] = useState(null)
    const [Details, setDetails] = useState(null)
    const [Image, setImage] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Status, setStatus] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateCTitle, setUpdateCTitle,
        UpdateCURL, setUpdateCURL,
        UpdateCDetails, setUpdateCDetails,
        UpdateCPriority, setUpdateCPriority,
        UpdateCId, setUpdateCID,
        UpdateCStatus, setUpdateCStatus,
        UpdateCImage, setUpdateCImage,
    } = useContext(UpdateContex)

    const handlesubmit = async function (e) {
        e.preventDefault();
        const form = new FormData()
        form.append('Title', Title)
        form.append('Image', Image)
        form.append('Priority', Priority)
        form.append('Status', Status)
        form.append('URL', URL)
        form.append('Details', Details)
        console.log(form)
        try {
            await fetch(`${Backend_Url}/client/create`, {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })
                .then((res) => res.status == 200 && window.alert('Client created successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            window.alert('Error creating client')
        }
    }

    // UPDATE HANDLER
    const UpdateHandler = async function () {
        const confirm = window.confirm('Are you sure you want to update this client?');
        if (!confirm) {
            return;
        }

        try {
            const form = new FormData()
            form.append('UpdaTitle', UpdateCTitle)
            form.append('UpdateImage', UpdateCImage)
            form.append('UpdatePriority', UpdateCPriority)
            form.append('UpdateURL', UpdateCURL)
            form.append('UpdateStatus', UpdateCStatus)
            form.append('UpdateDetails', UpdateCDetails)

            await fetch(`${Backend_Url}/client/update/${UpdateCId}`,
                {
                    method: 'PUT',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: form
                }
            )
                .then((res) => res.status == 200 && alert('Client updated successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('Client update failed')
        }
    }


    // CANCEL UPDATE
    const CancelUpdate = () => {
        setUpdateCTitle(null)
        setUpdateCURL(null)
        setUpdateCDetails(null)
        setUpdateCPriority(null)
        setUpdateCID(null)
        setUpdateCStatus(null)
        setUpdateCImage(null)
    }



    return (
        <div className="container">
            <form onSubmit={(e) => handlesubmit(e)} className="form-update flex-wrap !border rounded-md  !border-[#ccc]"   >

                {/* DESIGN ALL INPUT */}
                <div className={`allinput-update flex-wrap`}>

                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Title</label>
                        <input
                            type="text"

                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateCTitle}
                            onChange={(e) => UpdateCId != null ? setUpdateCTitle(e.target.value) : setTitle(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Details</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateCDetails}
                            onChange={(e) => UpdateCDetails != null ? setUpdateCDetails(e.target.value) : setDetails(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>URL</label>
                        <input
                            type="text"

                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateCURL}
                            onChange={(e) => UpdateCURL != null ? setUpdateCURL(e.target.value) : setURL(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Image</label>
                        <input
                            type="file"

                            placeholder={`Enter Title`}
                            id="name"
                            // defaultValue={UpdateCMTitle}
                            onChange={(e) => UpdateCId != null ? setUpdateCImage(e.target.files[0]) : setImage(e.target.files[0])}
                            className='form-input-update'
                            required
                        />
                    </div>



                    <div className="form-gruop-update">
                        <label htmlFor="priority" className='form-label-update !w-full'>Priority</label>
                        <input
                            type="number"
                            id="priority"
                            className={`form-input-update`}
                            defaultValue={UpdateCPriority}
                            onChange={(e) => UpdateCId != null ? setUpdateCPriority(e.target.value) : setPriority(e.target.value)}
                            placeholder='Set priority'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' onChange={(e) => e.target.value == "True" ? UpdateCId != null ? setUpdateCStatus(true) : setStatus(true) : UpdateCId != null ? setUpdateCStatus(false) : setStatus(false)} className={`form-input-update`}   >

                            <option>{UpdateCId != null ? UpdateCStatus ? 'True' : 'False' : '--select--'}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>

                </div>


                <div className={`form-btn-update w-[200px]`}>
                    <button type={UpdateCId != null ? "button" : "submit"} onClick={() => UpdateCId != null ? UpdateHandler() : null} className="form-submit-btn-update ">
                        {UpdateCId != null ? "UPDATE" : "CREATE"}
                    </button>
                    {
                        UpdateCId != null ?
                            <button type={"button"} className="form-cancel-btn-update" onClick={(e) => { CancelUpdate(e) }}>
                                No Change
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default ClientForm