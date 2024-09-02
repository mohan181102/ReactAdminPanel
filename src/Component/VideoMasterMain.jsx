import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from './CreateContex/CreateContex'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const VideoMasterMain = () => {
    const [AllVideo, setAllVideo] = useState([])
    const [isSelected, setIsSelected] = useState([])
    const { UpdateVMTitle, setVMTitle, UpdateVMURL, UpdateVMId, setUpdateVMId, setVMUrl, UpdateVMStatus, setVMStatus, UpdateVMPriority, setUpdateVMPriority } = useContext(UpdateContex)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    useEffect(() => { fetchdata() }, [])
    const fetchdata = async () => {
        await fetch(`${Backend_Url}/VideoMaster/getall`,
            {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }
        )
            .then((res) => res.json())
            .then((data) => setAllVideo(data))
            .catch((err) => console.error(err))
    }

    const updateHandler = (item) => {
        console.log(item)
        setUpdateVMPriority(item.Priority)
        setVMStatus(item.Status)
        setVMTitle(item.Title)
        setVMUrl(item.URL)
        setUpdateVMId(item.Id)
    }

    const deleteHandler = async function (e, Id) {
        console.log(isSelected)

        const confirm = window.confirm("Are you sure you want to delete this video ?")

        if (!confirm) {
            return
        }

        if (isSelected.length != 0) {
            const result = await fetch(`${Backend_Url}/VideoMaster/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    id: isSelected
                })
            })


            if (result.status == 200) {
                window.alert("Video deleted successfully")
                window.location.reload()
            } else {
                window.alert("Failed to delete video")
            }
        }

    }

    function calldelete(itemid) {
        console.log(itemid)
        setIsSelected([...isSelected, itemid])
        console.log(isSelected)
        deleteHandler()
    }


    const renderVideoMaster = () => {
        return AllVideo?.map((Singleitem, index) => (
            <tr key={index}>
                <td className=' border borde-[#ccc] w-[30px]'>
                    <input
                        // onChange={(e) => changecheck(e, Singleitem.id)}
                        type="checkbox"
                    // checked={isSelected.includes(Singleitem.id)}
                    />
                </td>
                <td className={`w-[40px] border border-[#ccc]`}>{index + 1}</td>

                <td className="Name w-[200px] border border-[#ccc] text-left">{Singleitem.Title}</td>

                {/* Details */}
                <td className=" w-[200px] text-left border border-[#ccc]">
                    {Singleitem.URL}
                </td>

                {/* DEsignation */}
                <td className="w-[30px] border border-[#ccc]">
                    {Singleitem.Priority}
                </td>

                <td className=" border border-[#ccc] w-[100px]">
                    {Singleitem.Status ? <p className='active'>Active</p> : <p className='inactive'>Inactive</p>}
                </td>
                <td className={`w-[90px]    `}>
                    <div className=" flex items-center justify-center py-[5px] gap-2 ">
                        <button
                            className="update-button"
                            onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => calldelete(Singleitem.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr >
        ));
    };


    return (
        <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
            {AllVideo.length != 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className="checkbox">
                                    <input
                                        type="checkbox"

                                    // onChange={(e) => Allselected(e, AllTestimonials)}
                                    />
                                    <button
                                        className="delete-button"
                                    // onClick={() => deletehandler(isSelected)}
                                    >
                                        <Icon icon="material-symbols:delete-outline" />
                                    </button>
                                </div>
                            </th>
                            <th>Sno.</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderVideoMaster()}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">No Albums! Please Create One</div>
            )}

        </div>
    )
}

export default VideoMasterMain