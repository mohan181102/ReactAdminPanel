import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../../config/config'
import "./Contact.css"
import { useCookies } from 'react-cookie'

const ContactMain = () => {
    const [allmessage, setallmessage] = useState(null)
    const [messageView, setmessageView] = useState(false)
    const [messageViewID, setmessageViewID] = useState(null)
    const [isSelected, setSelected] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    useEffect(() => { fetchdata() }, [])
    const fetchdata = async () => {
        try {
            const response = await fetch(`${Backend_Url}/contact/getall`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${cookie.token}`,
                },
            })
            const data = await response.json()
            setallmessage(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const viewmessage = function (id = null) {
        setmessageView(!messageView)
        setmessageViewID(id)
    }

    console.log(allmessage)


    const deleteHandler = async function (id = null) {
        const confirm = window.confirm('Are you sure you want to delete this message?')
        if (!confirm) {
            return
        }

        try {
            await fetch(`${Backend_Url}/contact/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${cookie.token}`,
                },
                body: JSON.stringify({ ids: [id] }),
            }).then((res) => res.status === 200 ? window.alert("Message delete succesfully!") : window.alert("Something went wrong"))
                .then(() => window.location.reload())
        } catch (error) {
            console.error('Error:', error)
        }
    }


    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, Alldonwload) {
        if (e.target.checked) {
            setSelected(allmessage.map(item => item.id))
        } else {
            setSelected([])
        }
    }



    const renderdata = () => {
        return allmessage.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border w-[30px] border-[#ccc]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.id)}
                    />
                </td>
                <td className={`border !w-[30px] border-[#ccc]`}>{index + 1}</td>

                <td className="Name border w-[200px] border-[#ccc]">{Singleitem.FullName}</td>

                <td className={`border w-[220px] border-[#ccc]`}>{Singleitem.Email}</td>
                <td className={`mesg-td border border-[#ccc]`}>
                    {
                        messageView && messageViewID == Singleitem.Id ?
                            <p className={`message`} onClick={() => viewmessage(Singleitem.Id)} >{Singleitem.Message}</p>
                            : <button className={`h-[40px] text-[red]`} onClick={() => viewmessage(Singleitem.Id)}>View Message</button>
                    }
                </td>
                <td className={` border border-[#ccc]`}>{Singleitem.Date}</td>
                <td className={`border border-[#ccc]`}>
                    <div className="buttons">
                        <button
                            className="delete-button"
                            onClick={() => deleteHandler(Singleitem.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    }

    return (
        <>
            <div className="gallery tc-main !bg-[#f8f8f8] !border !border-[#ccc">
                {allmessage != null ? (
                    <table className=''>
                        <thead>
                            <tr>
                                <th className={`div-dlt th`}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allmessage)}
                                        />
                                        <button
                                            className="delete-button"
                                            onChange={() => deleteHandler()}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className={`th`}>Sno.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderdata()}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No One Contact!</div>
                )}

                {/* <UpdateEvent show={showUpdate} onClose={() => setshowUpdate(false)} EditId={EditId} /> */}
            </div>
        </>
    )
}

export default ContactMain