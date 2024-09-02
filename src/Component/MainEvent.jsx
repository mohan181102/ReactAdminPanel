import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "./Maintevent.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import Backend_Url from "../config/config";
import UpdateEvent from "./UpdateEvent";
import { json } from "react-router-dom";
import { useCookies } from "react-cookie";


const MainEvent = () => {
    const [Allevents, setAllevents] = useState(null);
    const [EditId, setEditId] = useState(null);
    const [showUpdate, setshowUpdate] = useState(false);
    const [isSelected, setSelected] = React.useState([])
    const [status, setStatus] = useState(null);
    const [EventI, setEventI] = useState(null);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [enabledltbtn, setEnabledltbtn] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const [oldName, setoldName] = useState(); //used for updating the Maingallery name

    console.log("isAllChecked", isAllChecked);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${Backend_Url}/Event/images/all`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
            const data = await response.json();
            if (data) {
                console.log(data.groupedImages)
                setAllevents(data.groupedImages)

            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const Updatehandler = async (Id) => {
        setEditId(Id)
        setshowUpdate(!showUpdate);
    }

    // DELETE BUTTON

    const deleteHandler = async (Id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) {
            return; // Exit early if the user cancels the deletion
        }

        const deleteEvent = await axios.delete(`${Backend_Url}/Event/images/${Id}`,
            {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }
        ).then((res) => window.alert(res.data.message))
            .then(() => window.location.reload());

    }


    // SINGLE IMAGE DELETE

    const deleteSingleImage = async (Imagepath, Id) => {
        console.log(Imagepath, Id);
        const deleteSingle = await fetch(`${Backend_Url}/Event/images/single/${Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer ' + cookie.token
            },
            body: JSON.stringify({ image: Imagepath }),
        }).then((res) => console.log(res));
        window.location.reload();
    }


    // SELECT HANDLER
    const changecheck = (e, id) => {
        console.log(id)
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }


    // ALL DOWNLOAD SELECTED
    const Allselected = function (e, Alldonwload) {
        const allkeys = Object.keys(Alldonwload)
        console.log(Alldonwload, allkeys)
        if (e.target.checked) {
            allkeys.map(function (item) {
                setSelected((prev => [...prev, Alldonwload[item][0].Id]))
            })
            console.log(isSelected)
        } else {
            allkeys.map(function (key) {
                setSelected((prev) => prev = isSelected.filter((item) => item != Alldonwload[key][0].Id))
            })
            console.log(isSelected)
        }
    }


    // DELETE ALL DOWNLOAD
    const DeleteAllDownload = async function (e) {
        try {
            const confirm = window.confirm('Are you sure you want to delete all downloads')

            if (!confirm) return

            const deleteall = await fetch(`${Backend_Url}/Event/deleteALL`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                method: 'DELETE',

            }).catch((err) => console.log(err))

            if (deleteall.status == 200) {
                window.alert('All downloads deleted successfully')
                fetchData();
            } else {
                window.alert('Error deleting all downloads')
            }
        } catch (error) {
            console.log(error)
        }
    }




    const renderAlbums = () => {
        return Object.keys(Allevents)?.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc] w-[30px]`}>
                    <input
                        type="checkbox"
                        onChange={(e) => changecheck(e, Allevents[Singleitem][0].Id)}
                        checked={isSelected.includes(Allevents[Singleitem][0].Id)}
                    />
                </td>
                <td className={`w-[30px] border border-[#ccc]`}>{index + 1}</td>

                <td className="Name w-[200px] text-left px-[5px]">{Singleitem}</td>
                <td className="image-cell !bg-[#f8f8f8] border border-[#ccc]">
                    {
                        Allevents[Singleitem][0]?.Imagepath.map((item, index) => {

                            return item.length != 0 ? (
                                <>
                                    <div className={`image-div h-[60px] `}>
                                        <img src={item.Imagepath} className={`image-event w-auto shadow-md !h-[30px]`} alt="" />
                                        <button
                                            className="delete-button w-[20px] h-[20px] flex items-center justify-center p-0 text-[10px]"
                                            onClick={() => deleteSingleImage(item.Imagepath, Allevents[Singleitem][0].Id)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </>
                            ) : null
                        })
                    }
                </td>
                {/* priority */}
                <td className={`border border-[#ccc] w-[20px]`}>
                    <div>
                        {Allevents[Singleitem][0].Priority}
                    </div>
                </td>
                {/* status */}
                <td className=" !w-[100px] border border-[#ccc]">

                    <div>
                        {Allevents[Singleitem][0].Status ? <p className={`active`}>Active</p> : <p className={`inactive`}>Inactive</p>}
                    </div>

                </td>
                <td>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={() => Updatehandler(Allevents[Singleitem].map((item) => item.Id))}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deleteHandler(Allevents[Singleitem][0].Id)}
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
                {Allevents != null ? (
                    <table>
                        <thead>
                            <tr>
                                <th className={`div-dlt`}>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => Allselected(e, Allevents)}
                                        />
                                        <button
                                            className="delete-button"
                                            disabled={isSelected.length != Object.keys(Allevents).length}
                                            onClick={(e) => DeleteAllDownload(e)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Event Name</th>
                                <th>Image</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderAlbums()}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}

                <UpdateEvent show={showUpdate} onClose={() => setshowUpdate(false)} EditId={EditId} />
            </div>
        </>
    );
}

export default MainEvent