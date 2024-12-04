import JoditEditor from 'jodit-react'
import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import UpdateContex from '../CreateContex/CreateContex'

const CurrentOpForm = ({ fetchdata }) => {
    const [heading, setheading] = useState(null)
    const [location, setlocation] = useState(null)
    const [Experience, setExperience] = useState(null)
    const [Post, setPost] = useState(null)
    const [Salary, setSalary] = useState(null)
    const [Date, setDate] = useState(null)
    const [Key, Setkey] = useState(null)
    const [Description, setDescription] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { COHeading, setCOheading,
        COlocation, setCOlocation,
        COExpe, setCOExpe,
        COPost, setCOPost,
        COSalary, setCOSalary,
        CODate, setCODate,
        COKey, setKey,
        CODescription, setCODescription, COUpdateID, setCOUpdateID } = useContext(UpdateContex)

    // ---------------------------------CURRENT OPENINNG --------------------------------
    const createfunction = async function (e) {
        e.preventDefault()
        debugger
        try {
            const data = {
                Heading: heading,
                location: location,
                Expreriance: Experience,
                post: Post,
                Salary: Salary,
                Date: Date,
                key: Key,
                Description: Description
            }
            await axios.post(`${Backend_Url}/currentop/create`, data, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token,
                }

            }).then((res) => {
                if (res.status == 200) {
                    Swal.fire(
                        {
                            icon: "success",
                            title: "Current openinng create successfully!",
                            confirmButtonText: "OK",
                        }
                    )
                    fetchdata()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const Updatehandler = async () => {
        Swal.fire({
            title: 'Are you sure, you want to update?',
            text: "You are about to update this information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axios.put(`${Backend_Url}/currentop/${COUpdateID}`, {
                        Heading: COHeading,
                        location: COlocation,
                        Expreriance: COExpe,
                        post: COPost,
                        Salary: COSalary,
                        Date: CODate,
                        key: COKey,
                        Description: CODescription
                    }, {
                        headers: {
                            'authorization': 'Bearer ' + cookie.token
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Current opening update successfully',
                                timer: 3000
                            })
                        }
                        // window.location.reload()
                        fetchdata()
                    })
                } catch (error) {
                    console.log(error)
                }

                Swal.fire(
                    'Updated!',
                    'Your information has been updated.',
                    'success'
                );
            } else {

                Swal.fire(
                    'Cancelled',
                    'The update was cancelled.',
                    'info'
                );
            }
        });
    }

    const cancelHandler = () => {
        setCOheading(null)
        setCOlocation(null)
        setCOExpe(null)
        setCOPost(null)
        setCOSalary(null)
        setCODate(null)
        setKey(null)
        setCODescription(null)
        setCOUpdateID(null)
    }

    return (
        <div className="container">
            <form onSubmit={(e) => createfunction(e)} className="upload-form !bg-white form-update"   >
                <div className={` allinput-update flex-col`}>
                    <div className={`w-full flex-wrap gap-[14px] sm:flex-col sm:items-start h-auto mb-[10px] flex items-center justify-start`}>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Heading</label>
                            <input
                                type="text"
                                placeholder={"Enter Heading"}
                                id="name"
                                defaultValue={COHeading}
                                className='form-input-update'
                                onChange={(e) => COUpdateID != null ? setCOheading(e.target.value) : setheading(e.target.value)}
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Location</label>
                            <input
                                type="text"
                                placeholder={"Enter location"}
                                id="name"
                                onChange={(e) => COUpdateID != null ? setCOlocation(e.target.value) : setlocation(e.target.value)}
                                defaultValue={COlocation}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Experience</label>
                            <input
                                type="text"
                                placeholder={"Enter Experience"}
                                id="name"
                                onChange={(e) => COUpdateID != null ? setCOExpe(e.target.value) : setExperience(e.target.value)}
                                defaultValue={COExpe}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Post</label>
                            <input
                                type="number"
                                placeholder={"Enter Post"}
                                id="name"
                                onChange={(e) => COUpdateID != null ? setCOPost(e.target.value) : setPost(e.target.value)}
                                defaultValue={COPost}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Salary</label>
                            <input
                                type="text"
                                placeholder={"Enter Salary"}
                                id="name"
                                onChange={(e) => COSalary != null ? setCOSalary(e.target.value) : setSalary(e.target.value)}
                                defaultValue={COSalary}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Date</label>
                            <input
                                type="date"
                                placeholder={"Enter Date"}
                                id="name"
                                onChange={(e) => CODate != null ? setCODate(e.target.value) : setDate(e.target.value)}
                                defaultValue={CODate}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Key</label>
                            <input
                                type="text"
                                placeholder={"Enter Key"}
                                id="name"
                                onChange={(e) => COKey != null ? setKey(e.target.value) : Setkey(e.target.value)}
                                defaultValue={COKey}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="   form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Description</label>
                            <input
                                type="text"
                                placeholder={"Enter Description"}
                                id="name"
                                onChange={(e) => CODescription != null ? setCODescription(e.target.value) : setDescription(e.target.value)}
                                defaultValue={CODescription}
                                className='form-input-update'
                                // onChange={(e) => UpdateCMID != null ? setUpdateComTitle(e.target.value) : setTitle(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                </div>
                <div className={` form-btn-update`}>
                    <button onClick={() => COUpdateID != null ? Updatehandler() : null} type={COUpdateID != null ? "button" : "submit"} className="form-submit-btn-update">
                        {COUpdateID != null ? "UPDATE" : "CREATE"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        COUpdateID != null ?
                            <button className="form-cancel-btn-update" onClick={() => { cancelHandler() }}>
                                Cancel
                            </button> : null
                    }
                </div>
            </form>
        </div>
    )
}

export default CurrentOpForm