import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Icon } from '@iconify/react/dist/iconify.js'
import AddPricemaster from './AddPricemaster'
import PriceMasterMain from './PriceMasterMain'

const Pricemaster = () => {
    const [showform, setshowform] = useState(true)

    return (
        <div className="App ">
            <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div>
            <div className="body-content body-cm absolute w-[77%] right-0">
                <div>
                    <div className="Header">
                        <h1 className="heading">Plans and Prices Master </h1>
                    </div>
                    <div className="form px-[50px]">
                        <button onClick={() => setshowform(!showform)} className={` w-auto h-auto px-[10px] py-[5px] flex items-center justify-center bg-[#337ab7] text-white rounded-md`}>
                            <Icon
                                icon="mingcute:plus-fill"
                            />
                            <span>
                                Add Plan & Prices
                            </span>
                        </button>
                    </div>
                    <div className="Gallery">
                        <PriceMasterMain />
                    </div>
                </div>
            </div>
            <AddPricemaster toggle={showform} settoggle={() => setshowform(!showform)} />

        </div>
    )
}

export default Pricemaster