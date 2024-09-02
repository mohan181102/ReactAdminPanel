import React, { useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'

const DashboardMain = () => {
    const [alldata, setalldata] = useState([])

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async function () {
        try {
            await fetch(`${Backend_Url}/dashboardpage/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'content-Type': 'application/json'
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => setalldata(res.data))
        } catch (error) {
            console.log(error)
            window.alert('error while fetching data')
        }
    }

    const EveryRow = () => {
        return alldata.map((item, index) => (
            <tr key={index} className={`border border-[black]`}>
                <td className={`border  border-[#928e8e] `}>{index + 1}</td>

                {/* status */}
                <td className={`border border-[#928e8e]`}>{item.Status ? <p className={`text-green-500 font-[500]  `}>Active</p> : <p className={`text-red-500 font-[500]`}>Inactive</p>}</td>

                {/* PageName */}
                <td className={`border border-[#928e8e]`}>
                    <div className={`w-full h-full flex items-center justify-start gap-1`}>
                        <span className={`w-[20px] block h-[20px] `}>

                            <Icon
                                className={`w-auto h-auto`}
                                icon={item.Icon}
                            />

                        </span>
                        <p className={`w-fit h-full text-center`}>
                            {item.PageName}
                        </p>
                        <p>
                            ({item.PageURL})
                        </p>
                    </div>
                </td>

                {/* action */}
                <td className={`border border-[#928e8e]`}>
                    <div className="buttons justify-center gap-0">
                        <button
                            className="update-button"
                        // onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="update-button !bg-green-500"
                        // onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="zondicons:add-solid" />
                        </button>
                        <button
                            className="delete-button"
                        // onClick={() => deletehandler(Singleitem.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    return (
        <div className="gallery">
            {alldata.length != 0 ? (
                <table>
                    <thead>
                        <th>Sno.</th>
                        <th>Status</th>
                        <th>Page Name(Page URL)</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {EveryRow()}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">No Albums! Please Create One</div>
            )}


        </div>
    )
}

export default DashboardMain