import React, { useContext, useState } from 'react'
import "./TestimonialsForm.css"
import Backend_Url from '../config/config';
import UpdateContex from './CreateContex/CreateContex';
import { useCookies } from 'react-cookie';


const TestimonialsForm = () => {
    const [Name, setName] = useState(null)
    const [Designation, setdesignation] = useState(null)
    const [Details, setDetails] = useState(null)
    const [Image, setImage] = useState(null)
    const [URL, setURL] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Status, setStatus] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { UpdateTDesignation, setDesignation,
        UpdateTImage, setTImage,
        UpdateTPriority, setTpriority,
        UpdateTStatus, setTstatus,
        UpdateTURL, setTurl,
        Tid, setTid,
        UpdateTName, SetTname, UpdateTDetails, SetUpdateTDetails } = useContext(UpdateContex)


    // HANDLESUBMIT
    const handlesubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('Name', Name)
        form.append('Status', Status)
        form.append('Designation', Designation)
        form.append('Priority', Priority)
        form.append('URL', URL)
        form.append('Image', Image)
        form.append('Details', Details)

        // USE FETCH FOR CREATE TESTIMONIAL
        const Testimonial = await fetch(`${Backend_Url}/Testimonial/create/`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + cookie.token
            },
            body: form
        })

        if (Testimonial.status == 200) {
            window.alert('Testimonial created successfully')
            window.location.reload()
        }

    }


    // CANCEL HANDLER
    const cancelHandler = () => {
        setDesignation(null)
        setTImage(null)
        setTpriority(null)
        setTid(null)
        setTstatus(null)
        setTurl(null)
        SetTname(null)
        SetUpdateTDetails(null)
    }


    // UPDATE HANDLER
    const UpdateHandler = async (e) => {
        e.preventDefault();
        debugger
        const confirm = window.confirm('Are you sure you want to Update this testimonial')

        if (!confirm) {
            return
        }

        const form = new FormData()
        form.append('Name', UpdateTName)
        form.append('Status', UpdateTStatus)
        form.append('Designation', UpdateTDesignation)
        form.append('Priority', UpdateTPriority)
        form.append('URL', UpdateTURL)
        form.append('Image', Image == null ? UpdateTImage : Image)
        form.append('Details', UpdateTDetails)

        console.log("form ", form)
        console.log("Tid ", Tid)

        await fetch(`${Backend_Url}/Testimonial/update/${Tid}`, {
            method: 'PUT',
            headers: {
                'authorization': 'Bearer ' + cookie.token
            },
            body: form
        }).then((res) => {
            window.alert("Success!")
            window.location.reload()
        }).catch((err) => window.alert("Error", err))


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
            <form className="upload-form !bg-[#f8f8f8] !shadow-none !border !border-[#ccc] form-update" onSubmit={(e) => handlesubmit(e)} >
                <div className={`allinput-update flex-wrap`}>
                    <div className="form-gruop-update">
                        <label htmlFor="name" className='form-label-update'>Name</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            defaultValue={UpdateTName}
                            onChange={(e) => UpdateTName != null ? SetTname(e.target.value) : setName(e.target.value)}
                            className='form-input-update'
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Image</label>
                        <div className='form-gruop'>
                            <input
                                type="file"
                                id="file"
                                placeholder='Select image'
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="*/*"
                                className='form-input-update !bg-[#f8f8f8]'
                                multiple
                                required
                            />
                            {UpdateTImage != null ? <p className={`update-file`}>{UpdateTImage}</p> : null}
                        </div>
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>URL</label>
                        <input
                            type="text"
                            id="url"
                            placeholder='Give url'
                            className='form-input-update'
                            onChange={(e) => UpdateTURL != null ? setTurl(e.target.value) : setURL(e.target.value)}
                            defaultValue={UpdateTURL}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="priority" className='form-label-update'>Priority</label>
                        <input
                            type="number"
                            id="priority"
                            placeholder='Set priority'
                            className='form-input-update !w-full'
                            onChange={(e) => UpdateTPriority != null ? setTpriority(e.target.value) : setPriority(e.target.value)}
                            defaultValue={UpdateTPriority}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Designation</label>
                        <input
                            type="text"
                            id="designation"
                            placeholder='Type designation'
                            className='form-input-update'
                            onChange={(e) => UpdateTDesignation != null ? setDesignation(e.target.value) : setdesignation(e.target.value)}
                            defaultValue={UpdateTDesignation}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Details</label>
                        <input
                            type="text"
                            id="details"
                            placeholder='Type details'
                            className='form-input-update'
                            onChange={(e) => UpdateTDetails != null ? SetUpdateTDetails(e.target.value) : setDetails(e.target.value)}
                            defaultValue={UpdateTDetails}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image" className='form-label-update'>Status</label>
                        <select id='select' className='form-input-update' onChange={(e) => e.target.value == "True" ? UpdateTStatus != null ? setTstatus(true) : setStatus(true) : UpdateTStatus != null ? setTstatus(false) : setStatus(false)}  >
                            <option>{`${UpdateTStatus != null ? UpdateTStatus : "--Select--"}`}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>

                <div className={`form-btn-update`}>
                    <button type={`${Tid != null ? "button" : "submit"}`} onClick={(e) => Tid != null ? UpdateHandler(e) : null} className="form-submit-btn-update">
                        {Tid != null ? "Update" : "Create"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        Tid != null ?
                            <button className="form-cancel-btn-update" onClick={() => cancelHandler()}>
                                CLEAR
                            </button> : null
                    }
                </div>
            </form>
        </div>

    )
}

export default TestimonialsForm