import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'

const FrontEndPageForm = () => {
    const [Icon, setIcon] = useState(null)
    const [PageName, setPageName] = useState(null)
    const [PageURL, setPageURL] = useState("http://localhost:3001/")
    const [NewTab, setNewTab] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [status, setStatus] = useState(null)
    const {
        UpdateIcon, setUpdateIcon,
        UpdatePageName, setUpdatePageName,
        UpdatePageUrl, setUpdatePageUrl,
        UpdateNewTab, setUpdateNewTab,
        UpdatePriority, setUpdatePriority,
        UpdateFStatus, setUpdateFStatus,
        UpdateFId, setUpdateFId,
    } = useContext(UpdateContex)

    // handlesubmit
    const handlesubmit = async function (e) {
        e.preventDefault()
        const confirm = window.confirm('All details checked?')

        if (!confirm) return

        try {
            const data = {
                "Font": Icon,
                "PageName": PageName,
                "PageURL": PageURL,
                "NewTab": NewTab,
                "Priority": Priority,
                "Status": status
            }

            console.log(data)
            await fetch(`${Backend_Url}/frontendpage/create`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert('Frontend created successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('failed to create frontend')
        }
    }

    // UPDATE HANDLER
    const updatehandler = async function () {
        const confirm = window.confirm('Are you sure you want to update this Front End Page?')
        if (!confirm) return

        try {
            const data = {
                "UpdateFont": UpdateIcon,
                "UpdatePageName": UpdatePageName,
                "UpdatePageURL": UpdatePageUrl,
                "UpdateNewTab": UpdateNewTab,
                "UpdatePriority": UpdatePriority,
                "UpdateStatus": UpdateFStatus
            }

            await fetch(`${Backend_Url}/frontendpage/update/${UpdateFId}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 ? alert('Update Successfully!') : null)
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert('Failed to update this Front End Page')
        }
    }

    // CANCEL HANDLER
    const CancelHandler = async function () {
        setUpdateIcon(null)
        setUpdatePageName(null)
        setUpdatePageUrl(null)
        setUpdateNewTab(null)
        setUpdatePriority(null)
        setUpdateFStatus(null)
        setUpdateFId(null)
    }

    return (
        <>
            <div className="container">
                <form className="upload-form" onSubmit={(e) => handlesubmit(e)}>
                    <div className={`w-full h-auto mb-[10px] flex-wrap flex items-center justify-start `}>
                        <div className="form-group">
                            <label htmlFor="name">Icon</label>
                            <select onChange={(e) => UpdateFId != null ? setUpdateIcon(e.target.value) : setIcon(e.target.value)} >
                                <option>{UpdateFId != null ? UpdateIcon : '--select--'}</option>
                                <option value="ic:baseline-home">Home</option>
                                <option value="ic:baseline-user">User</option>
                                <option value="ic:baseline-settings">Settings</option>
                                <option value="ic:baseline-search">Search</option>
                                <option value="ic:baseline-notifications">Notifications</option>
                                <option value="ic:baseline-favorite">Favorite</option>
                                <option value="ic:baseline-star">Star</option>
                                <option value="ic:baseline-camera">Camera</option>
                                <option value="ic:baseline-email">Email</option>
                                <option value="ic:baseline-phone">Phone</option>
                                <option value="ic:baseline-calendar-today">Calendar</option>
                                <option value="ic:baseline-map">Map</option>
                                <option value="ic:baseline-delete">Delete</option>
                                <option value="ic:baseline-lock">Lock</option>
                                <option value="ic:baseline-key">Key</option>
                                <option value="ic:baseline-shopping-cart">Shopping Cart</option>
                                <option value="ic:baseline-cloud">Cloud</option>
                                <option value="ic:baseline-file-upload">Upload</option>
                                <option value="ic:baseline-file-download">Download</option>
                                <option value="ic:baseline-wifi">WiFi</option>
                                <option value="ic:baseline-battery-full">Battery</option>
                                <option value="ic:baseline-volume-up">Volume Up</option>
                                <option value="ic:baseline-volume-off">Volume Off</option>
                                <option value="ic:baseline-music-note">Music</option>
                                <option value="ic:baseline-movie">Movie</option>
                                <option value="ic:baseline-briefcase">Briefcase</option>
                                <option value="ic:baseline-public">Public</option>
                                <option value="ic:baseline-flag">Flag</option>
                                <option value="ic:baseline-info">Info</option>
                                <option value="ic:baseline-help">Help</option>
                                <option value="ic:baseline-help-outline">Help Outline</option>
                                <option value="ic:baseline-add">Add</option>
                                <option value="ic:baseline-remove">Remove</option>
                                <option value="ic:baseline-check">Check</option>
                                <option value="ic:baseline-close">Close</option>
                                <option value="ic:baseline-refresh">Refresh</option>
                                <option value="ic:baseline-print">Print</option>
                                <option value="ic:baseline-keyboard">Keyboard</option>
                                <option value="ic:baseline-lock-open">Lock Open</option>
                                <option value="ic:baseline-notifications-off">Notifications Off</option>
                                <option value="ic:baseline-location-pin">Location Pin</option>
                                <option value="ic:baseline-share">Share</option>
                                <option value="ic:baseline-link">Link</option>
                                <option value="ic:baseline-emoji-emotions">Emoji Smile</option>
                                <option value="ic:baseline-emoji-events">Emoji Sad</option>
                                <option value="ic:baseline-gift">Gift</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageName</label>
                            <input
                                type="text"
                                placeholder={"Enter Page Name"}
                                id="name"
                                defaultValue={UpdatePageName}
                                className='titlename'
                                onChange={(e) => UpdatePageName != null ? setUpdatePageName(e.target.value) : setPageName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageURL</label>
                            <input
                                type="text"
                                placeholder={"Enter Page URL"}
                                id="name"
                                defaultValue={UpdateFId != null ? UpdatePageUrl : "http://localhost:3001/"}
                                className='titlename min-w-[220px]'
                                onChange={(e) => UpdateFId != null ? setUpdatePageUrl((prev) => prev = prev + e.target.value) : setPageURL((prev) => prev = prev + e.target.value)}
                                required
                            />
                        </div>

                        {/* new tab */}
                        <div className="form-group">
                            <label htmlFor="name">New Tab</label>
                            <select onChange={(e) => UpdateFId != null ? setUpdateNewTab(e.target.value) : setNewTab(e.target.value)}>
                                <option>{UpdateFId != null ? UpdateNewTab == "Yes" ? "Yes" : "No" : "--select--"}</option>
                                <option>No</option>
                                <option>Yes</option>
                            </select>
                        </div>

                        {/* priority */}
                        <div className="form-group">
                            <label htmlFor="name">Priority</label>
                            <input
                                type="number"
                                placeholder={"Enter Priority"}
                                defaultValue={UpdatePriority}
                                id="name"
                                className='titlename'
                                onChange={(e) => UpdatePriority != null ? setUpdatePriority(e.target.value) : setPriority(e.target.value)}
                                required
                            />
                        </div>

                        {/* status */}
                        <div className="form-group">
                            <label htmlFor="name">Status</label>
                            <select onChange={(e) => e.target.value == "True" ? UpdateFId != null ? setUpdateFStatus(true) : setStatus(true) : UpdateFId != null ? setUpdateFStatus(false) : setStatus(false)}>
                                <option>{UpdateFStatus != null ? UpdateFStatus ? "True" : "False" : "--select--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>
                        <div className={`two-btn`}>
                            <button type={UpdateFId != null ? "button" : "submit"} onClick={() => UpdateFId != null ? updatehandler() : null} className="submit-button">
                                {UpdateFId != null ? "UPDATE" : "CREATE"}
                            </button>
                            {/* CLEAR UPDATE */}
                            {
                                UpdateFId != null ?
                                    <button className="submit-button clear" onClick={() => { CancelHandler() }}>
                                        Cancel
                                    </button> : null
                            }
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default FrontEndPageForm