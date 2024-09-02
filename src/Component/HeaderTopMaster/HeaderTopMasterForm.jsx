import JoditEditor from 'jodit-react'
import React, { useContext, useRef, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'

const HeaderTopMasterForm = () => {
    const editor = useRef()
    const [Title, setTitle] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [BgColor, setBgcolor] = useState(null)
    const [Status, setStatus] = useState(null)
    const [TextContent, setTextContent] = useState(null)
    const {
        UpdateHTTitle, setUpdateHTTitle,
        UpdateHTPriority, setUpdateHTPRiority,
        UpdateHTColor, setUpdateHTColor,
        UpdateHTStatus, setUpdateHTStatus,
        UpdateHTTextarea, setUpdateHTTextArea,
        UpdateHTId, setUpdateHTId,
    } = useContext(UpdateContex);


    // HANDLESUBMIT
    const handlesubmit = async function (e) {
        e.preventDefault()
        try {
            const data = {
                "Title": Title,
                "Priority": Priority,
                "BgColor": BgColor,
                "Status": Status,
                "TextArea": TextContent
            }

            await fetch(`${Backend_Url}/headertopmaster/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status(200) ? window.alert('Create Successfully') : null)
                .then(() => window.location.reload())

        } catch (error) {
            console.log(error)
            window.alert('Hearder Top Master Creation Failed!')
        }
    }


    // UPDATE HANDLER
    const updatehandle = async () => {
        const confirm = window.confirm('Are you sure you want to update this Header Top?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/headertopmaster/update/${UpdateHTId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "UpdateTitle": UpdateHTTitle,
                        "UpdatePriority": UpdateHTId,
                        "UpdateBgColor": UpdateHTColor,
                        "UpdateStatus": UpdateHTStatus,
                        "UpdateTextArea": UpdateHTTextarea
                    })
                }
            )
                .then((res) => res.status == 200 && alert('Updated successfully!'), window.location.reload())

        } catch (error) {
            console.log(error)
            alert('Hearder Top Master Update Failed!')
        }
    }


    // CANCEL HANDLER
    const CancelHandler = () => {
        setUpdateHTTitle(null)
        setUpdateHTPRiority(null)
        setUpdateHTColor(null)
        setUpdateHTStatus(null)
        setUpdateHTTextArea(null)
        setUpdateHTId(null)
    }

    return (
        <div className="container">
            <form className="upload-form conten-master-form" onSubmit={(e) => handlesubmit(e)}>

                {/* DESIGN ALL INPUT */}
                <div className={`allinput-content-master`}>
                    <div className={`form-first-line`}>
                        <div className="form-group form-cm">
                            <label htmlFor="name">Title</label>
                            <input
                                type="text"

                                placeholder={`Enter Title`}
                                id="name"
                                defaultValue={UpdateHTTitle}
                                onChange={(e) => UpdateHTId != null ? setUpdateHTTitle(e.target.value) : setTitle(e.target.value)}
                                className='inputtext titlename !w-[200px] textinput'
                                required
                            />
                        </div>

                        <div className="form-group form-cm">
                            <label htmlFor="image">BgColor</label>
                            <input
                                type="color"
                                id="url"
                                value={UpdateHTId != null ? UpdateHTColor : ""}
                                onChange={(e) => UpdateHTId != null ? setUpdateHTColor(e.target.value) : setBgcolor(e.target.value)}
                                placeholder='color'
                                required
                            />

                        </div>

                        <div className="form-group form-cm">
                            <label htmlFor="priority">Priority</label>
                            <input
                                type="number"
                                id="priority"
                                className={`inputnumber !w-[120px]`}
                                defaultValue={UpdateHTPriority}
                                onChange={(e) => UpdateHTId != null ? setUpdateHTPRiority(e.target.value) : setPriority(e.target.value)}
                                placeholder='Set priority'
                                required
                            />
                        </div>

                        <div className="form-group form-cm">
                            <label htmlFor="image">Status</label>
                            <select id='select' className={`select select-cm`} onChange={(e) => e.target.value == "True" ? UpdateHTId != null ? setUpdateHTStatus(true) : setStatus(true) : UpdateHTId != null ? setUpdateHTStatus(false) : setStatus(false)} >
                                <option>{UpdateHTId != null ? UpdateHTStatus ? "True" : "False" : "--select--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                    </div>
                    <div className={`form-group conten-section`}>
                        <label className={`label`}>Content</label>
                        <JoditEditor
                            ref={editor}
                            value={UpdateHTId != null ? UpdateHTTextarea : ""}
                            tabIndex={1}
                            onBlur={(newContent) => UpdateHTStatus != null ? setUpdateHTTextArea(newContent) : setTextContent(newContent)}
                        />
                    </div>
                </div>


                <div className={`two-btn two-btn-content-master `}>
                    <button type={UpdateHTId != null ? "button" : "submit"} onClick={() => UpdateHTId != null ? updatehandle() : null} className="submit-button">
                        {UpdateHTId != null ? "UPDATE" : "CREATE"}
                    </button>
                    {
                        UpdateHTId != null ?
                            <button type={"button"} className="submit-button clear" onClick={(e) => { CancelHandler() }}>
                                Cancel
                            </button> : null
                    }

                </div>
            </form>
        </div>
    )
}

export default HeaderTopMasterForm