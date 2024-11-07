import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import "./HPContentMasterMain.css"
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const HPContentMasterMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { UpdateCMTitle, setUpdateCMTitle,
        UpdateCMContent, setUpdateCMContent,
        UpdateCMStatus, setUpdateCMStatus,
        UpdateCMPriority, setUpdateCMPriority,
        UpdateCMId, setUpdateCMId,
        UpdateBgcolor, setBgcolor, } = useContext(UpdateContex)




    // FETCH DATA
    const fetdata = async () => {
        try {
            const response = await fetch(`${Backend_Url}/HpContentMaster/getall`, {
                method: 'GET', headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            })
            const data = await response.json()
            setallcontent(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }


    useEffect(() => { fetdata() }, [])
    // DELETE METHOD
    const deletehandler = async (id = null) => {

        const confirm = window.confirm("Are you sure you want to delete this content?")
        if (!confirm) {
            return
        }

        try {
            await fetch(`${Backend_Url}/HPContentMaster/delete/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify({
                        id: id != null ? id : isSelected
                    })
                }
            )
                .then((res) => res.status == 200 ? window.alert("Content deleted") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Content deleted", err))
            fetdata()
        } catch (error) {
            console.error('Error:', error)
        }
    }


    const alldelete = async function () {
        await fetch(`${Backend_Url}/HPContentMaster/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            },
            body: JSON.stringify({
                id: isSelected,
            })
        })
            .then((res) => res.status == 200 ? window.alert(" Selected Content deleted") : null)
            .catch(window.alert("Error deleting content"))
    }


    // UPDATE HANDLER
    const UpdateHandler = (item) => {
        setUpdateCMTitle(item.Title)
        setUpdateCMContent(item.Content)
        setUpdateCMStatus(item.Status)
        setUpdateCMPriority(item.Priority)
        setUpdateCMId(item.Id)
        setBgcolor(item.BgColor)
    }


    // ALL ROWS
    const renderHPcontent = () => {
        return allcontent?.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`w-[20px] border border-[#ccc] `}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`w-[30px] border border-[#ccc]`}>{index + 1}</td>

                {/* title */}
                <td className="Name border border-[#ccc] text-left px-[13px] w-[400px]">{Singleitem.Title}</td>

                {/* COLOR */}
                <td className="Name main-color border border-[#ccc] px-[5px] py-[5px]">
                    <input type='color' disabled defaultValue={Singleitem.BgColor} />
                    <p className={`color-name text-[15px] font-[500]`}>{Singleitem.BgColor}</p>
                </td>

                {/* PRIORITY */}
                <td className="view-cell cm-priority !w-[20px] border border-[#ccc]">
                    {Singleitem.Priority}
                </td>

                {/* status */}
                <td className=" border border-[#ccc] w-[100px]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                <td className={`border border-[#ccc] w-[70px]`}>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => UpdateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletehandler([Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    // DELETE
    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, alldata) {
        if (e.target.checked) {
            setSelected(allcontent.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {allcontent.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={` `}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allcontent)}
                                        />
                                        <button
                                            className="delete-button"
                                            // disabled={isSelected.length != allcontent.length}
                                            onClick={(e) => alldelete(e)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Title</th>
                                <th>Color</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHPcontent()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default HPContentMasterMain