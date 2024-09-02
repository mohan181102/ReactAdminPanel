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
            defaultValue: UpdateMMURL != null ? UpdateMMURL : null
        },
        {
            name: "Image",
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
                .then(() => window.location.reload())
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


    return (
        <div className={`main-add ${settoggle == false ? "close-main-add" : ""} flex-col z-[50000] overflow-scroll gap-[30px] fixed w-screen overscroll-auto py-[30px] h-screen top-0 left-0 flex items-center justify-start pt-[40px]`}>
            <div className={`w-[90%] rounded-md flex items-center justify-between px-[30px] py-[20px] bg-white`}>
                <h1 className={`w-auto h-auto px-[10px] py-[5px] rounded-md text-xl font-bold bg-[#bbbbbb] text-white flex items-center justify-center`}>{formtitle ? formtitle : "Add Category"}</h1>
                <button className={`w-auto h-auto p-[5px] bg-red-500 rounded-md text-white text-xl font-bold`} onClick={() => settoggle()}>
                    <Icon icon="raphael:cross" />
                </button>
            </div>
            <form onSubmit={(e) => handlesubmit(e)} className={`w-[90%]   rounded-md min-h-[50vh] max-h-max flex flex-wrap items-start justify-center gap-[30px] px-[30px] py-[20px] bg-white `}>


                {
                    field.map((item) => {
                        return (
                            <>

                                {item.type == "text" ? <div className={`min-w-[150px] h-[60px] rounded-md overflow-hidden bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-center flex-col `}>
                                    <label className={`w-full h-[40%] py-[10px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                    <input defaultValue={item.name == "url" ? "/page" : UpdateMMId != null ? item.defaultValue : null} onChange={(e) => item.name == "Category/Sub name" ? UpdateMMId != null ? setUpdateMMCategory_sub(e.target.value) : setCategory(e.target.value) : item.name == "url" ? UpdateMMId != null ? setUpdateMMURL(e.target.value) : seturl(e.target.value) : null} className={`input-addcotegory !w-full h-[55%] py-[10px]  text-[15px] font-[400]`} type={item.type} placeholder={item.placeholder} />
                                </div> : ""}
                                {
                                    item.type == "number" ? <div className={`min-w-[100px] h-[60px] rounded-md overflow-hidden bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-center flex-col `}>
                                        <label className={`w-full h-[40%] py-[10px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                        <input defaultValue={UpdateMMId != null ? item.defaultValue : null} onChange={(e) => UpdateMMId != null ? setUpdateMMPriority(e.target.value) : setPriority(e.target.value)} className={`input-addcotegory !w-full h-[55%] py-[10px]  text-[15px] font-[400]`} type={item.type} placeholder={item.placeholder} />
                                    </div> : ""
                                }
                                {
                                    item.type == "file" ? <div className={`min-w-[100px] min-h-[60px] rounded-md overflow-hidden bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-center flex-col `}>
                                        <label className={`w-full h-[40%] py-[5px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                        <input onChange={(e) => { setImagePreviewFuction(e) }} className={`input-addcotegory w-full bg-white h-[55%] flex items-center justify-center  text-[15px] font-[400]`} type={item.type} placeholder={UpdateMMId != null ? item.placeholder : null} />
                                    </div> : ""
                                }
                                {
                                    item.type == "boolean" && <div className={`min-w-[100px] h-[60px] rounded-md overflow-hidden bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-center flex-col `}>
                                        <label className={`w-full h-[40%] py-[10px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                        <select onChange={(e) => e.target.value == "True" ? UpdateMMId != null ? setUpdateMMStatus(true) : setStatus(true) : UpdateMMId != null ? setUpdateMMStatus(false) : setStatus(false)}>
                                            <option>{UpdateMMId != null ? UpdateMMStatus ? "True" : "False" : "--select--"}</option>
                                            <option>True</option>
                                            <option>False</option>
                                        </select>
                                    </div>
                                }
                                {
                                    item.type == "textarea" && <div className={`w-[40%] min-h-[150px] rounded-md overflow-y-auto bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-center flex-col `}>
                                        <label className={`w-full h-[40%] py-[10px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={UpdateMMId != null ? UpdateMMTextArea : content}

                                            tabIndex={1}
                                            onBlur={(newContent) => UpdateMMId != null ? setUpdateTextArea(content) : setContent(newContent)}
                                            className={`w-full`}
                                        />
                                    </div>

                                }
                                {
                                    item.type == "preview" && <div className={`w-[40%] min-h-[150px] rounded-md overflow-hidden bg-[#bbbbbb] px-[10px] py-[5px] flex items-center justify-start flex-col `}>
                                        <label className={`w-full h-[40%] py-[10px] flex items-center justify-start text-[15px] font-[400]`}>{item.name}</label>
                                        <img className={`w-[100%] max-h-[200px] overflow-hidden bg-white`} src={UpdateMMId != null ? UpdateMMImage : ImagePreview} alt="--Preview--" />
                                    </div>
                                }

                            </>
                        )
                    })

                }


                <div className={`w-auto h-auto flex flex-col items-center right-[20px] bottom-[20px] justify-center gap-[20px]`}>
                    <button type={UpdateMMId == null ? "submit" : "button"} onClick={() => UpdateMMId != null ? updateHandler() : null} className={`w-auto h-auto px-[20px] py-[10px] bg-green-500 bottom-[20px] right-[20px] rounded-md text-white `}>
                        {UpdateMMId != null ? "UPDATE" : "CREATE"}
                    </button>
                    {
                        UpdateMMId != null ?
                            <button onClick={(e) => clearHandler(e)} className={`w-auto h-auto  px-[20px] py-[10px] bg-gray-500   rounded-md text-white `}>CLEAR</button> : null
                    }
                </div>

            </form>
        </div>
    )
}

export default AddCategory