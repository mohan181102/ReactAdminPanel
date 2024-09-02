import React from 'react'
import Sidebar from '../Sidebar'
import UserAuthenticationForm from './UserAuthenticationForm'
import UserAuthMain from './UserAuthMain'

const UserAuthentication = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">User Authentication</h1>
                    </div>
                    <div className="form">
                        <UserAuthenticationForm />
                    </div>
                    <div className="Gallery">
                        <UserAuthMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAuthentication