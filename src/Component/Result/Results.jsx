import React from 'react'
import Sidebar from '../Sidebar'
import ResultMain from './ResultMain'
import ResultForm from './ResultForm'

const Results = () => {
    return (
        <div className="App">
            {/* <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div> */}
            <div className="body-content absolute w-[78%] right-0 ">
                <div>
                    <div className="Header">
                        <h1 className="heading">Result master</h1>
                    </div>
                    <div className="form">
                        <ResultForm />
                    </div>
                    <div className="Gallery">
                        <ResultMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results