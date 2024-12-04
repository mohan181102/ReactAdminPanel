import React from 'react'
import Sidebar from '../Sidebar'
import FooterForm from './FooterForm'
import FooterMain from './FooterMain'

const Footer = () => {
    return (
        <div className="App">
            {/* <div className="sidebar sidebar-cm">
                <Sidebar />
            </div> */}
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Footer Master</h1>
                    </div>
                    <div className="form">
                        <FooterForm />
                    </div>
                    <div className="Gallery">
                        <FooterMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer