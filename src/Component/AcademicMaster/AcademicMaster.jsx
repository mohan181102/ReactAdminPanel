import React, { useContext } from 'react'
import Sidebar from '../Sidebar'
import AcademicForm from './AcademicForm'
import AcademicMain from './AcademicMain'
import UpdateContex from '../CreateContex/CreateContex'

const AcademicMaster = () => {
    const { MobileToggle, setMobileToggle } = useContext(UpdateContex)
    return (
        <div className="App sm:items-center sm:justify-center sm:!flex-col">
            <div className={`sidebar ${MobileToggle ? "sm:hidden" : "sm:inline-block"} fixed pb-[50px] sm:!h-screen sm:absolute sm:!min-w-[100%] sm:!max-w-[100%] `}>
                <Sidebar />
            </div>
            <div className="body-content body-cm sm:!w-full sm:!static sm:pt-[70px] absolute w-[77%] right-0 ">
                <div>
                    <div className="Header">
                        <h1 className="heading sm:!text-[25px]">Academic Master</h1>
                    </div>
                    <div className="form">
                        <AcademicForm />
                    </div>
                    <div className="Gallery">
                        <AcademicMain />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AcademicMaster