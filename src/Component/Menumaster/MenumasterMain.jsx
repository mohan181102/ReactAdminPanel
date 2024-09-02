import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../../config/config'
import AddCategory from './AddCategory'
import NestedMaster from './NestedMaster'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const MenumasterMain = () => {
    const [alldata, setalldata] = useState([])
    const [toggle, settoggle] = useState(false)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [Name, setName] = useState("")
    const {
        UpdateMMPriority, setUpdateMMPriority,
        UpdateMMStatus, setUpdateMMStatus,
        UpdateMMId, setUpdateMMId,
        UpdateMMCategory_sub, setUpdateMMCategory_sub,
        UpdateMMURL, setUpdateMMURL,
        UpdateMMGruopName, setUpdateMMCruopName,
        UpdateMMTextArea, setUpdateTextArea,
        UpdateMMImage, setUpdateMMImage,
    } = useContext(UpdateContex)


    useEffect(() => fetdata, [])

    const fetdata = async () => {
        try {
            await fetch(`${Backend_Url}/MenuMaster/getall`,
                {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => setalldata(res.data))
        } catch (error) {
            console.log(error)
        }
    }


    const addMore = async (name) => {
        settoggle(!toggle)
        setName(name)
    }

    const UpdateHandler = async (item) => {
        console.log("item", item)
        setUpdateMMPriority(item.Priority);
        setUpdateMMStatus(item.Status);
        setUpdateMMId(item.Id);
        setUpdateMMCategory_sub(item.Category_sub);
        setUpdateMMURL(item.URL);
        setUpdateMMCruopName(item.GruopName);
        setUpdateTextArea(item.TextArea);
        setUpdateMMImage(item.Image);
        settoggle(!toggle)
        setName(item.Category_sub)
    }


    const deleteHandler = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this Menu?')
        if (!confirm) {
            return
        }

        await fetch(`${Backend_Url}/menumaster/delete`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    id: [id]
                })
            }
        )

            .then((res) => res.status == 200 ? window.alert("Successfully deleted the menu") : res.status == 403 ? window.alert('Child menu is present') : null)
            .then((res) => window.location.reload())
            .catch(() => window.alert("Failed to delete the menu"));
    }


    const EveryRow = () => {
        return alldata != null && alldata.filter((item) => item.GruopName == "null").map((item, index) => {
            return item.GruopName == "null" ?
                <>

                    <tr>
                        <td className={`border border-[#ccc] `}>
                            {index + 1}
                        </td>
                        <td className={`w-full gap-[5px] border border-[#ccc]  flex-col h-auto flex items-start justify-center`}>

                            <div className={`w-auto  gap-[5px] h-auto flex items-center justify-start`}>
                                <img className={`w-[80px] p-[2px] bg-white h-[20px] bg-cover overflow-hidden object-center`} src={item.Image} />
                                <h2 className={`flex items-center justify-center gap-1`}> <p className={`px-[10px] border-r border-r-black`}>{item.Category_sub}</p><p className={`${item.Status ? "text-green-500" : "text-red-500"} border-r border-r-black px-[10px]`}>{(item.Status ? "active" : "inactive")}</p></h2>
                                <div className={`h-auto w-auto flex items-center justify-center px-[10px] border-r border-r-black gap-[5px]`}>
                                    <button onClick={() => addMore(item.Category_sub)} className={`w-auto bg-green-500 h-auto flex text-white p-[5px] items-center justify-center text-[15px]`}>
                                        <Icon icon="mdi:add-bold" />
                                    </button>
                                    <button onClick={() => UpdateHandler(item)} className={`w-auto bg-gray-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ep:edit" /></button>
                                    <button onClick={() => deleteHandler(item.Id)} className={`w-auto bg-red-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ic:baseline-delete" /></button>
                                </div>
                            </div>

                            <div className={`w-full   h-fit pl-[20px]`}>
                                <NestedMaster CompareName={item.Category_sub} alldata={alldata} />

                            </div>

                        </td>
                    </tr>

                    <AddCategory page={UpdateMMId != null ? true : false} toggle={!toggle} GruopName={Name} formtitle={Name} settoggle={() => settoggle(!toggle)} />
                </>
                : null
        })
    }

    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {alldata.length != 0 ? (
                    <table>
                        <thead>
                            <th className={`border border-white`}>Sno.</th>
                            <th className={`border border-white flex items-center justify-start`}>Root/Sub/Child Menu</th>
                        </thead>
                        <tbody>
                            {EveryRow()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}


            </div>
        </>
    )
}

export default MenumasterMain