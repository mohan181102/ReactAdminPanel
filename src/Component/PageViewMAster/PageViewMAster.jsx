import React from 'react'
import Sidebar from '../Sidebar'
import PageViewMasterForm from './PageViewMasterForm'
import PageViewMasterMain from './PageViewMasterMain'

const PageViewMAster = () => {
    return (
        <>
            <div className="App">
                <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div>
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">Page View Master</h1>
                        </div>
                        <div className="form">
                            <PageViewMasterForm />
                        </div>
                        <div className="Gallery">
                            <PageViewMasterMain />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageViewMAster