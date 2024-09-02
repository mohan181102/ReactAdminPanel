import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const AcademicMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removecookie] = useCookies(['token'])
    const {
        UpdateAMId, setUpdateAMId,
        UpdateAMUpdateFile, setUpdateAMFile,
        UpdateAMTitle, setUpdateAMTitle,
        UpdateAMVideoURL, setUpdateAMVideoURL,
        UpdateAMVideoStatus, setUpdateAMVideoStatus,
    } = useContext(UpdateContex)

    useEffect(() => { fetdata() }, [])
    const fetdata = async () => {
        try {
            await fetch(`${Backend_Url}/academicmaster/getAll`,
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
            console.log(error)
            window.alert('could not fetch all data')
        }
    }

    console.log(allcontent)

    // deletehandler
    const deletehandler = async (id = null) => {
        const confirm = window.confirm('Are you sure you want to delete this academic')
        if (!confirm) return

        try {
            const data = {
                "ids": id != null ? [id] : isSelected,
            }
            await fetch(`${Backend_Url}/academicmaster/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert('academic delete successfully'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert("Error deleting academic")
        }
    }

    // UPDATE
    const updatehandler = (item) => {
        setUpdateAMId(item.Id)
        setUpdateAMFile(item.File)
        setUpdateAMTitle(item.EventTitle)
        setUpdateAMVideoURL(item.EventVideoTitle)
        setUpdateAMVideoStatus(item.Status)
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

    const rendetrow = () => {
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
                <td className="Name border border-[#ccc]">{Singleitem.EventTitle}</td>

                {/* URL */}
                <td className="Name main-color border border-[#ccc]">
                    {Singleitem.EventVideoTitle}
                </td>

                {/* IMAGE */}
                <td className="Name main-color border border-[#ccc]">
                    <a className={`text-red-500 border-b border-b-red-500`} target='_blank' href={Singleitem.File}>
                        View
                    </a>
                </td>


                {/* status */}
                <td className={`border border-[#ccc]`}>
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                <td className={`border border-[#ccc]`}>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => updatehandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletehandler(Singleitem.Id)}
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
                    <table className={`!bg-[#f8f8f8]`}>
                        <thead>
                            <tr>
                                <th className={` flex items-center justify-start  `}>
                                    <div className="checkbox gap-[5px]">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allcontent)}
                                        />
                                        <button
                                            className="delete-button"
                                            disabled={isSelected.length != allcontent.length}
                                            onClick={(e) => deletehandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className={`text-[14px] border-none font-bold`}>Sno.</th>
                                <th className={`text-[14px] border-none font-bold`}>Title</th>
                                <th className={`text-[14px] border-none font-bold`}>URL</th>
                                <th className={`text-[14px] border-none font-bold`}>View</th>
                                <th className={`text-[14px] border-none font-bold`}>Status</th>
                                <th className={`text-[14px] border-none font-bold`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rendetrow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default AcademicMain