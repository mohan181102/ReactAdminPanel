import React from 'react'
import "./Download.css"
import Sidebar from './Sidebar'
import DownloadForm from './DownloadForm'
import MainDownload from './MainDownload'

const Download = () => {
    return (
        <>
            <div className="App">
                <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div>
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">Download</h1>
                        </div>
                        <div className="form">
                            <DownloadForm />
                        </div>
                        <div className="Gallery">
                            <MainDownload />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Download