import React from 'react'
import Sidebar from '../Sidebar'
import HPContentMasterForm from './HPContentMasterForm'
import HPContentMasterMain from './HPContentMasterMain'
import "./HPContentMaster.css"

const HPContentMaster = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Home Page Content Master</h1>
                    </div>
                    <div className="form">
                        <HPContentMasterForm />
                    </div>
                    <div className="Gallery">
                        <HPContentMasterMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HPContentMaster