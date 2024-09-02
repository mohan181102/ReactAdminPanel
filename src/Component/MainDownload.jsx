import React, { useContext, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import Backend_Url from '../config/config';
import "./MainDownload.css"
import UpdateContex from './CreateContex/CreateContex';
import { useCookies } from 'react-cookie';

const MainDownload = () => {
    const [alldownload, setAlldownload] = React.useState(null)
    const [isSelected, setSelected] = React.useState([])
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { setUpdateTitle, setUpdateFile, setUpdateStatus, setUpdateID, setUpdateURL, UpdateTitle } = useContext(UpdateContex)
    useEffect(() => { getAllDownloads() }, [])

    // FUNCTION FOR GET ALL DOWNLOADS
    const getAllDownloads = async () => {
        try {
            const response = await fetch(`${Backend_Url}/Download/get/all`,
                {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
            const data = await response.json()
            setAlldownload(data)
            console.log(data)
            if (data.length == 0) {
                setAlldownload(null)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }


    //FUNCTION FOR DELETE AN DOWNLOADS
    const deletedownload = async (id) => {
        try {
            const confirmed = window.confirm(`Are you sure you want to delete this download`)
            if (!confirmed) {
                return
            }
            const response = await fetch(`${Backend_Url}/Download/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }).catch((error) => console.error("Something went wrong", error))

            if (response) {
                window.alert("Download deleted successfully")
                getAllDownloads()
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }


    // UPDATE DOWNLOAD 
    const updatehandler = async function (item) {
        setUpdateTitle(item.Title)
        setUpdateID(item.Id)
        setUpdateStatus(item.Status)
        setUpdateURL(item.URL)
        setUpdateFile(item.Filepath)
        console.log(UpdateTitle)
    }


    // SELECT HANDLER
    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }


    // ALL DOWNLOAD SELECTED
    const Allselected = function (e, Alldonwload) {
        if (e.target.checked) {
            setSelected(alldownload.map(item => item.Id))
        } else {
            setSelected([])
        }
    }


    // DELETE ALL DOWNLOAD
    const DeleteAllDownload = async function (e) {
        try {
            const confirm = window.confirm('Are you sure you want to delete all downloads')

            if (!confirm) return

            const deleteall = await fetch(`${Backend_Url}/Download/delete/all`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                method: 'DELETE',

            }).catch((err) => console.log(err))

            if (deleteall.status == 200) {
                window.alert('All downloads deleted successfully')
                getAllDownloads()
            } else {
                window.alert('Error deleting all downloads')
            }
        } catch (error) {
            console.log(error)
        }
    }


    // ALL ROWS
    const renderDownload = () => {
        return alldownload.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border w-[30px] h-[30px] border-[#ccc]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`border h-[30px] w-[30px] border-[#ccc]`}>{index + 1}</td>

                <td className="Name border h-[30px] border-[#ccc]">{Singleitem.Title}</td>
                <td className="view-cell border h-[30px] border-[#ccc]">
                    <a target='_blank' href={Singleitem.Filepath}>
                        <span></span>
                        View
                    </a>
                </td>


                {/* status */}
                <td className=" border border-[#ccc] h-[30px]">
                    {Singleitem.Status ? <p className='active-status'>Active</p> : Singleitem.Status == false ? <p className='inactive-status'>Inactive</p> : <p className='null-status'>null</p>}
                </td>
                <td className={`border  border-[#ccc] h-[30px]`}>
                    <div className=" flex items-center justify-center gap-2 py-[5px]">
                        <button
                            className="update-button"
                            onClick={() => updatehandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletedownload(Singleitem.Id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {alldownload != null ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={` `}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, alldownload)}
                                        />
                                        <button
                                            className="delete-button"
                                            disabled={isSelected.length != alldownload.length}
                                            onClick={(e) => DeleteAllDownload(e)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Download Title</th>
                                <th>View</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderDownload()}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}

                {/* <UpdateEvent show={showUpdate} onClose={() => setshowUpdate(false)} EditId={EditId} /> */}
            </div>
        </>
    )
}

export default MainDownload