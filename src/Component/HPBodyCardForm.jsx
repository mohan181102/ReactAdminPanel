import axios from 'axios'
import React, { useContext, useState } from 'react'
import Backend_Url from '../config/config'
import UpdateContex from './CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const HPBodyCardForm = () => {
    const [Title, setTitle] = useState(null)
    const [Heading, setHeading] = useState(null)
    const [Image, setImage] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Cardwidth, setCardwidth] = useState(null)
    const [Status, setStatus] = useState(null)
    const [URL, setURL] = useState(null)
    const [Details, setDetails] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { UpdateCardTitle, setCardTitle,
        UpdateCardHeading, setUpdateCardHeading,
        UpdateCardStatus, setUpdateCardStatus,
        UpdateCardPriority, setUpdateCardPriority,
        UpdateCardImage, setUpdateCardImage,
        UpdateCardId, setCardId,
        UpdateCardURL, setCardURL,
        UpdateCardWidth, setUpdateCardWidth,
        UpdateCardDetails, setUpdateCardDetails, } = useContext(UpdateContex)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const confirm = window.confirm("Are you sure you want to create a new Card?")
        if (!confirm) {
            return
        }

        try {
            const form = new FormData()
            form.append('Title', Title)
            form.append('Heading', Heading)
            form.append('Image', Image)
            form.append('Priority', Priority)
            form.append('CardWidth', Cardwidth)
            form.append('Status', Status)
            form.append('URL', URL)
            form.append('Details', Details)
            form.append('Priority', Priority)

            const result = await axios.post(`${Backend_Url}/HPBodyCard/create`, form, {
                headers: {
                    authorization: `Bearer ${cookie.token}`,
                },
            })
                .then((res) => res.status == 200 ? window.alert("Successfully Card created") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Error creating Card", err));
        } catch (error) {

        }
    }


    // UPDATE HANDLER
    const updatehandler = async (e) => {

        const confirm = window.confirm("Are you sure you want to update this card?");
        if (!confirm) {
            return
        }

        const data = {
            UpdateTitle: UpdateCardTitle,
            UpdateHeading: UpdateCardHeading,
            UpdateURL: UpdateCardURL,
            UpdateDetails: UpdateCardDetails,
            UpdateStatus: UpdateCardStatus,
            UpdatePriority: UpdateCardPriority,
            UpdateCardWidth: UpdateCardWidth,
            Image: UpdateCardImage
        }
        await axios.put(`${Backend_Url}/HPBodyCard/update/${UpdateCardId}`, data, {
            headers: {
                authorization: `Bearer ${cookie.token}`,
            },

        })
            .then((res) => res.status == 200 ? window.alert("Successfulluy update Card at id " + UpdateCardId) : null)
            .then(() => window.location.reload())
            .catch((err) => window.alert("Error updating Card", err));

    }


    // cancelupdate
    const cancelupdate = () => {
        setUpdateCardDetails(null)
        setCardTitle(null)
        setCardId(null)
        setUpdateCardWidth(null)
        setUpdateCardStatus(null)

        setUpdateCardPriority(null)
        setUpdateCardHeading(null)
        setUpdateCardImage(null)
        setCardURL(null)
    }




    return (
        <div className="container">
            <form className="upload-form form-update !bg-[#f8f8f8] !border !border-[#ccc]" onSubmit={(e) => handleSubmit(e)}>
                <div className='allinput-update flex-wrap'>
                    <div className="form-gruop-update">
                        <label htmlFor="name">Title</label>
                        <input
                            type="text"
                            placeholder={`Enter Title`}
                            id="name"
                            onChange={(e) => UpdateCardTitle != null ? setCardTitle(e.target.value) : setTitle(e.target.value)}
                            className='form-input-update'
                            defaultValue={UpdateCardTitle}
                            required
                        />
                    </div>
                    <div className="form-gruop-update">
                        <label htmlFor="name">Heading</label>
                        <input
                            type="text"
                            placeholder={`Enter Heading`}
                            id="name"
                            onChange={(e) => UpdateCardHeading != null ? setUpdateCardHeading(e.target.value) : setHeading(e.target.value)}
                            className='form-input-update'
                            defaultValue={UpdateCardHeading}
                            required
                        />
                    </div>

                    <div className="form-gruop-update ">
                        <label htmlFor="image">Image</label>
                        <div className=' '>
                            <input
                                type="file"
                                id="file"
                                accept="*/*"
                                className='form-input-update'
                                onChange={(e) => UpdateCardImage != null ? setUpdateCardImage(e.target.files[0].name) : setImage(e.target.files[0])}
                                multiple
                                required
                            />
                            {typeof UpdateCardImage != 'object' ? <p className={`update-file`}>{UpdateCardImage}</p> : null}
                        </div>
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            placeholder='Enter URL'
                            className='form-input-update'
                            id="url"
                            defaultValue={UpdateCardURL}
                            onChange={(e) => UpdateCardURL != null ? setCardURL(e.target.value) : setURL(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ height: 'auto' }} className="form-gruop-update">
                        <label htmlFor="detail">Details</label>
                        <textarea
                            type="text"
                            defaultValue={UpdateCardDetails}
                            id="url"
                            placeholder='Enter Details'
                            className='form-input-update !border  !border-[#ccc]'
                            onChange={(e) => UpdateCardDetails != null ? setUpdateCardDetails(e.target.value) : setDetails(e.target.value)}
                            style={{ maxWidth: "200px", minHeight: "40px" }}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image">Priority</label>
                        <input
                            type="number"
                            placeholder='Set Priority'
                            className='form-input-update'
                            id="url"
                            defaultValue={UpdateCardPriority}

                            onChange={(e) => UpdateCardPriority != null ? setUpdateCardPriority(e.target.value) : setPriority(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image">Card Width</label>
                        <select id='select' className={`form-input-update`} onChange={(e) => UpdateCardWidth != null ? setUpdateCardWidth(e.target.value) : setCardwidth(e.target.value)}>
                            <option>{UpdateCardWidth != null ? UpdateCardWidth : "--CardWidth--"}</option>
                            <option>Col-lg-2</option>
                            <option>Col-lg-3</option>
                            <option>Col-lg-4</option>
                            <option>Col-lg-6</option>
                        </select>
                    </div>

                    <div className="form-gruop-update">
                        <label htmlFor="image">Status</label>
                        <select id='select' className={`form-input-update`} onChange={(e) => e.target.value == "True" ? UpdateCardStatus != null ? setUpdateCardStatus(true) : setStatus(true) : UpdateCardStatus != null ? setUpdateCardStatus(false) : setStatus(false)}>
                            <option>{UpdateCardStatus != null ? UpdateCardStatus ? "True" : "False" : "--CardWidth"}</option>
                            <option>True</option>
                            <option>False</option>
                        </select>
                    </div>
                </div>
                <div className={`form-btn-update`}>
                    <button type={UpdateCardId != null ? "button" : "submit"} onClick={() => UpdateCardId != null ? updatehandler() : null} className="form-submit-btn-update">
                        {UpdateCardId != null ? "Update" : "Create"}
                    </button>
                    {/* CLEAR UPDATE */}
                    {
                        UpdateCardId != null ?
                            <button className="form-cancel-btn-update " onClick={() => cancelupdate()}>
                                CLEAR
                            </button> : null
                    }
                </div>
            </form>
        </div>
    )
}

export default HPBodyCardForm