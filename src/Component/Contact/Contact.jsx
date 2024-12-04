import React from 'react'
import Sidebar from '../Sidebar'
import ContactMain from './ContactMain'

const Contact = () => {
    return (
        <>
            <div className="App">
                {/* <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div> */}
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">Contact</h1>
                        </div>
                        <div className="Gallery">
                            <ContactMain />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact