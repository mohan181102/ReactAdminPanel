import React from 'react'
import Sidebar from '../Sidebar'
import TCIssuedForm from './TCIssuedForm'
import TCissuedmain from './TCissuedmain'

const TCIssued = () => {
    return (
        <>
            <div className="App">
                {/* <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div> */}
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">TC Issued</h1>
                        </div>
                        <div className="form">
                            <TCIssuedForm />
                        </div>
                        <div className="Gallery">
                            <TCissuedmain />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TCIssued