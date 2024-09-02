import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const FontAwesomnMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateFontID, setUpdateFontID,
        UpdateFontName, setFontName,
        UpdateFontValue, setFontValue,
    } = useContext(UpdateContex)

    useEffect(() => { fetchdata() }, [])
    // fetch data from your API
    const fetchdata = async () => {
        try {
            await fetch(`${Backend_Url}/fontawesome/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => res.data ? setallcontent(res.data) : setallcontent([]))
        } catch (error) {
            console.log(error)
            window.alert('Failed to get all fonts')
        }
    }



    // DELETE HANDLER
    const deletehandler = async (id = null) => {
        const confirm = window.confirm('Are you sure you want to delete this font?')
        if (!confirm) return null

        try {
            await fetch(`${Backend_Url}/fontawesome/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(
                        {
                            ids: id != null ? [id] : ""
                        }
                    )
                }
            )
                .then((res) => res.status == 200 && window.alert('successfully delete this font'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('faild to delete font')
        }
    }

    // UPDATE HANDLER
    const updateHandler = (item) => {
        setUpdateFontID(item.Id)
        setFontName(item.FontName)
        setFontValue(item.FontValue)
    }


    // RENDER ROWS
    const renderEveryRow = () => {
        return allcontent.length != 0 ? allcontent.map((Singleitem, index) => {

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

                        {/* symbol */}
                        <td className={`flex items-center justify-center border border-[#ccc]`}>
                            <span className={`h-[40px] flex items-center justify-center`}>
                                {
                                    !Singleitem.FontName.includes(':') ? "no icon" : <Icon icon={Singleitem.FontName} />
                                }
                            </span>
                        </td>

                        {/* fontname */}
                        <td className="Name border border-[#ccc]">{Singleitem.FontName}</td>

                        {/* fontname */}
                        <td className="view-cell border border-[#ccc] cm-priority flex items-center justify-center">
                            <span className={`h-[40px] flex items-center justify-center`}>
                                {
                                    !Singleitem.FontName.includes(':') ? "no icon" : <Icon icon={Singleitem.FontName} />
                                }
                            </span>
                        </td>

                        <td className='border border-[#ccc]'>
                            <div className="buttons">
                                <button
                                    className="update-button"
                                    onClick={() => updateHandler(Singleitem)}
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
        }) : null;
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
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {allcontent.length != 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`text-[14px] font-bold`}>
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
                                <th className={`text-[14px] font-bold`}>Sno.</th>
                                <th className={`text-[14px] font-bold`}>Symbol</th>
                                <th className={`text-[14px] font-bold`}>FontName</th>
                                <th className={`text-[14px] font-bold`}>FontValue</th>
                                <th className={`text-[14px] font-bold`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
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

export default FontAwesomnMain