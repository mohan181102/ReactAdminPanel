import React, { useContext, useEffect, useState } from 'react'
import UpdateContex from '../CreateContex/CreateContex'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useCookies } from 'react-cookie'
import axios from 'axios'

function FooterMain() {
    const [allcontent, setallcontent] = useState([])
    const [plantext, setplantext] = useState(null)
    const [isSelected, setSelected] = useState([])
    const [showparaid, setshowparaid] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateFooterID, setUpdateFooterID,
        UpdateFooterTitle, setUpdateFooterTitle,
        UpdateFooterTextcontent, setUpdateFooterTextcontent,
        UpdateFooterPriority, setUpdateFooterPriority,
        UpdateFooterBgcolor, setUpdateFooterBgcolor,
        UpdateFooterStatus, setUpdateFooterStatus,
    } = useContext(UpdateContex)

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async () => {
        try {
            await axios.get(`${Backend_Url}/Footer/getAll`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token
                    }
                }
            )
                .then((res) => setallcontent(res.data.data))
        } catch (error) {
            console.log(error)
            return window.alert('Error while fetching data')
        }
    }


    const deletehandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this footer?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/Footer/delete`,
                {
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
                }
            )
                .then((res) => res.status == 200 && alert(`Footer delete successfully`))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }


    // update
    const Updateandler = (item) => {
        setUpdateFooterID(item.Id)
        setUpdateFooterTitle(item.Title)
        setUpdateFooterTextcontent(item.TextContent)
        setUpdateFooterPriority(item.Priority)
        setUpdateFooterBgcolor(item.Bgcolor)
        setUpdateFooterStatus(item.Status)
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


    const renderEveryRow = () => {
        return allcontent.map((Singleitem, index) => {

            return (
                <>
                    <tr key={index}>
                        <td className='border border-[#ccc]'>
                            <input
                                onChange={(e) => changecheck(e, Singleitem.Id)}
                                type="checkbox"
                                checked={isSelected.includes(Singleitem.Id)}
                            />
                        </td>
                        <td className='border border-[#ccc]'>{index + 1}</td>

                        {/* title */}
                        <td className="Name border border-[#ccc]">{Singleitem.Title}</td>

                        {/* COLOR */}
                        <td className="Name main-color border border-[#ccc]">
                            <input type='color' disabled defaultValue={Singleitem.Bgcolor} />
                            <p className={`color-name`}>{Singleitem.BgColor}</p>
                        </td>

                        {/* PRIORITY */}
                        <td className="view-cell cm-priority border border-[#ccc]">
                            {Singleitem.Priority}
                        </td>

                        {/* content */}
                        <td className={`flex items-center justify-center p-0 border border-[#ccc]`}>
                            {showparaid == Singleitem.Id ? <div onClick={() => setshowparaid("")} className={`bg-white cursor-pointer min-w-full max-w-[130px] p-[2px] h-auto overflow-x-scroll`} dangerouslySetInnerHTML={{ __html: Singleitem.TextContent }}>

                            </div> : <p className={`cursor-pointer`} onClick={() => setshowparaid(Singleitem.Id)}>View content</p>}

                        </td>


                        {/* status */}
                        <td className="border border-[#ccc]">
                            {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                        </td>

                        <td className='border border-[#ccc]'>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={() => Updateandler(Singleitem)}
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
                                            disabled={isSelected.length != allcontent.length}
                                            onClick={() => deletehandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Title</th>
                                <th>BgColor</th>
                                <th>Priority</th>
                                <th>Content</th>
                                <th>Status</th>
                                <th>Action</th>
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

export default FooterMain