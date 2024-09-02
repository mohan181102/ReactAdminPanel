import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import JoditEditor from 'jodit-react'
import { useCookies } from 'react-cookie'

const CourseMasterMain = ({ allcontent, fetchdata }) => {
    // const [allcontent, setallcontent] = useState([])
    const [plantext, setplantext] = useState(null)
    const [isSelected, setSelected] = useState([])
    const [showparaid, setshowparaid] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        setUpdateCMID,
        setUpdateComTitle,
        setUpdateComTextcontent,
        setUpdateComPriority,
        setUpdateComBgcolor,
        setUpdateComStatus,
    } = useContext(UpdateContex)

    // useEffect(() => setallcontent(allcontent), [])

    const deletehandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this course?')
        if (!confirm) return

        try {
            await fetch(`${Backend_Url}/coursemaster/delete`,
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
                .then((res) => res.status == 200 && alert(`delete successfully`))
                .then(() => fetchdata())
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }


    // update
    const Updateandler = (item) => {
        setUpdateCMID(item.Id)
        setUpdateComTitle(item.Title)
        setUpdateComTextcontent(item.TextContent)
        setUpdateComPriority(item.Priority)
        setUpdateComBgcolor(item.Bgcolor)
        setUpdateComStatus(item.Status)
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

                            </div> : <p className={`cursor-pointer h-[60px] flex items-center justify-center font-bold text-green-500 text-[15px]`} onClick={() => setshowparaid(Singleitem.Id)}>View content</p>}

                        </td>


                        {/* status */}
                        <td className=" border border-[#ccc]">
                            {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                        </td>

                        <td className={`border border-[#ccc]`}>
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

    /*
    main-body-update
th-update 
td-cell*/
    return (
        <>
            <div className=" main-body-update !bg-[#f8f8f8] gallery">
                {allcontent.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`th-update `}>
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
                                <th className='th-update '>Sno.</th>
                                <th className='th-update '>Title</th>
                                <th className='th-update '>BgColor</th>
                                <th className='th-update '>Priority</th>
                                <th className='th-update '>Content</th>
                                <th className='th-update '>Status</th>
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

export default CourseMasterMain