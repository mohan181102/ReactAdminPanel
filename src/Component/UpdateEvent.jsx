import React from 'react'
import { useState } from 'react';
import "./Update.css"
import axios from 'axios';
import Backend_Url from '../config/config';
import { useCookies } from 'react-cookie';

const UpdateEvent = ({ sliderId, show, onClose, onSubmit, imageName, EditId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [newTitle, setnewTitle] = useState(null);
    const [newPriority, setnewPriority] = useState(null);
    const [newStatus, setnewStatus] = useState(null);
    const [newImage, setnewImage] = useState(null);
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    if (!show) {
        return null;
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const update = await axios.put(`${Backend_Url}/Event/images/name`, {
            newEventTitle: newTitle,
            id: parseInt(EditId),
            newStatus: newStatus,
            newPriority: newPriority,
            Image: newImage
        },
            {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            })

        if (update) {
            window.location.reload()
        }
    };

    const setradiovalue = (e) => {
        const status = document.getElementsByName("status")

        var selectedValue;

        // Loop through each radio button
        for (var i = 0; i < status.length; i++) {
            // Check if the radio button is checked
            if (status[i].checked) {
                // If checked, set the selectedValue to the value of the checked radio button
                selectedValue = status[i];
                setnewStatus(selectedValue)
                console.log(newStatus)
                break;
            }
        }
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Update Event</h3>

                <form className="modal-form">
                    <div className="form-group">
                        <label htmlFor="event-id">Serial Number/Event ID</label>
                        <input
                            id="event-id"
                            type="text"
                            placeholder="Serial number/Event Id"
                            value={EditId}
                            required
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="event-title">New Event Title</label>
                        <input
                            id="event-title"
                            type="text"
                            placeholder="New Event Title"
                            value={newTitle}
                            onChange={(e) => setnewTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <p>Status</p>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    className="radio"
                                    onChange={() => setnewStatus(true)}
                                />
                                True
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    className="radio"
                                    onChange={() => setnewStatus(false)}
                                />
                                False
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">New Priority</label>
                        <input
                            id="priority"
                            type="number"
                            placeholder="New Priority"
                            value={newPriority}
                            onChange={(e) => setnewPriority(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file-upload">Upload File</label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" onClick={handleSubmit}>Update</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateEvent