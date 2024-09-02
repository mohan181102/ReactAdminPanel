import React from 'react'
import Sidebar from '../Sidebar'
import ClientForm from './ClientForm'
import ClientMain from './ClientMain'

const Client = () => {
    return (
        <div className="App">
            <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div>
            <div className="body-content body-cm absolute w-[77%] right-0">
                <div>
                    <div className="Header">
                        <h1 className="heading">Client</h1>
                    </div>
                    <div className="form">
                        <ClientForm />
                    </div>
                    <div className="Gallery">
                        <ClientMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Client