import React, { useContext, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { useCookies } from 'react-cookie'

const Fontawesomeform = () => {
    const [FontName, setfontName] = useState(null)
    const [FontValue, setfontValue] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const {
        UpdateFontID, setUpdateFontID,
        UpdateFontName, setFontName,
        UpdateFontValue, setFontValue,
    } = useContext(UpdateContex)

    const handlesubmit = async function (e) {
        e.preventDefault();
        const confirm = window.confirm('All details checked ?')
        if (!confirm) return null

        const data = {
            FontName: FontName,
            FontValue: FontValue
        }
        try {
            await fetch(`${Backend_Url}/fontawesome/create`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((res) => res.status == 200 && alert('Font created successfully'))
                .then(() => window.location.reload())

        } catch (error) {
            console.log(error)
            return window.alert('failed to create font')
        }
    }

    // UPDATEHANDLER
    const UpdateHandler = async () => {

        try {
            await fetch(`${Backend_Url}/fontawesome/update/${UpdateFontID}`,
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify({
                        "UpdateFontName": UpdateFontName,
                        "UpdateFontvalue": UpdateFontValue
                    })
                }
            )
                .then((res) => res.status == 200 && window.alert('Font successfully updated'))
                .then((res) => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('Update failed')
        }
    }

    const CancelHandler = () => {
        setUpdateFontID(null)
        setFontName(null)
        setFontValue(null)
    }

    /* form-update
form-cancel-btn-update 
form-submit-btn-update
form-btn-update
allinput-update
form-input-update
form-label-update
form-gruop-update
form-update 
*/

    return (
        <>
            <div className="container ">
                <form className="upload-form form-update !bg-[#f8f8f8] !shadow-none border !border-[#ccc]" onSubmit={(e) => handlesubmit(e)} >
                    <div className={`allinput-update `}>
                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>IconName</label>
                            <input
                                type="text"
                                placeholder={"Enter Icon Name"}
                                id="name"
                                defaultValue={UpdateFontName}
                                className='form-input-update'
                                onChange={(e) => UpdateFontID != null ? setFontName(e.target.value) : setfontName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-gruop-update">
                            <label htmlFor="name" className='form-label-update'>IconValue</label>
                            <input
                                type="text"
                                placeholder={"Enter Icon Value"}
                                id="name"
                                defaultValue={UpdateFontValue}
                                className='form-input-update'
                                onChange={(e) => UpdateFontID != null ? setFontValue(e.target.value) : setfontValue(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className={`form-btn-update`}>
                        <button type={UpdateFontID != null ? "button" : "submit"} onClick={() => UpdateFontID !== null ? UpdateHandler() : null} className="form-submit-btn-update">
                            {UpdateFontID != null ? 'UPDATE' : 'CREATE'}
                        </button>
                        {/* CLEAR UPDATE */}
                        {
                            UpdateFontID != null ?
                                <button className="form-cancel-btn-update " onClick={() => { CancelHandler() }}>
                                    Cancel
                                </button> : null
                        }
                    </div>

                </form>
            </div>
        </>
    )
}

export default Fontawesomeform