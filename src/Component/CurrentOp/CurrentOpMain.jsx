import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import UpdateContex from '../CreateContex/CreateContex'

const CurrentOpMain = ({ allcontent = [], fetchdata }) => {
    const [allcontent2, setallcontent] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const { setCOheading,
        setCOlocation,
        setCOExpe,
        setCOPost,
        setCOSalary,
        setCODate,
        setKey,
        setCODescription, setCOUpdateID } = useContext(UpdateContex)


    // const fetchdata = async () => {
    //     try {
    //         await axios.get(`${Backend_Url}/currentop/all/cop`, {
    //             headers: {
    //                 'authorization': 'Bearer ' + cookie.token
    //             }
    //         }).then((res) => {
    //             if (res.status == 200) {
    //                 console.log(res.data)
    //                 setallcontent(res.data.data)
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const deletehandler = async (id) => {
        const confirm = window.confirm(`Are you sure you want to delete?`)
        if (!confirm) {
            return
        }
        try {
            await axios.delete(`${Backend_Url}/currentop/${id}`, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }).then((res) => {
                if (res.status == 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Delete successfully",
                        timer: 2000
                    })
                }
            })
            fetchdata()
        } catch (error) {
            console.log(error)
        }
    }

    const Updatehandler = (singleitem) => {
        setCOheading(singleitem.Heading)
        setCOlocation(singleitem.location)
        setCOExpe(singleitem.Expreriance)
        setCOPost(singleitem.post)
        setCOSalary(singleitem.Salary)
        setCODate(singleitem.Date)
        setKey(singleitem.key)
        setCODescription(singleitem.Description)
        setCOUpdateID(singleitem.Id)
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const renderEveryRow = () => {
        return allcontent?.map((Singleitem, index) => {

            return (
                <>
                    <tr key={index}>
                        <td className={`border border-[#ccc]`}>
                            <input
                                // onChange={(e) => changecheck(e, Singleitem.Id)}
                                type="checkbox"
                            // checked={isSelected.includes(Singleitem.Id)}
                            />
                        </td>
                        <td className={`border border-[#ccc]`}>{index + 1}</td>

                        {/* title */}
                        <td className="Name border border-[#ccc]">{Singleitem.Heading}</td>

                        {/* COLOR */}
                        <td className="Name main-color border border-[#ccc]">
                            {Singleitem.location}
                        </td>

                        {/* PRIORITY */}
                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.Expreriance}
                        </td>

                        {/* PRIORITY */}
                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.post}
                        </td>

                        {/* PRIORITY */}
                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.Salary}
                        </td>

                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.Date}
                        </td>

                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.key}
                        </td>


                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.Description}
                        </td>

                        <td className={`border border-[#ccc]`}>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={() => Updatehandler(Singleitem)}
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
                </>
            )
        });
    };


    return (
        <>
            <div className=" main-body-update !bg-[#f8f8f8] gallery">
                {allcontent?.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`th-update `}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                        // onChange={(e) => Allselected(e, allcontent)}
                                        />
                                        <button
                                            className="delete-button"
                                        // disabled={isSelected.length != allcontent.length}
                                        // onClick={() => deletehandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className='th-update '>Sno.</th>
                                <th className='th-update '>Heading</th>
                                <th className='th-update '>Location</th>
                                <th className='th-update '>Experience</th>
                                <th className='th-update '>Post</th>
                                <th className='th-update '>Salary</th>
                                <th className='th-update '>Date</th>
                                <th className='th-update '>Key</th>
                                <th className='th-update '>Description</th>
                                <th className='th-update '>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {renderHPcontent()} */}
                            {renderEveryRow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Course! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default CurrentOpMain