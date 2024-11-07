import React from 'react'
import Sidebar from '../Sidebar'
import Careermain from './Careermain'

const Career = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Career Master</h1>
                    </div>
                    {/* <div className="form">
                        <CourseMasterForm fetchdata={fetchdata} allcontent={allcontent} />
                    </div> */}
                    <div className="Gallery">
                        <Careermain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Career