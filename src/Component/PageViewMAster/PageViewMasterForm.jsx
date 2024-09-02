import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const PageViewMasterForm = () => {
    const [Title, settitle] = useState(null)
    const [PageName, setPageName] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Status, setStatus] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdatePVMTitle, setUpdatePVMTitle,
        UpdatePVMPageName, setUpdatePVMPageName,
        UpdatePVMStatus, setUpdatePVMStatus,
        UpdatePVMId, setUpdatePVMId,
        UpdatePVMPriority, setUpdatePVMPriority,
    } = useContext(UpdateContex)


    const handlesubmit = async function (e) {
        e.preventDefault();
        const confirm = window.confirm('All details checked?')//Title, PageName, Priority, Status
        if (!confirm) {
            return
        }

        try {
            const data = {
                "Title": Title,
                "PageName": PageName,
                "Priority": Priority,
                "Status": Status,
            }

            await fetch(`${Backend_Url}/pageview/create`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data),
                }
            ).then((res) => res.status == 200 && window.location.reload())

        } catch (error) {
            console.log(error)
            window.alert('error while creating page')
        }
    }

    //UPDATE HANDLER
    const UpdateHandler = async function () {
        const confirm = window.confirm('Are you sure you want to update this page?')
        if (!confirm) return
        try {
            const data = {
                "UpdateTitle": UpdatePVMTitle,
                "UpdatePageName": UpdatePVMPageName,
                "UpdatePriority": UpdatePVMPriority,
                "UpdateStatus": UpdatePVMStatus,
            }

            await fetch(`${Backend_Url}/pageview/update/${UpdatePVMId}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert('Updated successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert(`Error while updating page`)
        }
    }


    const CancelUpdate = () => {
        setUpdatePVMTitle(null)
        setUpdatePVMPageName(null)
        setUpdatePVMStatus(null)
        setUpdatePVMId(null)
        setUpdatePVMPriority(null)
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
            <form className="upload-form form-update !bg-white border !border-[#ccc] !shadow-none" onSubmit={(e) => handlesubmit(e)}>

                {/* DESIGN ALL INPUT */}

                <div className={`allinput-update`}>
                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Title</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdatePVMTitle}
                            onChange={(e) => UpdatePVMId != null ? setUpdatePVMTitle(e.target.value) : settitle(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>


                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Page Name</label>
                        <input
                            type="text"
                            placeholder={`Enter PageName`}
                            id="name"
                            defaultValue={UpdatePVMPageName}
                            onChange={(e) => UpdatePVMId != null ? setUpdatePVMPageName(e.target.value) : setPageName(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>


                    <div className="form-gruop-update">
                        <label htmlFor="priority" className='form-label-update'>Priority</label>
                        <input
                            type="number"
                            id="priority"
                            className='form-input-update !w-full !border !border-[#ccc]'
                            defaultValue={UpdatePVMPriority}
                            onChange={(e) => UpdatePVMId != null ? setUpdatePVMPriority(e.target.value) : setPriority(e.target.value)}
                            placeholder='Set priority'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' onChange={(e) => e.target.value == "True" ? UpdatePVMId != null ? setUpdatePVMStatus(true) : setStatus(true) : UpdatePVMId != null ? setUpdatePVMStatus(false) : setStatus(false)} className='form-input-update'  >
                            <option>{UpdatePVMId != null ? UpdatePVMStatus ? 'True' : 'False' : '--select--'}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>

                </div>




                <div className={`form-btn-update`}>
                    <button type={UpdatePVMId != null ? 'button' : 'submit'} onClick={() => UpdatePVMId != null ? UpdateHandler() : null} className="form-submit-btn-update">
                        {UpdatePVMId != null ? 'Update' : 'Create'}
                    </button>
                    {
                        UpdatePVMId != null ?
                            <button type={"button"} className="form-cancel-btn-update " onClick={(e) => { CancelUpdate(e) }}>
                                Cancel
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default PageViewMasterForm