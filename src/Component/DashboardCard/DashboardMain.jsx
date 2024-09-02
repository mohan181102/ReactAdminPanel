import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from '../CreateContex/CreateContex'

const DashboardMain = () => {
    const [alldata, setalldata] = useState([])
    const {
        UpdateDCIcon, setUpdateDCIcon,
        UpdateDCCardName, setUpdateDCCardName,
        UpdateDCURL, setDCUrl,
        UpdateDCcolor, setDCcolor,
        UpdateDCTbname, setDCTBname,
        UpdateDCTabelcondition, setDCtableCondition,
        UpdateDCNewTab, setDCNewTab,
        UpdateDCPriority, setDCPriority,
        UpdateDCStatus, setDCStatus,
        UpdateDcId, setUpdateDCID,
    } = useContext(UpdateContex)

    useEffect(() => {
        fetchdata()
    }, [])


    // delete
    const deletehandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this card?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/dashboardcard/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids: [id]
                    })
                }
            )
                .then((res) => res.status == 200 ? alert('Dashboard Card Delete successfully') : null)
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('Could not delete the record')
        }
    }


    // UPDATE HANDLER
    const UpdateHandler = (item) => {
        setUpdateDCIcon(item.Icon)
        setUpdateDCCardName(item.CardName)
        setDCUrl(item.PageUrl)
        setDCcolor(item.CardColor)
        setDCTBname(item.TableName)
        setDCtableCondition(item.TableCondition)
        setDCNewTab(item.NewTab)
        setDCPriority(item.Priority)
        setDCStatus(item.Status)
        setUpdateDCID(item.Id)
    }

    const EveryRow = () => {
        return alldata.map((item, index) => (
            <tr key={index} className={`border border-[black]`}>
                <td className={`border  border-[#928e8e] `}>{index + 1}</td>

                {/* status */}

                {/* Font */}
                <td className={`border border-[#928e8e]`}>
                    <Icon
                        icon={item.Icon}
                    />
                </td>

                {/* cardname */}
                <td className={`border border-[#928e8e]`}>
                    <p>{item.CardName}</p>
                </td>

                <td className={`border border-[#928e8e]`}>
                    <p>{item.Pageurl}</p>
                </td>

                <td className={`border border-[#928e8e]`}>
                    <input
                        type='color'
                        value={item.CardColor}
                        disabled
                        className={`!h-[20px]`}
                    />
                </td>

                <td className={`border border-[#928e8e]`}>
                    <p>{item.TableName}</p>
                </td>

                <td className={`border border-[#928e8e]`}>
                    <p>{item.TableCondition}</p>
                </td>

                <td className={`border border-[#928e8e]`}>
                    <p>{item.NewTab}</p>
                </td>

                <td className={`border border-[#928e8e]`}>
                    {item.Priority}
                </td>

                <td className={`border border-[#928e8e]`}>{item.Status ? <p className={`text-green-500 font-[500]  `}>Active</p> : <p className={`text-red-500 font-[500]`}>Inactive</p>}</td>
                {/* action */}
                <td className={`border border-[#928e8e]`}>
                    <div className="buttons justify-center gap-0">
                        <button

                            className="update-button"
                            onClick={() => UpdateHandler(item)}>
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => deletehandler(item.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    const fetchdata = async () => {
        try {
            await fetch(`${Backend_Url}/dashboardcard/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
                .then((res) => res.json())
                .then((res) => setalldata(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="gallery">
            {alldata.length != 0 ? (
                <table>
                    <thead>
                        <th>Sno.</th>
                        <th>Font</th>
                        <th>Card Name</th>
                        <th>Page URL</th>
                        <th>Color</th>
                        <th>Table Name</th>
                        <th>Table Condition</th>
                        <th>New Tab</th>
                        <th>Priority</th>
                        <th>Status</th>
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