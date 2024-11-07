import JoditEditor from 'jodit-react'
import React, { useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import Backend_Url from '../../config/config'
import axios from 'axios'
import UpdateContex from '../CreateContex/CreateContex'

const JsonForm = () => {
    const [json, setjson] = useState("")
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const [jsonname, setjsonname] = useState(null)
    const { jsonupdateID, setjsonupdateID, jsonupdateContent, setjsonupdateContent, UpdateJsonName, setUpdateJsonName } = useContext(UpdateContex)
    const handlesubmit = async (e) => {
        e.preventDefault()
        debugger
        const confirm = window.confirm('All details Checked?')
        if (!confirm) {
            return
        }
        console.log(Backend_Url)
        try {
            const form = new FormData()
            form.append('Jsoncontent', json)


            await axios.post(`${Backend_Url}/jsonroute/create`, {
                Jsoncontent: json,
                jsonname: jsonname
            },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.status == 200 ? window.alert("Successfully created Content") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Error creating Content", err));

        } catch (error) {
            console.log(error)
            window.alert("Error creating Content", error);
        }
    }
    // {
    //     ID: null, JsonData: null
    // }

    const CancelUpdate = () => {
        setjsonupdateContent(null)
        setjsonupdateID(null)
        setUpdateJsonName(null)
    }

    const handleupdate = async () => {

        debugger
        const confirm = window.confirm('Are you sure you want to update this Content?')
        if (!confirm) return

        try {
            await axios.put(`${Backend_Url}/jsonroute/update/${jsonupdateID}`, {
                Jsoncontent: jsonupdateContent,
                jsonname: UpdateJsonName
            }, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            })
                .then((res) => res.status == 200 ? window.alert("Successfully updated Content") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Error updating Content", err));
        } catch {
            window.alert("!Error updating Content")
        }

    }

    return (
        <>
            <div className="container">
                <form style={{ width: '100%' }} className="form form-update" onSubmit={handlesubmit}  >
                    <div className={`w-full h-auto flex items-start flex-col py-[15px] justify-center`}>
                        <label>Jsonname</label>
                        <input defaultValue={jsonupdateID != null ? UpdateJsonName : jsonname} onChange={(e) => (jsonupdateID != null ? setUpdateJsonName(e.target.value) : setjsonname(e.target.value))} type='text' className={` w-full h-[30px]`} />
                    </div>
                    <div className={`w-full h-auto flex items-start flex-col pb-[5px] justify-center`}>
                        <label>Jsondata</label>
                        <textarea
                            style={{
                                width: '100%',
                                border: '1px solid #ccc',
                                padding: '10px',
                                fontFamily: 'monospace',
                                outline: 'none'
                            }}
                            value={jsonupdateID != null ? jsonupdateContent : json}
                            onChange={(e) => (jsonupdateID != null ? setjsonupdateContent(e.target.value) : setjson(e.target.value))}
                            placeholder="Type your JSON here..."
                        />
                    </div>
                    <div className={`form-btn-update`}>
                        <button type={jsonupdateID != null ? "button" : "submit"} onClick={jsonupdateID != null ? handleupdate : null} className="form-submit-btn-update !w-[200px]">
                            {jsonupdateID != null ? "update" : "create"}
                        </button>
                        {
                            jsonupdateID != null ?
                                <button type={"button"} className="form-cancel-btn-update !w-[200px] " onClick={(e) => { CancelUpdate(e) }}>
                                    Cancel
                                </button> : null
                        }

                    </div>
                </form>
            </div>
        </>
    )
}

export default JsonForm