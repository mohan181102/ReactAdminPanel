import React from 'react'
import Sidebar from '../Sidebar'
import EmployeeForm from './EmployeeForm'
import EmployeeMain from './EmployeeMain'

const Employee = () => {
    return (
        <div className="App">
            {/* <div className="sidebar sidebar-cm">
                <Sidebar />
            </div> */}
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Employee Details</h1>
                    </div>
                    {/* <div className="form">
                        <EmployeeForm />
                    </div> */}
                    <div className="Gallery">
                        <EmployeeMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee