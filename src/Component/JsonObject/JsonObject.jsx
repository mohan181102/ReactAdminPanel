import React from 'react'
import Sidebar from '../Sidebar'
import JsonForm from './JsonForm'
import JsonMain from './JsonMain'

const JsonObject = () => {
    
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Json Object Upload</h1>
                    </div>
                    <div className="form">
                        <JsonForm />
                    </div>
                    <div className="Gallery">
                        <JsonMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JsonObject