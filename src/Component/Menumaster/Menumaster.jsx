import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Icon } from '@iconify/react/dist/iconify.js'
import "./Menumaster.css"
import AddCategory from './AddCategory'
import MenumasterMain from './MenumasterMain'

const Menumaster = () => {
    const [showform, setshowform] = useState(true)

    return (
        <div className="App ">
            <div className="sidebar fixed">
                <Sidebar />
            </div>
            <div className="body-content body-cm absolute w-[77%] right-0 ">
                <div>
                    <div className="Header">
                        <h1 className="heading">Menu Master</h1>
                    </div>
                    <div className="form px-[50px]">
                        <button onClick={() => setshowform(!showform)} className={` w-auto h-auto px-[10px] py-[5px] flex items-center justify-center bg-[#337ab7] text-white rounded-md`}>
                            <Icon
                                icon="mingcute:plus-fill"
                            />
                            <span className={` h-full text-[15px] font-bold flex items-center justify-center`}>
                                Add Category
                            </span>
                        </button>
                    </div>
                    <div className="Gallery">
                        <MenumasterMain />
                    </div>
                </div>
            </div>

            <AddCategory toggle={showform} settoggle={() => setshowform(!showform)} />
        </div>
    )
}

export default Menumaster