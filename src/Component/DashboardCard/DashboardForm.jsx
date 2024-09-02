import React, { useContext, useState } from 'react'

import { hasFormSubmit } from '@testing-library/user-event/dist/utils'
import UpdateContex from '../CreateContex/CreateContex'
import Backend_Url from '../../config/config'

const DashboardForm = () => {
    const [Icon, setIcon] = useState(null)
    const [CardName, setCardName] = useState(null)
    const [CardColor, setCardColor] = useState(null)
    const [TableName, setTableName] = useState(null)
    const [TableCondition, setTableCondition] = useState(null)
    const [NewTab, setNewTab] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Status, setStatus] = useState(null)
    const [Pageurl, setPageurl] = useState(null)
    const {
        UpdateDCIcon, setUpdateDCIcon,
        UpdateDCCardName, setUpdateDCCardName,
        UpdateDCURL, setDCUrl,
        UpdateDCcolor, setDCcolor,
        UpdateDCTbname, setDCTBname,
        UpdateDCTabelcondition, setDCtableCondition,
        UpdateDCNewTab, setDCNewTab,
        UpdateDCPriority, setDCPriority,
        UpdateDCStatus, setDCStatus,
        UpdateDcId, setUpdateDCID,
    } = useContext(UpdateContex)

    // HANDLESUBMIT
    const handlesubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm('all details have been checked?')
        if (!confirm) return

        try {
            const data = {
                "Icon": Icon,
                "CardName": CardName,
                "Pageurl": Pageurl,
                "CardColor": CardColor,
                "TableName": TableName,
                "TableCondition": TableCondition,
                "NewTab": NewTab,
                "Priority": Priority,
                "Status": Status
            }
            await fetch(`${Backend_Url}/dashboardcard/create`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert('Dashboard card created successfully'))
                .then(() => window.location.reload())

        } catch (error) {
            console.log(error)
            alert('Dashboard card failed to create')
        }
    }

    // UPDATEHANDLER
    const UpdateHandler = async () => {
        const confirm = window.confirm('Are you sure you want to update this card?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/dashboardcard/update/${UpdateDcId}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "UpdateIcon": UpdateDCIcon,
                        "UpdateCardName": UpdateDCCardName,
                        "UpdatePageurl": UpdateDCURL,
                        "UpdateCardColor": UpdateDCcolor,
                        "UpdateTableName": UpdateDCTbname,
                        "UpdateTableCondition": UpdateDCTabelcondition,
                        "UpdateNewTab": UpdateDCNewTab,
                        "UpdatePriority": UpdateDCPriority,
                        "UpdateStatus": UpdateDCStatus
                    })
                }
            )
                .then((res) => res.status == 200 && alert('Update successfull'))
                .then(() => window.location.reload())

        } catch (error) {
            console.log(error)
            alert('Dashboard card failed to update')
        }
    }


    // CANCELHANDLER
    const CancelHandler = () => {
        setUpdateDCIcon(null)
        setUpdateDCCardName(null)
        setDCUrl(null)
        setDCcolor(null)
        setDCTBname(null)
        setDCtableCondition(null)
        setDCNewTab(null)
        setDCPriority(null)
        setDCStatus(null)
        setUpdateDCID(null)
    }


    return (
        <>
            {/* Icon, CardName, Pageurl, CardColor, TableName, TableCondition, NewTab, Priority, Status  */}
            <div className="container">
                <form className="upload-form" onSubmit={(e) => handlesubmit(e)}>
                    <div className={`w-full h-auto mb-[10px] flex-wrap flex items-center justify-start `}>
                        <div className="form-group">
                            <label htmlFor="name">Icon</label>
                            <select onChange={(e) => UpdateDcId != null ? setUpdateDCIcon(e.target.value) : setIcon(e.target.value)} >
                                <option>{UpdateDcId != null ? UpdateDCIcon : '--select--'}</option>
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
                            <label htmlFor="name">CardName</label>
                            <input
                                type="text"
                                placeholder={"Enter Card Name"}
                                id="name"
                                defaultValue={UpdateDCCardName}
                                className='titlename'
                                onChange={(e) => UpdateDcId != null ? setUpdateDCCardName(e.target.value) : setCardName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group form-cm">
                            <label htmlFor="name">CardColor</label>
                            <input
                                type="color"
                                placeholder={"select color"}
                                id="name"
                                defaultValue={UpdateDCcolor}
                                className=' !w-[90px] !h-[30px]'
                                onChange={(e) => UpdateDcId != null ? setDCcolor(e.target.value) : setCardColor(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group !w-[150px]">
                            <label htmlFor="name">PageUrl</label>
                            <input
                                type="text"
                                placeholder={"Enter URL"}
                                id="name"
                                defaultValue={UpdateDcId != null ? UpdateDCURL : "http://localhost:3001/"}
                                className='titlename'
                                onChange={(e) => UpdateDcId != null ? setDCUrl(e.target.value) : setPageurl(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">TableName</label>
                            <input
                                type="text"
                                placeholder={"Enter TableName"}
                                id="name"
                                defaultValue={UpdateDCTbname}
                                className='titlename'
                                onChange={(e) => UpdateDcId != null ? setDCTBname(e.target.value) : setTableName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label hor="name">TableCondition</label>
                            <input
                                type="text"
                                placeholder={"Enter Table Condition"}
                                id="name"
                                defaultValue={UpdateDCTabelcondition}
                                className='titlename'
                                onChange={(e) => UpdateDcId != null ? setDCtableCondition(e.target.value) : setTableCondition(e.target.value)}
                                required
                            />
                        </div>

                        {/* priority */}
                        <div className="form-group">
                            <label htmlFor="name">Priority</label>
                            <input
                                type="number"
                                placeholder={"Select Priority"}
                                id="name"
                                defaultValue={UpdateDCPriority}
                                className='titlename'
                                onChange={(e) => UpdateDcId != null ? setDCPriority(e.target.value) : setPriority(e.target.value)}
                                required
                            />
                        </div>



                        <div className="form-group">
                            <label htmlFor="image">New Tab</label>
                            <select id='select' onChange={(e) => UpdateDcId != null ? setDCNewTab(e.target.value) : setNewTab(e.target.value)} className={`select`} >
                                <option>{UpdateDcId != null ? UpdateDCNewTab : '--select--'}</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Status</label>
                            <select id='select' onChange={(e) => e.target.value == 'True' ? UpdateDcId != null ? setDCStatus(true) : setStatus(true) : UpdateDcId != null ? setDCStatus(false) : setStatus(false)} className={`select`} >
                                <option>{UpdateDcId != null ? UpdateDCStatus ? 'True' : 'False' : '--select--'}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                        <div className={`two-btn`}>
                            <button type={UpdateDcId != null ? "button" : "submit"} onClick={() => UpdateDcId != null ? UpdateHandler() : null} className="submit-button">
                                {UpdateDcId !== null ? 'UPDATE' : 'CREATE'}
                            </button>
                            {/* CLEAR UPDATE */}
                            {
                                UpdateDcId != null ?
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

export default DashboardForm