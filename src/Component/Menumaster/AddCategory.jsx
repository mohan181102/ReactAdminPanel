import React, { useContext, useRef, useState } from 'react'
import "./AddCategory.css"
import { Icon } from '@iconify/react/dist/iconify.js';
import JoditEditor from 'jodit-react';
import Backend_url from '../../config/config';
import Backend_Url from '../../config/config';
import UpdateContex from '../CreateContex/CreateContex';
import { useCookies } from 'react-cookie';

const AddCategory = ({ toggle, settoggle, formtitle, page = false, GruopName = null }) => {
    const [content, setContent] = useState("")
    const [ImagePreview, setImagePreview] = useState(null)
    const [Category_sub, setCategory] = useState(null)
    const [ImageFile, setImageFile] = useState(null)
    const [Status, setStatus] = useState(false)
    const [Priority, setPriority] = useState(null)
    const [url, seturl] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const {
        UpdateMMPriority, setUpdateMMPriority,
        UpdateMMStatus, setUpdateMMStatus,
        UpdateMMId, setUpdateMMId,
        UpdateMMCategory_sub, setUpdateMMCategory_sub,
        UpdateMMURL, setUpdateMMURL,
        UpdateMMGruopName, setUpdateMMCruopName,
        UpdateMMTextArea, setUpdateTextArea,
        UpdateMMImage, setUpdateMMImage,
    } = useContext(UpdateContex)
    const editor = useRef()

    console.log(UpdateMMCategory_sub, UpdateMMGruopName, UpdateMMTextArea, UpdateMMImage)

    const field = [
        {
            name: "Category/Sub name",
            placeholder: "Category Name",
            type: "text",
            defaultValue: UpdateMMCategory_sub != null ? UpdateMMCategory_sub : null
        },
        {
            name: "url",
            placeholder: "url",
            type: "text",
            defaultValue: UpdateMMId != null ? UpdateMMURL : null
        },
        {
            name: "Image/File",
            placeholder: "Image",
            type: "file",
            defaultValue: UpdateMMImage != null ? UpdateMMImage : null
        },
        {
            name: "Priority",
            placeholder: "Priority",
            type: "number",
            defaultValue: UpdateMMPriority != null ? UpdateMMPriority : null
        },
        {
            name: "Status",
            type: "boolean",
            placeholder: "",
            defaultValue: UpdateMMStatus != null ? UpdateMMStatus : null
        },
        {
            name: "Content",
            type: "textarea",
            placeholder: null,
            defaultValue: UpdateMMTextArea != null ? UpdateMMTextArea : null
        },
        {
            name: "Image Preview",
            type: "preview",
            placeholder: null,
            defaultValue: UpdateMMImage != null ? UpdateMMImage : null
        }
    ]

    if (toggle) {
        return null;
    }

    const setImagePreviewFuction = (e) => {
        const render = e.target.files[0]
        const url = URL.createObjectURL(render);
        setImagePreview(url);
        UpdateMMId != null ? setUpdateMMImage(e.target.files[0]) : setImageFile(e.target.files[0])
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure you want to create an Menu Master?")
        if (!confirm) {
            return
        }
        console.log(content)
        try {
            const form = new FormData();
            form.append("Category_sub", Category_sub)
            form.append("URL", url)
            form.append("Image", ImageFile)
            form.append("Priority", Priority)
            form.append("Status", Status)
            form.append("GruopName", GruopName)
            form.append("TextArea", content)

            await fetch(`${Backend_Url}/MenuMaster/create/`, {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })
                .then((res) => res.status == 200 && window.alert("Successfully created!"))
            // .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
        }
    }


    const updateHandler = async () => {
        const confirm = window.confirm('Are you sure you want to update this menu?')

        if (!confirm) {
            return
        }
        try {
            const form = new FormData()
            // Category_sub, URL, Priority, GruopName, Status, Image, UpdateTextArea 
            form.append('Category_sub', UpdateMMCategory_sub)
            form.append('URL', UpdateMMURL)
            form.append('Priority', UpdateMMPriority)
            form.append('GruopName', UpdateMMGruopName)
            form.append('Status', UpdateMMStatus)
            form.append('Image', UpdateMMImage)
            form.append('UpdateTextArea', UpdateMMTextArea)
            console.log(form)
            await fetch(`${Backend_Url}/menumaster/update/${UpdateMMId}`, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })
                .then((res) => res.status == 200 && window.alert('Menu updated successfully'))
                .then((res) => window.location.reload())
                .catch((err) => window.alert('Error updating menu'))

        } catch (error) {
            console.log(error)
        }

    }


    const clearHandler = () => {
        setUpdateMMPriority(null)
        setUpdateMMStatus(null)
        setUpdateMMId(null)
        setUpdateMMCategory_sub(null)
        setUpdateMMURL(null)
        setUpdateMMCruopName(null)
        setUpdateTextArea(null)
        setUpdateMMImage(null)
        settoggle(false)
    }

    const emptyimage = () => {
        setImagePreview(null)
        setUpdateMMImage(null)
    }

    return (
        <div className={`main-add ${settoggle ? "" : "close-main-add"} flex-col z-50 overflow-auto gap-8 fixed w-full h-full top-0 left-0 py-8 flex items-start justify-center`}>
            <div className="w-11/12 max-w-2xl absolute top-[10px] bg-white rounded-lg shadow-lg flex items-center justify-between px-8 py-4">
                <h1 className="text-xl font-bold bg-gray-600 text-white px-4 py-2 rounded-md">{formtitle || "Add Category"}</h1>
                <button className="p-2 bg-red-500 rounded-md text-white text-xl" onClick={() => settoggle()}>
                    <Icon icon="raphael:cross" />
                </button>
            </div>
            <form onSubmit={(e) => handlesubmit(e)} className="w-11/12 max-w-2xl absolute top-[120px] bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {field.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2">{item.name}</label>
                        {item.type === "text" && (
                            <input
                                defaultValue={item.name === "url" && UpdateMMId == null ? "/page" : UpdateMMId != null ? item.defaultValue : ""}
                                onChange={(e) => {
                                    if (item.name === "Category/Sub name") {
                                        UpdateMMId != null ? setUpdateMMCategory_sub(e.target.value) : setCategory(e.target.value);
                                    } else if (item.name === "url") {
                                        UpdateMMId != null ? setUpdateMMURL(e.target.value) : seturl(e.target.value);
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                type={item.type}
                                placeholder={item.placeholder}
                            />
                        )}
                        {item.type === "number" && (
                            <input
                                defaultValue={UpdateMMId != null ? item.defaultValue : ""}
                                onChange={(e) => UpdateMMId != null ? setUpdateMMPriority(e.target.value) : setPriority(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                type={item.type}
                                placeholder={item.placeholder}
                            />
                        )}
                        {item.type === "file" && (
                            <input
                                onChange={(e) => setImagePreviewFuction(e)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                type={item.type}
                                placeholder={UpdateMMId != null ? item.placeholder : ""}
                            />
                        )}
                        {item.type === "boolean" && (
                            <select
                                onChange={(e) => e.target.value === "True" ? UpdateMMId != null ? setUpdateMMStatus(true) : setStatus(true) : UpdateMMId != null ? setUpdateMMStatus(false) : setStatus(false)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            >
                                <option>{UpdateMMId != null ? UpdateMMStatus ? "True" : "False" : "--select--"}</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        )}
                        {item.type === "textarea" && (
                            <JoditEditor
                                ref={editor}
                                value={UpdateMMId != null ? UpdateMMTextArea : content}
                                tabIndex={1}
                                onBlur={(newContent) => UpdateMMId != null ? setUpdateTextArea(content) : setContent(newContent)}
                                className="w-full h-32 border border-gray-300 rounded-md"
                            />
                        )}
                        {item.type === "preview" && (
                            <React.Fragment>

                                <img
                                    className="w-full h-32 object-cover border border-gray-300 rounded-md"
                                    src={UpdateMMId != null ? UpdateMMImage : ImagePreview}
                                    alt="Preview"
                                />
                                <button onClick={() => emptyimage()} type='button' className={` cursor-pointer hover:text-red-400 flex items-center justify-center font-[500]`}>
                                    Clear
                                </button>
                            </React.Fragment>
                        )}
                    </div>
                ))}
                <div className="col-span-full flex flex-col items-center gap-4 mt-6">
                    <button
                        type={UpdateMMId == null ? "submit" : "button"}
                        onClick={() => UpdateMMId != null ? updateHandler() : null}
                        className="px-6 py-2 bg-green-500 rounded-md text-white text-lg"
                    >
                        {UpdateMMId != null ? "UPDATE" : "CREATE"}
                    </button>
                    {UpdateMMId != null && (
                        <button
                            onClick={(e) => clearHandler(e)}
                            className="px-6 py-2 bg-gray-500 rounded-md text-white text-lg"
                        >
                            CLEAR
                        </button>
                    )}
                </div>
            </form>
        </div>

    )
}

export default AddCategory