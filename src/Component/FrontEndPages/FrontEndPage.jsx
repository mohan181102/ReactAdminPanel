import React from 'react'
import Sidebar from '../Sidebar'
import FrontEndPageForm from './FrontEndPageForm'
import FrontPageMain from './FrontPageMain'

const FrontEndPage = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Front End Page</h1>
                    </div>
                    <div className="form">
                        <FrontEndPageForm />
                    </div>
                    <div className="Gallery">
                        <FrontPageMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrontEndPage