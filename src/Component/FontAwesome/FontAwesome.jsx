import React from 'react'
import Sidebar from '../Sidebar'
import Fontawesomeform from './Fontawesomeform'
import FontAwesomnMain from './FontAwesomnMain'

const FontAwesome = () => {
    return (
        <div className="App">
            <div className="sidebar sidebar-cm">
                <Sidebar />
            </div>
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Iconify</h1>
                    </div>
                    <div className="form">
                        <Fontawesomeform />
                    </div>
                    <div className="Gallery">
                        <FontAwesomnMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FontAwesome