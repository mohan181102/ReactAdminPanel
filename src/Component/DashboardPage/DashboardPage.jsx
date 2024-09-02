import React from 'react'
import Sidebar from '../Sidebar'
import DashboardForm from './DashboardForm'
import DashboardMain from './DashboardMain'

const DashboardPage = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Dashboard Page</h1>
                    </div>
                    <div className="form">
                        <DashboardForm />
                    </div>
                    <div className="Gallery">
                        <DashboardMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage