import React, { useContext, useState } from 'react'
import AddCategory from './AddCategory'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const NestedMaster = ({ alldata, CompareName }) => {
    const [toggle, settoggle] = useState(false)
    const [Name, setName] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
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
    const addMore = async (name) => {
        settoggle(!toggle)
        setName(name)
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
            .then((res) => res.status == 200 ? window.location.reload() : null)
            .catch(() => window.alert("Failed to delete the menu"));

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

    const checkdisabled = (item) => {
        console.log(item)
    }

    return alldata.filter((item) => item.GruopName != "null").filter((childitem) => childitem.GruopName === CompareName).map((childitem, index) => {

        return (
            <>

                <div className={`w-auto h-auto flex gap-[5px] items-center justify-start`}>
                    <img className={`w-[80px] h-[20px] bg-cover overflow-hidden object-center`} src={childitem.Image} />
                    <h2 className={`flex items-center justify-center gap-1`}><p className={`px-[10px] border-r border-r-black`}>{childitem.GruopName}</p><p className={`px-[10px] border-r border-r-black`}>{childitem.Category_sub}</p><p className={`${childitem.Status ? "text-green-500" : "text-red-500"} px-[10px] border-r border-r-black`}>{(childitem.Status ? "active" : "inactive")}</p></h2>
                    <div className={`h-auto px-[10px] border-r border-r-black w-auto flex items-center justify-center gap-[5px]`}>
                        <button onClick={() => addMore(childitem.Category_sub)} className={`w-auto bg-green-500 h-auto flex text-white p-[5px] items-center justify-center text-[15px]`}>
                            <Icon icon="mdi:add-bold" />
                        </button>
                        <button onClick={() => UpdateHandler(childitem)} className={`w-auto bg-gray-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ep:edit" /></button>
                        <button onClick={() => deleteHandler(childitem.Id)} disabled={checkdisabled(childitem)} className={`w-auto bg-red-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ic:baseline-delete" /></button>
                    </div>
                </div>

                <div className={`w-full h-fit pl-[30px] py-[2px]`}>
                    <NestedMaster CompareName={childitem.Category_sub} alldata={alldata} />

                </div>
                {
                    toggle ? <AddCategory toggle={!toggle} page={UpdateMMId != null ? true : false} GruopName={UpdateMMId != null ? UpdateMMGruopName : Name} formtitle={Name} settoggle={() => settoggle(!toggle)} /> : null
                }
            </>
        )

    }

    )


}

export default NestedMaster




