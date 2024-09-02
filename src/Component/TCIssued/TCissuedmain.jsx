import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Backend_Url from '../../config/config'
import "./TcMain.css"
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const TCissuedmain = () => {
    const [allTc, setAllTc] = useState([])
    const [ids, setids] = useState(null)
    const [isSelected, setSelected] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { UpdateSN, setUpdateSN,
        UpdateFN, setUpdateFN,
        UpdateTCID, setUpdateTCID,
        UpdateMN, setUpdateMN,
        UpdateTCLINK, setUpdaTCLink,
        UpdateTCDOB, setUpdaTCDOB,
        UpdateTCAddmission, setTCAddmission,
        UpdateTCClassLeft, setUpdaTCClassLeft,
        UpdateTCNo, setUpdateTCNo,
        UpdateLeavingDate, setUpdateLeavingDate,
        UpdateTCRemark, setUpdateTCRemark,
        UpdateTCStatus, setUpdateTCStatus } = useContext(UpdateContex)


    useEffect(() => { fetchdata() }, [])

    const fetchdata = async () => {
        await fetch(`${Backend_Url}/TCissued/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            }
        })
            .then((res) => res.json())
            .then((data) => setAllTc(data))
    }

    const deleteTc = async (id = null) => {
        const confirm = window.confirm('Are you sure you want to delete this TC?')
        if (!confirm) {
            return
        }

        await fetch(`${Backend_Url}/TCissued/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + cookie.token
            },
            body: JSON.stringify({
                id: id != null ? id : ids,
            }),
        })
            .then((res) => {
                window.alert("Delete TC Successfully")
                window.location.reload()
            })
            .catch(() => {
                window.alert("Failed to Delete TC")
            })
    }


    const updatehandler = (item) => {
        setUpdateSN(item.Studentname)
        setUpdateFN(item.Fathersname)
        setUpdateTCID(item.Id)
        setUpdateMN(item.Mothersname)
        setUpdaTCLink(item.LINK)
        setUpdaTCDOB(item.DOB)
        setTCAddmission(item.AdmissionNo)
        setUpdaTCClassLeft(item.ClassLeft)
        setUpdateTCNo(item.TCNo)
        setUpdateLeavingDate(item.LeavingDate)
        setUpdateTCRemark(item.Remark)
        setUpdateTCStatus(item.Status)
    }

    const renderTC = () => {
        return allTc.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`border border-[#ccc]`}>{index + 1}</td>

                <td className="Name border border-[#ccc]">{Singleitem.Studentname}</td>
                <td className={`border border-[#ccc]`}>
                    {Singleitem.Fathersname}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.Mothersname}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.DOB}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.AdmissionNo}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.ClassLeft}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.TCNo}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.LeavingDate}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.Remark}
                </td>

                <td className={`border border-[#ccc]`}>
                    {Singleitem.LINK}
                </td>

                {/* status */}
                <td className=" border border-[#ccc]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>
                <td>
                    <div className=" py-[8px] flex items-centers justify-center gap-2">
                        <button
                            className="update-button"
                            onClick={() => updatehandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deleteTc([Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, Alldonwload) {
        if (e.target.checked) {
            setSelected(allTc.map(item => item.Id))
        } else {
            setSelected([])
        }
    }



    return (
        <>
            <div className="gallery tc-main !bg-[#f8f8f8] !border !border-[#ccc]">
                {allTc.length != 0 ? (
                    <table className=''>
                        <thead>
                            <tr>
                                <th className={`  th`}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, allTc)}
                                        />
                                        <button
                                            className="delete-button"
                                            onChange={() => deleteTc(isSelected)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th className={`th`}>Sno.</th>
                                <th className={`th`}>Student Name</th>
                                <th className={`th`}>Fathers Name</th>
                                <th className={`th`}>Mothers Name</th>
                                <th className={`th`}>DOB</th>
                                <th className={`th`}>Admission No</th>
                                <th className={`th`}>Class Left</th>
                                <th className={`th`}>TC No</th>
                                <th className={`th`}>Leaving Date</th>
                                <th className={`th`}>Remark</th>
                                <th className={`th`}>Link</th>
                                <th className={`th`}>Status</th>
                                <th className={`th`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderTC()}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No TC! Please Create One</div>
                )}

                {/* <UpdateEvent show={showUpdate} onClose={() => setshowUpdate(false)} EditId={EditId} /> */}
            </div>
        </>
    )
}

export default TCissuedmain