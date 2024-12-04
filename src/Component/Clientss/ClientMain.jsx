import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const ClientMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateCTitle, setUpdateCTitle,
        UpdateCURL, setUpdateCURL,
        UpdateCDetails, setUpdateCDetails,
        UpdateCPriority, setUpdateCPriority,
        UpdateCId, setUpdateCID,
        UpdateCStatus, setUpdateCStatus,
        UpdateCImage, setUpdateCImage,
    } = useContext(UpdateContex)

    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async () => {
        await fetch(`${Backend_Url}/client/getAll`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + cookie.token
            },
        })
            .then((res) => res.json())
            .then((res) => setallcontent(res.data))
    }

    console.log(allcontent)

    function shortpara(word = 50, full = "") {
        debugger

        const shortpara = full.slice(0, word)
        console.log(shortpara)
        return shortpara + "..."

    }
    // deletehandler
    const deletehandler = async function (e, id = null) {


        // const confirm = window.confirm('are you sure you want to delete this client?')
        // if (!confirm) {
        //     return
        // }
        try {
            await fetch(`${Backend_Url}/client/delete`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify(
                    {
                        ids: id != null ? [id] : isSelected
                    }
                )
            })
                .then((res) => res.status == 200 && alert('Client Delete Successfully !'))
                .then(() => window.location.reload())
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
            return window.alert('error deleting client')
        }
    }


    // update handler
    const UpdateHandler = async function (item) {
        setUpdateCTitle(item.Title)
        setUpdateCURL(item.URL)
        setUpdateCDetails(item.Details)
        setUpdateCPriority(item.Priority)
        setUpdateCID(item.Id)
        setUpdateCStatus(item.Status)
        setUpdateCImage(item.Image)
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
            setSelected(alldata.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    const renderClientRow = () => {
        return allcontent.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc] w-[30px] h-[30px]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`border w-[30px] border-[#ccc]`}>{index + 1}</td>

                {/* title */}
                <td className="Name border w-[200px] text-left px-[10px] border-[#ccc]">{Singleitem.Title}</td>

                {/* URL */}
                <td className="Name main-color border !w-[150px] text-left border-[#ccc]">
                    {Singleitem.URL}
                </td>

                {/* IMAGE */}
                <td className="Name main-color border border-[#ccc]">
                    <img className={`w-[100px] h-[30px] shadow-md object-cover bg-center `} src={Singleitem.Image} alt='image' />
                </td>

                {/* PRIORITY */}
                <td className="view-cell cm-priority !w-[20px] border border-[#ccc]">
                    {Singleitem.Priority}
                </td>

                {/* PRIORITY */}
                <td className="view-cell !w-[150px] text-left cm-priority border border-[#ccc]">
                    {shortpara(30, Singleitem.Details)}
                </td>

                {/* status */}
                <td className=" border border-[#ccc]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                <td className={`border border-[#ccc]`}>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => UpdateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={(e) => deletehandler(e, Singleitem.Id)}
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
                                            onClick={(e) => deletehandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className={`text-left`}>Sno.</th>
                                <th className={`text-left`}>Title</th>
                                <th className={`text-left`}>URL</th>
                                <th className={`text-left`}>Image</th>
                                <th className={`text-left`}>Priority</th>
                                <th className={`text-left`}>Details</th>
                                <th className={`text-left`}>Status</th>
                                <th className={`text-left`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderClientRow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default ClientMain