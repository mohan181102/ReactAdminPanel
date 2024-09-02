import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'

const HeaderTopMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const {
        UpdateHTTitle, setUpdateHTTitle,
        UpdateHTPriority, setUpdateHTPRiority,
        UpdateHTColor, setUpdateHTColor,
        UpdateHTStatus, setUpdateHTStatus,
        UpdateHTTextarea, setUpdateHTTextArea,
        UpdateHTId, setUpdateHTId,
    } = useContext(UpdateContex);
    const fetchdata = async () => {
        try {
            await fetch(`${Backend_Url}/headertopmaster/getAll`)
                .then(response => response.json())
                .then(data => setallcontent(data.data))
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    useEffect(() => { fetchdata() }, [])


    // DELETEHANDLER
    const deleteHandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this header top?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/headertopmaster/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids: id != null ? [id] : isSelected
                    })
                }
            )
                .then((res) => res.status == 200 ? alert('Delete successfully? ') : null)
                .then(() => fetchdata())
        } catch (error) {
            console.log(error)
            alert('Header Top Delete Failed!')
        }
    }

    // UPDATEHANDLER
    const updateHandler = (item) => {
        setUpdateHTTitle(item.Title)
        setUpdateHTPRiority(item.Priority)
        setUpdateHTColor(item.BgColor)
        setUpdateHTStatus(item.Status)
        setUpdateHTTextArea(item.TextArea)
        setUpdateHTId(item.Id)
    }


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



    const renderHPcontent = () => {
        return allcontent.map((Singleitem, index) => (
            <tr key={index}>
                <td>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td>{index + 1}</td>

                {/* title */}
                <td className="Name">{Singleitem.Title}</td>

                {/* COLOR */}
                <td className="Name main-color">
                    <input type='color' disabled defaultValue={Singleitem.BgColor} />
                    <p className={`color-name`}>{Singleitem.BgColor}</p>
                </td>

                {/* PRIORITY */}
                <td className="view-cell cm-priority">
                    {Singleitem.Priority}
                </td>

                {/* status */}
                <td className="">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                <td>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deleteHandler(Singleitem.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    return (
        <>
            <div className="gallery">
                {allcontent.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`div-dlt`}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allcontent)}
                                        />
                                        <button
                                            className="delete-button"
                                            // disabled={isSelected.length != allcontent.length}
                                            onClick={(e) => deleteHandler(e)}
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

export default HeaderTopMain