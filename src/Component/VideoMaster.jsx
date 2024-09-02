import React from 'react'
import Sidebar from './Sidebar'
import VideoMasterForm from './VideoMasterForm'
import VideoMasterMain from './VideoMasterMain'

const VideoMaster = () => {
    return (
        <div className="App">
            <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div>
            <div className="body-content absolute w-[77%] right-0">
                <div>
                    <div className="Header">
                        <h1 className="heading">Video Master</h1>
                    </div>
                    <div className="form">
                        <VideoMasterForm />
                    </div>
                    <div className="Gallery">
                        <VideoMasterMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoMaster