import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const PageViewMasterMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdatePVMTitle, setUpdatePVMTitle,
        UpdatePVMPageName, setUpdatePVMPageName,
        UpdatePVMStatus, setUpdatePVMStatus,
        UpdatePVMId, setUpdatePVMId,
        UpdatePVMPriority, setUpdatePVMPriority,
    } = useContext(UpdateContex)

    useEffect(() => { fetchdata() }, [])
    const fetchdata = async () => {
        try {
            await fetch(`${Backend_Url}/pageview/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => setallcontent(res.data))
        } catch (error) {
            window.alert("Data fetching failed")
            console.log(error)
        }
    }

    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, Alldonwload) {
        if (e.target.checked) {
            setSelected(allcontent.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    const renderPVMcontent = () => {
        return allcontent.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`border border-[#ccc]`}>{index + 1}</td>

                {/* title */}
                <td className="Name border border-[#ccc]">{Singleitem.Title}</td>

                {/* pagename */}
                <td className='Name border border-[#ccc]'>
                    {Singleitem.PageName}
                </td>


                {/* PRIORITY */}
                <td className="view-cell cm-priority border border-[#ccc]">
                    {Singleitem.Priority}
                </td>

                {/* status */}
                <td className=" border border-[#ccc]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                <td className='border border-[#ccc]'>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={(e) => deletehandler(e, [Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    const deletehandler = async function (e, id = null) {
        const confirm = window.confirm('Are you sure you want to delete this page?');
        if (!confirm) return
        try {
            await fetch(`${Backend_Url}/pageview/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(
                        {
                            "ids": id != null ? [id] : isSelected
                        }
                    )
                }
            )
                .then((res) => res.status == 200 && alert('Page Delete successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert("Failed to delete page")
        }
    }

    // UPDATE HANDLER
    const updateHandler = (item) => {
        setUpdatePVMTitle(item.Title)
        setUpdatePVMPageName(item.PageName)
        setUpdatePVMStatus(item.Status)
        setUpdatePVMId(item.Id)
        setUpdatePVMPriority(item.Priority)
    }

    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {allcontent.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={``}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allcontent)}
                                        />
                                        <button
                                            className="delete-button"
                                            // disabled={isSelected.length != allcontent.length}
                                            onClick={(e) => deletehandler(e)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Title</th>
                                <th>PageName</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderPVMcontent()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default PageViewMasterMain