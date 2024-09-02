import React from 'react'
import "./Event.css"
import Sidebar from './Sidebar'
import ImageUpload from './Imageupload'
import Maingallery from './MainGallery'
import Backend_Url from '../config/config'
import EventUploder from './EventUploder'
import MainEvent from './MainEvent'

const Event = () => {
    return (
        <div className="App">
            <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div>
            <div className="body-content absolute w-[77%] right-0">
                <div>
                    <div className="Header">
                        <h1 className="heading">Event</h1>
                    </div>
                    <div className="form">
                        <EventUploder />
                    </div>
                    <div className="Gallery">
                        {/* <Maingallery /> */}
                        <MainEvent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event