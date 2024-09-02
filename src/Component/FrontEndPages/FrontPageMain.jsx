import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from '../CreateContex/CreateContex'

const FrontPageMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [filtervalue, setfiltervalue] = useState("")
    const [isSelected, setSelected] = useState([])
    const {
        UpdateIcon, setUpdateIcon,
        UpdatePageName, setUpdatePageName,
        UpdatePageUrl, setUpdatePageUrl,
        UpdateNewTab, setUpdateNewTab,
        UpdatePriority, setUpdatePriority,
        UpdateFStatus, setUpdateFStatus,
        UpdateFId, setUpdateFId,
    } = useContext(UpdateContex)

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async () => {
        try {

            await fetch(`${Backend_Url}/frontendpage/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
                .then(response => response.json())
                .then(data => setallcontent(data.data))
        } catch (error) {
            console.log(error)
        }
    }

    // DELETE HANDLER
    const deleteHandler = async (id = null) => {
        const confirm = window.confirm('Are you sure you want to delete this Front End Page?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/frontendpage/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            ids: id != null ? [id] : isSelected
                        }
                    )
                }
            )
                .then((res) => res.status == 200 ? alert('Frontend page deleted successfully') : alert('Frontend page deleted unsuccessfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.error('Error:', error)
            window.alert('Front end page delete failed')
        }
    }


    // UPDATE HANDLER
    const UpdateHandler = (item) => {
        setUpdateIcon(item.Icon)
        setUpdatePageName(item.PageName)
        setUpdatePageUrl(item.PageURL)
        setUpdateNewTab(item.NewTab)
        setUpdatePriority(item.Priority)
        setUpdateFStatus(item.Status)
        setUpdateFId(item.Id)
    }


    // all row 
    const allrow = () => {
        return allcontent.filter((item) => item.PageName.includes(filtervalue) ? item : null).map((Singleitem, index) => {
            return (
                <>
                    <tr key={index}>
                        <td>
                            <input
                                onChange={(e) => changecheck(e, Singleitem.Id)}
                                type="checkbox"
                                checked={isSelected.includes(Singleitem.Id)}
                            />
                        </td>

                        <td>{index + 1}</td>

                        {/* font */}
                        <td className={`flex items-center justify-center`}>
                            <span className={`flex items-center justify-center`}>
                                {
                                    !Singleitem.Icon.includes(':') ? "no icon" : <Icon icon={Singleitem.Icon} />
                                }
                            </span>
                        </td>

                        {/* pagename */}
                        <td className="Name">{Singleitem.PageName}</td>

                        {/* url */}
                        <td className="view-cell cm-priority flex items-center justify-center">
                            {Singleitem.PageURL}
                        </td>

                        {/* tab */}
                        <td>
                            {Singleitem.NewTab}
                        </td>

                        <td>
                            {Singleitem.Priority}
                        </td>

                        <td>
                            {Singleitem.Status ? <p className={`text-green-500`}>Active</p> : <p className={`text-red-500`}>Inactive</p>}
                        </td>

                        <td>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={() => UpdateHandler(Singleitem)}
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
                </>
            )
        })
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
            <div className="gallery">
                {/* searchbox */}
                <div className={`w-full flex items-center px-[20px] py-[5px] justify-start`}>
                    <div className={`w-[300px] bg-white py-[5px] px-[20px] h-full`}>
                        <input placeholder='Search' onChange={(e) => setfiltervalue(e.target.value)} className={`outline-none w-full`} />
                    </div>
                </div>
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
                                            disabled={isSelected.length != allcontent.length}
                                            onClick={() => deleteHandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Font</th>
                                <th>PageName</th>
                                <th>PageURL</th>
                                <th>New Tab</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allrow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Course! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default FrontPageMain