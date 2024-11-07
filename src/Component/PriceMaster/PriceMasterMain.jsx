import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import NestedPriceMAster from './NestedPriceMAster'
import { Icon } from '@iconify/react/dist/iconify.js'
import AddPricemaster from './AddPricemaster'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const PriceMasterMain = () => {
    const [alldata, setalldata] = useState([])
    const [toggle, settoggle] = useState(false)
    const [Name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
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

    useEffect(() => { fetchdata() }, [])

    const fetchdata = async (req, res) => {
        try {
            debugger
            await axios.get(`${Backend_Url}/pricemaster/getAll`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => setalldata(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }

    const addMore = async (name) => {
        settoggle(!toggle)
        setName(name)
    }

    const deleteHandler = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this Menu?')
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
            .then((res) => window.location.reload())

    }


    const updateHandler = (item) => {
        setUpdatePMId(item.Id)
        setUpdatePMImage(item.Image)
        setUpdatePMGruopName(item.GruopName)
        setUpdatePMTextArea(item.TextArea)
        setUpdatePMUrl(item.URL)
        setUpdatePMStatus(item.Status)
        setUpdatePMPriority(item.Priority)
        setUpdatePMPlanName(item.PlanName)
        setUpdatePricemasterCategory(item.Category)
        addMore()
    }

    const changenumber = () => {
        setNumber((prev) => prev + 1)
        return number
    }


    const EveryRow = () => {
        return alldata != null && alldata.filter((item) => item.GruopName == "null").map((item, index) => {

            return item.GruopName == "null" ?
                <>

                    <tr className={` w-full border-b border-b-[white] items-start justify-center `}>
                        <td className={`border  border-[#ccc]`}>
                            {index + 1}
                        </td>
                        <td className={`border border-[#ccc] `}>
                            <img className={`w-[80px] h-[20px] bg-cover overflow-hidden object-center`} src={item.Image} />
                        </td>
                        <td className={`w-full flex-col  m-0  gap-[5px] border border-[#ccc] h-auto flex items-start justify-center`}>

                            <div className={`w-auto gap-[5px] h-auto flex items-center justify-start`}>
                                <h2 className={`flex items-center justify-center gap-1`}> <p className={`px-[10px] border-r border-r-black`}>{item.PlanName}</p><p className={`${item.Status ? "text-green-500" : "text-red-500"} border-r border-r-black px-[10px]`}>{(item.Status ? "active" : "inactive")}</p></h2>
                                <div className={`h-auto w-auto flex items-center justify-center px-[10px] border-r border-r-black gap-[5px]`}>
                                    <button onClick={() => addMore(item.PlanName)} className={`w-auto bg-green-500 h-auto flex text-white p-[5px] items-center justify-center text-[15px]`}>
                                        <Icon icon="mdi:add-bold" />
                                    </button>
                                    <button onClick={() => updateHandler(item)} className={`w-auto bg-gray-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ep:edit" /></button>
                                    <button onClick={() => deleteHandler(item.Id)} className={`w-auto bg-red-500 text-white p-[5px] h-auto flex items-center justify-center text-[15px]`}><Icon icon="ic:baseline-delete" /></button>
                                </div>
                            </div>

                            <div className={`w-full flex items-start justify-center flex-col h-fit !pl-[60px]`}>
                                <NestedPriceMAster CompareName={item.PlanName} alldata={alldata} />

                            </div>
                            {/* {setNumber((prev)=>prev+1)} */}
                        </td>
                    </tr>

                    <AddPricemaster toggle={!toggle} GruopName={Name} formtitle={Name} settoggle={() => settoggle(!toggle)} />
                </>
                : null
        }
        )
    }


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] !border !border-[#ccc]">
                {alldata.length != 0 ? (
                    <table>
                        <thead>
                            <th>Sno.</th>
                            <th>Images</th>
                            <th >Root/Sub/Child Menu</th>
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

export default PriceMasterMain