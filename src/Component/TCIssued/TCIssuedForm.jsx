import React, { useContext, useState } from 'react'
import "./TCForm.css"
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const TCIssuedForm = () => {
    const [StudentName, setStudentName] = useState(null)
    const [FatherName, setFatherName] = useState(null)
    const [MotherName, setMotherName] = useState(null)
    const [TCNo, setTCNo] = useState(null)
    const [DOB, setDOB] = useState(null)
    const [AdmissionNo, setAdmissionNo] = useState(null)
    const [ClassLeft, setClassLeft] = useState(null)
    const [Remarks, setRemarks] = useState(null)
    const [Link, setLink] = useState(null)
    const [Status, setStatus] = useState(null)
    const [LeavingDate, setLeavingDate] = useState(null)
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

    const createTC = async function (e) {
        e.preventDefault()
        const confirm = window.confirm("All details checked?")
        if (!confirm) {
            return
        }

        try {
            await fetch(`${Backend_Url}/TCissued/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    StudentName: StudentName,
                    FatherName: FatherName,
                    MotherName: MotherName,
                    DOB: DOB,
                    AdmissionNo: AdmissionNo,
                    ClassLeft: ClassLeft,
                    TCNo: TCNo,
                    LeavingDate: LeavingDate,
                    Remark: Remarks,
                    Link: Link,
                    Status: Status
                })
            }).then((res) => res.status == 200 ? window.alert("Successfully created TC") : window.alert("Error creating TC")).then(() => window.location.reload())
                .catch((err) => console.log("error", err))

        } catch (error) {
            console.error('Error creating TC:', error);
        }
    }

    const UpdateHandler = async function (id) {
        const confirm = window.confirm('Are you sure you want to update this TC?');
        if (!confirm) {
            return
        }

        try {
            await fetch(`${Backend_Url}/TCissued/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({
                    UpdateStudentName: UpdateSN,
                    UpdateFatherName: UpdateFN,
                    UpdateMotherName: UpdateMN,
                    UpdateDOB: UpdateTCDOB,
                    UpdateAdmissionNo: UpdateTCAddmission,
                    UpdateClassLeft: UpdateTCClassLeft,
                    UpdateTCNo: UpdateTCNo,
                    UpdateLeavingDate: UpdateLeavingDate,
                    UpdateRemark: UpdateTCRemark,
                    UpdateLink: UpdateTCLINK,
                    UpdateStatus: UpdateTCStatus
                })
            }).then((res) => res.status == 200 ? window.alert("Update Success!") : window.alert("Update Failure"))
                .then(() => window.location.reload())
                .catch((err) => { console.log(err) });
        } catch (error) {
            window.alert("Error: " + error)
            console.error('Error updating TC:', error);
        }
    }

    const cancelHandler = () => {
        setUpdateSN(null)
        setUpdateFN(null)
        setUpdateTCID(null)
        setUpdateMN(null)
        setUpdaTCLink(null)
        setUpdaTCDOB(null)
        setTCAddmission(null)
        setUpdaTCClassLeft(null)
        setUpdateTCNo(null)
        setUpdateLeavingDate(null)
        setUpdateTCRemark(null)
        setUpdateTCStatus(null)
    }



    return (
        <>
            <div className="container">
                <form className="upload-form form-update !bg-[#f8f8f8] !shadow-none !border !border-[#ccc]" onSubmit={(e) => createTC(e)} >
                    <div className={`allinput-update flex-wrap`}>
                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>Student Name</label>
                            <input
                                type="text"
                                placeholder='Student Name'
                                id="name"
                                onChange={(e) => UpdateSN != null ? setUpdateSN(e.target.value) : setStudentName(e.target.value)}
                                className='form-input-update'
                                defaultValue={UpdateSN}
                                required
                            />
                        </div>


                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Fathers Name</label>
                            <input
                                type="text"
                                id="Fname"
                                onChange={(e) => UpdateFN != null ? setUpdateFN(e.target.value) : setFatherName(e.target.value)}
                                placeholder='Fathers Name'
                                className='form-input-update'
                                defaultValue={UpdateFN}
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Mothers Name</label>
                            <input
                                type="text"
                                onChange={(e) => UpdateMN != null ? setUpdateMN(e.target.value) : setMotherName(e.target.value)}
                                id="Mname"
                                placeholder='Mothers Name'
                                className='form-input-update'
                                defaultValue={UpdateMN}
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>DOB</label>
                            <input
                                type="date"
                                id="date"
                                defaultValue={UpdateTCDOB}
                                onChange={(e) => UpdateTCDOB != null ? setUpdaTCDOB(e.target.value) : setDOB(e.target.value)}
                                placeholder='Date of birth'
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Admission No.</label>
                            <input
                                type="number"
                                id="date"
                                defaultValue={UpdateTCAddmission}
                                onClick={(e) => UpdateTCAddmission != null ? setTCAddmission(e.target.value) : setAdmissionNo(e.target.value)}
                                placeholder='Admission No'
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Class Left</label>
                            <input
                                type="number"
                                id="date"
                                defaultValue={UpdateTCClassLeft}
                                onChange={(e) => UpdateTCClassLeft != null ? setUpdaTCClassLeft(e.target.value) : setClassLeft(e.target.value)}
                                placeholder='Class Left'
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>TC No.</label>
                            <input
                                type="number"
                                id="date"
                                defaultValue={UpdateTCNo}
                                onChange={(e) => UpdateTCNo != null ? setUpdateTCNo(e.target.value) : setTCNo(e.target.value)}
                                placeholder='TC No.'
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Leaving Date</label>
                            <input
                                type="date"
                                id="date"
                                defaultValue={UpdateLeavingDate}
                                onChange={(e) => UpdateLeavingDate != null ? setUpdateLeavingDate(e.target.value) : setLeavingDate(e.target.value)}
                                className='form-input-update'
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Remarks</label>
                            <input
                                type="text"
                                id="date"
                                onChange={(e) => UpdateTCRemark != null ? setUpdateTCRemark(e.target.value) : setRemarks(e.target.value)}
                                placeholder='Remarks'
                                defaultValue={UpdateTCRemark}
                                className='form-input-update'
                                required
                            />
                        </div>


                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Link</label>
                            <input
                                type="text"
                                id="date"
                                defaultValue={UpdateTCLINK}
                                onChange={(e) => UpdateTCLINK != null ? setUpdaTCLink(e.target.value) : setLink(e.target.value)}
                                className='form-input-update'
                                required
                                placeholder='Link'
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="image" className='form-label-update'>Status</label>
                            <select id='select' className={`form-input-update`} onChange={(e) => e.target.value == "True" ? UpdateTCStatus != null ? setUpdateTCStatus(true) : setStatus(true) : UpdateTCStatus != null ? setUpdateTCStatus(false) : setStatus(false)}>
                                <option>{UpdateTCStatus != null ? UpdateTCStatus ? "True" : "False" : "--Select--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>
                    </div>

                    <div className={`form-btn-update`}>
                        <button type={UpdateTCID != null ? "button" : "submit"} onClick={() => UpdateTCID != null ? UpdateHandler(UpdateTCID) : null} className="form-submit-btn-update">
                            {UpdateTCID != null ? "Update" : "Create"}
                        </button>
                        {/* CLEAR UPDATE */}
                        {
                            UpdateTCID != null ?
                                <button className="form-cancel-btn-update " onClick={() => cancelHandler()}>
                                    CLEAR
                                </button> : null
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default TCIssuedForm