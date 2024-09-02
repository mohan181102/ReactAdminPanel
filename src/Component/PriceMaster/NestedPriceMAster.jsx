import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useState } from 'react'
import UpdateContex from '../CreateContex/CreateContex'
import Backend_Url from '../../config/config'
import AddPricemaster from './AddPricemaster'
import NestedMaster from '../Menumaster/NestedMaster'
import { useCookies } from 'react-cookie'

const NestedPriceMAster = ({ alldata, CompareName }) => {
    const [toggle, settoggle] = useState(false)
    const [Name, setName] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdatePMId, setUpdatePMId,
        UpdatePMImage, setUpdatePMImage,
        UpdatePMTextarea, setUpdatePMTextArea,
        UpdatePMUrl, setUpdatePMUrl,
        UpdatePMStatus, setUpdatePMStatus,
        UpdatePMPriority, setUpdatePMPriority,
        UpdatePMPlanName, setUpdatePMPlanName,
        UpdatePricemasterCategory, setUpdatePricemasterCategory,
        UpdatePMGruopName, setUpdatePMGruopName,
    } = useContext(UpdateContex)
    const addMore = async (name) => {
        settoggle(!toggle)
        setName(name)
    }


    const deleteHandler = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this Price?')
        if (!confirm) {
            return
        }

        await fetch(`${Backend_Url}/pricemaster/delete`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    ids: [id]
                })
            }
        )
            .then((res) => res.status == 200 ? window.alert("Successfully deleted the menu") : res.status == 403 ? window.alert('Child menu is present') : null)
            .then((res) => res.status == 200 ? window.location.reload() : null)
            .catch(() => window.alert("Failed to delete the menu"));

    }


    const UpdateHandler = async (item) => {
        setUpdatePMId(item.Id)
        setUpdatePMImage(item.Image)
        setUpdatePMTextArea(item.TextArea)
        setUpdatePMUrl(item.URL)
        setUpdatePMStatus(item.Status)
        setUpdatePMPriority(item.Priority)
        setUpdatePMPlanName(item.PlanName)
        setUpdatePricemasterCategory(item.Category)
        setUpdatePMGruopName(item.GruopName)
        addMore()


    }


    const checkdisabled = (item) => {
        console.log(item)
    }

    return alldata.filter((item) => item.GruopName != "null").filter((childitem) => childitem.GruopName === CompareName).map((childitem, index) => {
        console.log(childitem)
        return (
            <>

                <div className={`w-auto h-auto flex gap-[5px] items-center justify-start`}>
                    <img className={`w-[80px] h-[20px] bg-cover overflow-hidden object-center`} src={childitem.Image} />
                    <h2 className={`flex items-center justify-center gap-1`}><p className={`px-[10px] border-r border-r-black`}>{childitem.GruopName}</p><p className={`px-[10px] border-r border-r-black`}>{childitem.PlanName}</p><p className={`${childitem.Status ? "text-green-500" : "text-red-500"} px-[10px] border-r border-r-black`}>{(childitem.Status ? "active" : "inactive")}</p></h2>
                    <div className={`h-auto px-[10px] border-r border-r-black w-auto flex items-center justify-center gap-[5px]`}>
                        <button onClick={() => addMore(childitem.PlanName)} className={`w-auto bg-green-500 h-auto flex text-white p-[5px] items-center justify-center text-[15px]`}>
                            <Icon icon="mdi:add-bold" />
                        </button>
                        <button onClick={() => UpdateHandler(childitem)} className={`w-auto bg-gray-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ep:edit" /></button>
                        <button onClick={() => deleteHandler(childitem.Id)} disabled={checkdisabled(childitem)} className={`w-auto bg-red-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ic:baseline-delete" /></button>
                    </div>
                </div>

                <div className={`w-full h-fit pl-[30px] py-[2px]`}>
                    <NestedPriceMAster CompareName={childitem.PlanName} alldata={alldata} />

                </div>
                {
                    toggle ? <AddPricemaster toggle={!toggle} GruopName={Name} formtitle={Name} settoggle={() => settoggle(!toggle)} /> : null
                }
            </>
        )

    }

    )


}


export default NestedPriceMAster