import React from 'react'
import Sidebar from '../Sidebar'
import HeaderTopMasterForm from './HeaderTopMasterForm'
import HeaderTopMain from './HeaderTopMain'

const HeaderTopMaster = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Header Top Master</h1>
                    </div>
                    <div className="form">
                        <HeaderTopMasterForm />
                    </div>
                    <div className="Gallery">
                        <HeaderTopMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTopMaster