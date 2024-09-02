import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import "./ResultMain.css"
import { useCookies } from 'react-cookie'

const ResultMain = () => {
    const [allResult, setallResult] = useState(null)
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { UpdateRTitle, setUpdateRTitle,
        UpdateRURL, setUpdateRURL,
        UpdateRStatus, setUpdateRStatus,
        UpdateRFile, setUpdateRFile,
        UpdateRId, setUpdateRID, } = useContext(UpdateContex)

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async () => {
        await fetch(`${Backend_Url}/Result/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            },
        })
            .then((res) => res.json())
            .then((data) => data.results.length != 0 ? setallResult(data.results) : null)
    }

    const deletehandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this?')

        if (!confirm) {
            return
        }

        await fetch(`${Backend_Url}/Result/delete`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            },
            body: JSON.stringify({
                ids: [id]
            })
        })
            .then((res) => res.status == 200 && window.alert("Delete successfully"))
            .then(() => window.location.reload())
    }


    const updateHandler = (item) => {
        setUpdateRTitle(item.EventTitle)
        setUpdateRURL(item.URL)
        setUpdateRStatus(item.Status)
        setUpdateRFile(item.File)
        setUpdateRID(item.Id)
    }


    const alldelete = async function () {
        const confirm = window.confirm('Are you sure you want to delete all result')
        if (!confirm) return

        if (isSelected.length == 0) {
            return window.alert('Select atleast one result!')
        }

        try {
            await fetch(`${Backend_Url}/Result/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    ids: isSelected,
                })
            })
                .then((res) => res.status == 200 ? window.alert(" Selected Result deleted") : null)
                .then(window.location.reload())
                .catch(window.alert("Error deleting Result"))
        } catch (error) {
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

    const Allselected = function (e, alldata) {
        if (e.target.checked) {
            setSelected(alldata.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    const renderResult = function () {
        return allResult.map((item, index) => {
            return (
                <>
                    <tr>
                        <td className={`border !h-[30px] !w-[40px] border-[#ccc]`}>
                            <input
                                type='checkbox'
                                onChange={(e) => changecheck(e, item.Id)}
                                checked={isSelected.includes(item.Id)}
                            />
                        </td>
                        <td className={`border w-[40px] border-[#ccc]`}>
                            {index + 1}
                        </td>
                        <td className={`border w-[300px] text-left border-[#ccc]`}>
                            {item.EventTitle}
                        </td>
                        <td className={`border w-[200px] border-[#ccc]`}>
                            {item.URL}
                        </td>
                        <td className={`border border-[#ccc]`}>
                            <a href={item.File} className={`pdfview`} target='_blank'>
                                <Icon icon="uiw:file-pdf" />
                                View
                            </a>
                        </td>
                        <td className={`border border-[#ccc]`}>
                            {item.Status == true ? <p className={`active-status`}>Active</p> : <p className='inactive-status'>Inactive</p>}
                        </td>

                        <td className={`border border-[#ccc]`}>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={() => updateHandler(item)}
                                >
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
                </>
            )
        })

    }


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {allResult != null ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`div-dlt`}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allResult)}
                                        />
                                        <button
                                            className="delete-button"
                                            onClick={(e) => alldelete(e)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className={`text-left`}>Sno.</th>
                                <th className=' text-left'>Title</th>
                                <th className=" text-left">URL</th>
                                <th className={`text-left`}>File</th>
                                <th className=' text-left'>Status</th>
                                <th className={`text-left`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderResult()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Result! Please Create One</div>
                )}


            </div>

        </>
    )
}

export default ResultMain