import React, { useState } from 'react'
import Backend_Url from '../../config/config'

const DashboardForm = () => {
    const [Icon, setIcon] = useState(null)
    const [PageName, setPageName] = useState(null)
    const [PageURL, setPageURL] = useState(null)
    const [Status, setStatus] = useState(null)

    // handlesubmit
    const handlesubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm('all details checked')
        if (!confirm) return

        try {
            const data = {
                "Icon": Icon,
                "PageName": PageName,
                "PageURL": PageURL,
                "Status": Status
            }
            await fetch(`${Backend_Url}/dashboardpage/create`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }
            ).then((res) => res.status == 200 && alert('Successfully created'))
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            window.alert('Error while creating Dashboard page')
        }
    }
    return (
        <>
            <div className="container">
                <form className="upload-form" onSubmit={(e) => handlesubmit(e)} >
                    <div className={`w-full h-auto mb-[10px] flex-wrap flex items-center justify-start `}>
                        <div className="form-group">
                            <label htmlFor="name">Icon</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontName}
                                className='titlename'
                                onChange={(e) => setIcon(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageName</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontValue}
                                className='titlename'
                                onChange={(e) => setPageName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageUrl</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontValue}
                                className='titlename'
                                onChange={(e) => setPageURL(e.target.value)}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="image">Status</label>
                            <select id='select' onChange={(e) => e.target.value == "True" ? setStatus(true) : setStatus(false)} className={`select`} >
                                <option>--select--</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                        <div className={`two-btn`}>
                            <button type={"submit"} className="submit-button">
                                CREATE
                            </button>
                            {/* CLEAR UPDATE */}
                            {/* {
                                UpdateFontID != null ?
                                    <button className="submit-button clear" onClick={() => { CancelHandler() }}>
                                        Cancel
                                    </button> : null
                            } */}
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default DashboardForm