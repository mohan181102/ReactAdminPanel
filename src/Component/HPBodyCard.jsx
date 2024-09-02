import React from 'react'
import Sidebar from './Sidebar'
import HPBodyCardForm from './HPBodyCardForm'
import HPBodyCardMain from './HPBodyCardMain'

const HPBodyCard = () => {
    return (
        <>
            <div className="App">
                <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div>
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">HP BodyCard</h1>
                        </div>
                        <div className="form">
                            <HPBodyCardForm />
                        </div>
                        <div className="Gallery">
                            <HPBodyCardMain />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HPBodyCard