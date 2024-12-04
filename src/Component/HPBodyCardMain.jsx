import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../config/config'
import "./HPBodyCardMain.css"
import UpdateContex from './CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const HPBodyCardMain = () => {
    const [allBodyCard, setallBodyCard] = useState([])
    const [isSelected, setSelected] = useState([])
    const { setCardTitle, setUpdateCardHeading, UpdateCardImage, setUpdateCardImage, setUpdateCardStatus, setUpdateCardPriority, setCardId, setCardURL, setUpdateCardWidth, setUpdateCardDetails } = useContext(UpdateContex)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async () => {
        debugger
        await fetch(`${Backend_Url}/HPBodyCard/getall`, {
            headers: {
                'authorization': 'Bearer ' + cookie.token
            }
        })
            .then((res) => res.json())
            .then((data) => setallBodyCard(data.data))
            .catch((err) => window.alert("Can't fetch all body", err))
    }

    console.log(allBodyCard)

    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, alldata) {
        if (e.target.checked) {
            setSelected(allBodyCard.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    const deletehandler = async (id = null) => {
        const confirm = window.confirm('Are you sure you want to delete this Card?')
        if (!confirm) {
            return
        }

        if (isSelected.length == 0 && id == null) {
            window.alert("Please select an Card")
            return
        }

        await fetch(`${Backend_Url}/HPBodyCard/delete/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({ id: id != null ? [id] : isSelected }),
            }
        ).then((response) => response.status == 200 ?
            window.alert("Deleted Successfully") : window.alert("Failed to Delete"))

        window.location.reload()

    }


    // UPDATE FUNCTION
    async function updatehandler(item) {
        setCardTitle(item.Title)
        setUpdateCardHeading(item.Heading)
        setUpdateCardStatus(item.Status)
        setUpdateCardPriority(item.Priority)
        setCardId(item.Id)
        setCardURL(item.URL)
        setUpdateCardWidth(item.CardWidth)
        setUpdateCardDetails(item.Details)
        setUpdateCardImage(item.CardImage)
    }

    const renderHPCardrow = () => {
        return allBodyCard.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc] w-[30px]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`w-[30px] border border-[#ccc]`}>{index + 1}</td>

                <td className="Name border border-[#ccc] w-[200px] text-left px-[8px]">{Singleitem.Heading}</td>
                <td className="Name border border-[#ccc] w-[150px] text-left">{Singleitem.Title}</td>
                <td className="view-cell border border-[#ccc] p-0">
                    <img className="image-container w-auto !m-0 !p-0 !h-[30px]" src={Singleitem.CardImage} />
                </td>

                {/* Cardwidth */}
                <td className={`border border-[#ccc] text-left`}>
                    {Singleitem.CardWidth}
                </td>

                {/* status */}
                <td className=" border border-[#ccc]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>

                {/* URL */}
                <td className={`w-[150px] border border-[#ccc]`}>
                    {Singleitem.URL}
                </td>

                {/* details */}
                <td className={`border border-[#ccc]`}>
                    {
                        shortpara(30, Singleitem.Details)
                    }
                    {/* {Singleitem.Details} */}
                </td>

                <td className={`border !w-[30px] border-[#ccc]`}>
                    {Singleitem.Priority}
                </td>

                <td className={` border border-[#ccc]`}>
                    <div className=" py-[10px] flex items-center justify-center gap-2">
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

    function shortpara(word = 50, full = "") {
        debugger

        const shortpara = full.slice(0, word)
        console.log(shortpara)
        return shortpara + "..."
    }


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {allBodyCard.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={` `}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allBodyCard)}
                                        />
                                        <button
                                            className="delete-button"
                                            disabled={isSelected.length == 0}
                                            onClick={(e) => deletehandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Heading</th>
                                <th>Title</th>
                                <th>CardImage</th>
                                <th>CardWidth</th>
                                <th>Status</th>
                                <th>URL</th>
                                <th>Details</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHPCardrow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default HPBodyCardMain