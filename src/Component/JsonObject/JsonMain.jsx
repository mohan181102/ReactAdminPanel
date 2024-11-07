import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Backend_Url from '../../config/config';
import UpdateContex from '../CreateContex/CreateContex';

const JsonMain = () => {
    const [allcontent, setallcontent] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { jsonupdateID, setjsonupdateID, jsonupdateContent, setjsonupdateContent, UpdateJsonName, setUpdateJsonName } = useContext(UpdateContex)
    // FETCH DATA
    const fetdata = async () => {
        try {
            const response = await fetch(`${Backend_Url}/jsonroute/get`, {
                method: 'GET', headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            })
            const data = await response.json()
            console.log("json", data);

            setallcontent(data.json)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleopen = async (jsonObject) => {
        try {
            // Format the JSON with indentation for readability
            const formattedJson = JSON.parse(JSON.stringify(jsonObject));
            console.log(JSON.parse(jsonObject));

            // Open a new browser window
            const newWindow = window.open('', '_blank', 'width=600,height=400');

            // Write the JSON into the new window
            newWindow.document.write(`
      <html>
        <head>
          <title>JSON Viewer</title>
          <style>
            body {
              font-family: monospace;
              white-space: pre-wrap;
              word-wrap: break-word;
              margin: 20px;
              background-color: #f4f4f4;
            }
            h1 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>JSON Viewer</h1>
          <pre>${formattedJson}</pre>
        </body>
      </html>
    `);

            // Close the document stream
            newWindow.document.close();
        } catch (error) {
            console.log(error);
        }
    }

    const updatehandler = (item) => {
        debugger
        setjsonupdateContent(item.JsonObject)
        setjsonupdateID(item.Id)
        setUpdateJsonName(item.JsonName)
    }

    const deletehandler = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this json?")
        if (!confirm) {
            return
        }

        try {
            await fetch(`${Backend_Url}/jsonroute/delete/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },

                }
            )
                .then((res) => res.status == 200 ? window.alert("Content deleted") : null)
                .then(() => window.location.reload())
                .catch((err) => window.alert("Content deleted", err))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetdata()
    }, [])

    const renderHPcontent = () => {
        return allcontent?.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`w-[20px] border border-[#ccc] `}>
                    <input
                        // onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                    // checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`w-[30px] border border-[#ccc]`}>{index + 1}</td>

                {/* title */}
                <td className="Name border border-[#ccc] text-left px-[13px] w-[400px]">
                    <p className={`view text-red-500 flex items-center justify-start gap-1`} onClick={() => handleopen(Singleitem.JsonObject)}>
                        <Icon icon="mdi:eye-outline" />
                        View</p>
                </td>

                <td className="Name border border-[#ccc] text-left px-[13px] w-auto">
                    <p className={`view`} >{Singleitem.JsonName}</p>
                </td>

                <td className={`border border-[#ccc] w-[70px]`}>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => updatehandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletehandler([Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
            {allcontent?.length != 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th className={` `}>
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                    // onChange={(e) => Allselected(e, allcontent)}
                                    />
                                    <button
                                        className="delete-button"
                                    // disabled={isSelected.length != allcontent.length}
                                    // onClick={(e) => alldelete(e)}
                                    >
                                        <Icon icon="material-symbols:delete-outline" />
                                    </button>
                                </div>
                            </th>
                            <th>Sno.</th>
                            <th>JsonData</th>
                            <th className={`!min-w-[100px]`}>JsonName</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderHPcontent()}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">No Json Object! Please Create One</div>
            )}


        </div>
    )
}

export default JsonMain