import axios from 'axios'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import UpdateContex from '../CreateContex/CreateContex'

const WalkonForm = ({ setalldata, fetchdata }) => {
    const [cookie] = useCookies(['token'])
    const [MainText, setMainText] = useState(null)
    const [SubMainText, setSubMainText] = useState(null)
    const { UpdateMainText, setUpdatemaintex,
        UpdateSubtext, setUpdatesubtext,
        UpdateId, setUpdateId } = useContext(UpdateContex)

    const handlesubmit = async (e) => {
        try {
            e.preventDefault()

            const data = {
                Text1: MainText,
                Text2: SubMainText
            }

            await axios.post(`${Backend_Url}/WalkOn/create`, data, {
                headers: {
                    'Authorization': 'Bearer ' + cookie.token
                }
            }).then((res) => {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Walkon Create Successfully!',
                        icon: "success",
                        text: 'Your request has been processed successfully.',
                        timer: '3000',
                        cancelButtonText: 'Okay'
                    })

                    fetchdata()
                }
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Walkon Create Failed!',
                icon: "error",
                text: 'Something went wrong',
                timer: '3000',
                cancelButtonText: 'Okay'
            })
        }
    }

    const handleUpdate = async () => {
        try {
            debugger
            await axios.put(`${Backend_Url}/walkon/update/${UpdateId}`, {
                Text1: UpdateMainText,
                Text2: UpdateSubtext
            }, {
                headers: {
                    'Authorization': 'Bearer ' + cookie.token
                }
            })

            Swal.fire({
                title: 'Walkon Update Success!',
                icon: 'success',
                text: 'update successfully',
                cancelButtonText: 'Cancel'
            })

            fetchdata()
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Walkon Update Failed!',
                icon: 'error',
                text: 'update failed !',
                cancelButtonText: 'Cancel'
            })
        }
    }

    const cancelHandler = () => {
        setUpdateId(null)
        setUpdatemaintex(null)
        setUpdatesubtext(null)

    }

    return (
        <>
            <div className="container">
                <form className="upload-form form-update !bg-[#f8f8f8] !shadow-none !border !border-[#ccc]" onSubmit={handlesubmit} >
                    <div className={`allinput-update flex-wrap`}>
                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>MainText</label>
                            <input
                                type="text"
                                placeholder='MainText'
                                id="name"
                                onChange={(e) => UpdateMainText != null ? setUpdatemaintex(e.target.value) : setMainText(e.target.value)}
                                className='form-input-update'
                                defaultValue={UpdateMainText}
                                required
                            />
                        </div>


                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Sub Text</label>
                            <input
                                type="text"
                                id="Fname"
                                onChange={(e) => UpdateSubtext != null ? setUpdatesubtext(e.target.value) : setSubMainText(e.target.value)}
                                placeholder='Sub Text'
                                className='form-input-update'
                                defaultValue={UpdateSubtext}
                                required
                            />
                        </div>


                    </div>

                    <div className={`form-btn-update`}>
                        <button type={UpdateId != null ? "button" : "submit"} onClick={() => UpdateId != null ? handleUpdate() : null} className="form-submit-btn-update">
                            {UpdateId != null ? "Update" : "Create"}
                        </button>
                        {/* CLEAR UPDATE */}
                        {
                            UpdateId != null ?
                                <button className="form-cancel-btn-update " onClick={() => cancelHandler()}>
                                    CLEAR
                                </button> : null
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default WalkonForm