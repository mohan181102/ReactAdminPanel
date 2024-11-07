import React, { useContext, useRef, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js';
import JoditEditor from 'jodit-react';
import Backend_url from '../../config/config';
import Backend_Url from '../../config/config';
import UpdateContex from '../CreateContex/CreateContex';
import { useCookies } from 'react-cookie';

const AddPricemaster = ({ toggle, settoggle, formtitle, page = false, GruopName = null }) => {
    const [content, setContent] = useState("")
    const [ImagePreview, setImagePreview] = useState(null)
    const [Category_sub, setCategory] = useState(null)
    const [ImageFile, setImageFile] = useState(null)
    const [Status, setStatus] = useState(false)
    const [Priority, setPriority] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const [url, seturl] = useState(null)
    const [PlanName, setPlanName] = useState(null)
    const {
        UpdatePMId, setUpdatePMId,
        UpdatePMImage, setUpdatePMImage,
        UpdatePMTextarea, setUpdatePMTextArea,
        UpdatePMUrl, setUpdatePMUrl,
        UpdatePMStatus, setUpdatePMStatus,
        UpdatePMPriority, setUpdatePMPriority,
        UpdatePMPlanName, setUpdatePMPlanName,
        UpdatePricemasterCategory, setUpdatePricemasterCategory,
        UpdatePMGruopName, setUpdatePMGruopName,
    } = useContext(UpdateContex)
    const editor = useRef()

    // console.log(UpdateMMCategory_sub, UpdateMMGruopName, UpdateMMTextArea, UpdateMMImage)

    const field = [
        {
            name: "Category Name",
            placeholder: "Category Name",
            type: "option",
            defaultValue: UpdatePMId != null ? UpdatePricemasterCategory : null
        },
        {
            name: "url",
            placeholder: "url",
            type: "text",
            defaultValue: UpdatePMUrl != null ? UpdatePMUrl : null
        },
        {
            name: 'PlanName',
            placeholder: "Plan Name",
            type: "text",
            defaultValue: UpdatePMPlanName != null ? UpdatePMPlanName : null
        },
        {
            name: "Image",
            placeholder: "Image",
            type: "file",
            defaultValue: UpdatePMImage != null ? UpdatePMImage : null
        },
        {
            name: "Priority",
            placeholder: "Priority",
            type: "number",
            defaultValue: UpdatePMPriority != null ? UpdatePMPriority : null
        },
        {
            name: "Status",
            type: "boolean",
            placeholder: "",
            defaultValue: UpdatePMStatus != null ? UpdatePMStatus : null
        },
        {
            name: "Content",
            type: "textarea",
            placeholder: null,
            defaultValue: UpdatePMTextarea != null ? UpdatePMTextarea : null
        },
        {
            name: "Image Preview",
            type: "preview",
            placeholder: null,
            defaultValue: UpdatePMImage != null ? UpdatePMImage : null
        }
    ]

    if (toggle) {
        return null;
    }

    const setImagePreviewFuction = (e) => {
        const render = e.target.files[0]
        const url = URL.createObjectURL(render);
        setImagePreview(url);
        UpdatePMId != null ? setUpdatePMImage(e.target.files[0]) : setImageFile(e.target.files[0])
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure you want to create an Menu Master?")
        if (!confirm) {
            return
        }
        console.log(content)
        // Categoery, PlanName, Priority, Status, URL, TextArea, GruopName
        try {
            const form = new FormData();
            form.append("Categoery", Category_sub)
            form.append("PlanName", PlanName)
            form.append("URL", url)
            form.append("Image", ImageFile)
            form.append("Priority", Priority)
            form.append("Status", Status)
            form.append("GruopName", GruopName)
            form.append("TextArea", content)

            await fetch(`${Backend_Url}/pricemaster/create/`, {
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
            // UpdateCategoery, UpdatePlanName, UpdatePriority, UpdateStatus, UpdateURL, UpdateTextArea, UpdateGruopName, UpdateImage
            form.append('UpdateCategoery', UpdatePricemasterCategory)
            form.append('UpdateURL', UpdatePMUrl)
            form.append('UpdatePriority', UpdatePMPriority)
            form.append('UpdatePlanName', UpdatePMPlanName)
            form.append('UpdateGruopName', UpdatePMGruopName)
            form.append('UpdateStatus', UpdatePMStatus)
            form.append('UpdateImage', UpdatePMImage)
            form.append('UpdateTextArea', UpdatePMTextarea)
            console.log(form)
            await fetch(`${Backend_Url}/pricemaster/update/${UpdatePMId}`, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: form
            })
                .then((res) => res.status == 200 && window.alert('PriceMaster updated successfully'))
                .then((res) => window.location.reload())
                .catch((err) => window.alert('Error updating pricemaster'))

        } catch (error) {
            console.log(error)
        }

    }


    const clearHandler = () => {
        setUpdatePMId(null)
        setUpdatePMImage(null)
        setUpdatePMTextArea(null)
        setUpdatePMUrl(null)
        setUpdatePMStatus(null)
        setUpdatePMPriority(null)
        setUpdatePMPlanName(null)
        setUpdatePricemasterCategory(null)
        setUpdatePMGruopName(null)
    }


    // ALL OPTION
    const option = [
        "--Select--",
        "About Us",
        "About Us --> About Industry",
        "About Us --> Milestone",
        "About Us --> Mission",
        "About Us --> Quality",
        "About Us --> Recycle Waste Water",
        "About Us --> Vision",
        "Clients",
        "Contact Us",
        "Gallery",
        "Home",
        "Infrastructure",
        "Our Network",
        "Products",
        "Services --> Facilities in NDT",
        "Services --> Facilities Remnant Life Assessment",
        "Services --> Facilities Third Party Inspection",
        "Services --> List of Equipments And Machine",
        "Services --> Trainings",
        "Services --> List of Job Already Carried Out",
        "Services --> Major Customers",
        "Services --> Qualification And Experience of Technicians"
    ]


    return (
        // <div className={`main-add ${settoggle === false ? "close-main-add" : ""} flex-col   z-[200] overflow-y-auto gap-8 fixed w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 overscroll-auto py-8 h-full top-[100px]  flex items-center justify-center bg-gray-100`}>
        //     <div className="w-full rounded-lg shadow-lg bg-white p-6">
        //         <div className="flex items-center justify-between mb-6">
        //             <h1 className="text-xl font-bold bg-gray-800 text-white py-2 px-4 rounded-md">{formtitle || "Add Category"}</h1>
        //             <button className="p-2 bg-red-600 rounded-full text-white text-lg" onClick={() => settoggle()}>
        //                 <Icon icon="raphael:cross" />
        //             </button>
        //         </div>

        //         <form onSubmit={handlesubmit} className="space-y-6">
        //             {field.map((item, index) => {
        //                 let inputElement;

        //                 switch (item.type) {
        //                     case "text":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <input
        //                                     defaultValue={
        //                                         item.name === "url" ? "/page" :
        //                                             item.name === "PlanName" ? UpdatePMId != null ? UpdatePMPlanName : "" :
        //                                                 ""
        //                                     }
        //                                     onChange={(e) => {
        //                                         if (item.name === "PlanName") {
        //                                             UpdatePMId != null ? setUpdatePMPlanName(e.target.value) : setPlanName(e.target.value);
        //                                         } else if (item.name === "url") {
        //                                             UpdatePMId != null ? setUpdatePMUrl(e.target.value) : seturl(e.target.value);
        //                                         }
        //                                     }}
        //                                     className="border border-gray-300 rounded-md p-2 text-sm"
        //                                     type={item.type}
        //                                     placeholder={item.placeholder}
        //                                 />
        //                             </div>
        //                         );
        //                         break;
        //                     case "option":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">Category</label>
        //                                 <select
        //                                     onChange={(e) => {
        //                                         UpdatePMId != null ? setUpdatePricemasterCategory(e.target.value) : setCategory(e.target.value);
        //                                     }}
        //                                     className="border border-gray-300 rounded-md p-2 text-sm"
        //                                 >
        //                                     {UpdatePMId != null && <option>{UpdatePricemasterCategory}</option>}
        //                                     {option.map((optionItem, i) => (
        //                                         <option key={i}>{optionItem}</option>
        //                                     ))}
        //                                 </select>
        //                             </div>
        //                         );
        //                         break;
        //                     case "number":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <input
        //                                     defaultValue={UpdatePMId != null ? UpdatePMPriority : ""}
        //                                     onChange={(e) => {
        //                                         UpdatePMId != null ? setUpdatePMPriority(e.target.value) : setPriority(e.target.value);
        //                                     }}
        //                                     className="border border-gray-300 rounded-md p-2 text-sm"
        //                                     type={item.type}
        //                                     placeholder={item.placeholder}
        //                                 />
        //                             </div>
        //                         );
        //                         break;
        //                     case "file":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <input
        //                                     onChange={e => setImagePreviewFuction(e)}
        //                                     className="border border-gray-300 rounded-md p-2 text-sm"
        //                                     type={item.type}
        //                                 />
        //                             </div>
        //                         );
        //                         break;
        //                     case "boolean":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <select
        //                                     onChange={(e) => {
        //                                         e.target.value === "True" ? UpdatePMId != null ? setUpdatePMStatus(true) : setStatus(true) : UpdatePMId != null ? setUpdatePMStatus(false) : setStatus(false);
        //                                     }}
        //                                     className="border border-gray-300 rounded-md p-2 text-sm"
        //                                 >
        //                                     <option>{UpdatePMId != null ? (UpdatePMStatus ? "True" : "False") : "--select--"}</option>
        //                                     <option>True</option>
        //                                     <option>False</option>
        //                                 </select>
        //                             </div>
        //                         );
        //                         break;
        //                     case "textarea":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <JoditEditor
        //                                     ref={editor}
        //                                     value={UpdatePMId != null ? UpdatePMTextarea : content}
        //                                     tabIndex={1}
        //                                     onBlur={newContent => UpdatePMId != null ? setUpdatePMTextArea(content) : setContent(newContent)}
        //                                     className="w-full border border-gray-300 rounded-md p-2 text-sm"
        //                                 />
        //                             </div>
        //                         );
        //                         break;
        //                     case "preview":
        //                         inputElement = (
        //                             <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
        //                                 <label className="text-sm font-medium">{item.name}</label>
        //                                 <img
        //                                     className="w-full h-auto max-h-60 object-cover rounded-md"
        //                                     src={UpdatePMId != null ? UpdatePMImage : ImagePreview}
        //                                     alt="--Preview--"
        //                                 />
        //                             </div>
        //                         );
        //                         break;
        //                     default:
        //                         inputElement = null;
        //                 }

        //                 return inputElement;
        //             })}

        //             <div className="flex justify-end space-x-4">
        //                 <button
        //                     type={UpdatePMId == null ? "submit" : "button"}
        //                     onClick={() => UpdatePMId != null ? updateHandler() : null}
        //                     className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        //                 >
        //                     {UpdatePMId != null ? "UPDATE" : "CREATE"}
        //                 </button>
        //                 <button
        //                     type={UpdatePMId == null ? "submit" : "button"}
        //                     onClick={() => settoggle(false)}
        //                     className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
        //                 >
        //                     CANCEL
        //                 </button>

        //                 {UpdatePMId != null && (

        //                     <button
        //                         onClick={clearHandler}
        //                         className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
        //                     >
        //                         CLEAR
        //                     </button>
        //                 )}
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className={`main-add ${settoggle === false ? "close-main-add" : ""} flex-col z-[200] overflow-y-auto gap-8 fixed w-[100vw] h-[100vh] sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 overscroll-auto py-8  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-100 shadow-lg rounded-lg`}>
            <div className="w-[70vw] h-[80vh] overflow-y-scroll rounded-lg shadow-lg bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold bg-gray-800 text-white py-2 px-4 rounded-md">{formtitle || "Add Category"}</h1>
                    <button className="p-2 bg-red-600 rounded-full text-white text-lg" onClick={() => settoggle()}>
                        <Icon icon="raphael:cross" />
                    </button>
                </div>

                <form onSubmit={handlesubmit} className="space-y-6">
                    {field.map((item, index) => {
                        let inputElement;

                        switch (item.type) {
                            case "text":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <input
                                            defaultValue={
                                                item.name === "url" ? "/page" :
                                                    item.name === "PlanName" ? UpdatePMId != null ? UpdatePMPlanName : "" : ""
                                            }
                                            onChange={(e) => {
                                                if (item.name === "PlanName") {
                                                    UpdatePMId != null ? setUpdatePMPlanName(e.target.value) : setPlanName(e.target.value);
                                                } else if (item.name === "url") {
                                                    UpdatePMId != null ? setUpdatePMUrl(e.target.value) : seturl(e.target.value);
                                                }
                                            }}
                                            className="border border-gray-300 rounded-md p-2 text-sm"
                                            type={item.type}
                                            placeholder={item.placeholder}
                                        />
                                    </div>
                                );
                                break;
                            case "option":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">Category</label>
                                        <select
                                            onChange={(e) => {
                                                UpdatePMId != null ? setUpdatePricemasterCategory(e.target.value) : setCategory(e.target.value);
                                            }}
                                            className="border border-gray-300 rounded-md p-2 text-sm"
                                        >
                                            {UpdatePMId != null && <option>{UpdatePricemasterCategory}</option>}
                                            {option.map((optionItem, i) => (
                                                <option key={i}>{optionItem}</option>
                                            ))}
                                        </select>
                                    </div>
                                );
                                break;
                            case "number":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <input
                                            defaultValue={UpdatePMId != null ? UpdatePMPriority : ""}
                                            onChange={(e) => {
                                                UpdatePMId != null ? setUpdatePMPriority(e.target.value) : setPriority(e.target.value);
                                            }}
                                            className="border border-gray-300 rounded-md p-2 text-sm"
                                            type={item.type}
                                            placeholder={item.placeholder}
                                        />
                                    </div>
                                );
                                break;
                            case "file":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <input
                                            onChange={e => setImagePreviewFuction(e)}
                                            className="border border-gray-300 rounded-md p-2 text-sm"
                                            type={item.type}
                                        />
                                    </div>
                                );
                                break;
                            case "boolean":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <select
                                            onChange={(e) => {
                                                e.target.value === "True" ? UpdatePMId != null ? setUpdatePMStatus(true) : setStatus(true) : UpdatePMId != null ? setUpdatePMStatus(false) : setStatus(false);
                                            }}
                                            className="border border-gray-300 rounded-md p-2 text-sm"
                                        >
                                            <option>{UpdatePMId != null ? (UpdatePMStatus ? "True" : "False") : "--select--"}</option>
                                            <option>True</option>
                                            <option>False</option>
                                        </select>
                                    </div>
                                );
                                break;
                            case "textarea":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={UpdatePMId != null ? UpdatePMTextarea : content}
                                            tabIndex={1}
                                            onBlur={newContent => UpdatePMId != null ? setUpdatePMTextArea(content) : setContent(newContent)}
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                        />
                                    </div>
                                );
                                break;
                            case "preview":
                                inputElement = (
                                    <div key={index} className="flex flex-col space-y-2 bg-gray-200 p-4 rounded-lg">
                                        <label className="text-sm font-medium">{item.name}</label>
                                        <img
                                            className="w-full h-auto max-h-60 object-cover rounded-md"
                                            src={UpdatePMId != null ? UpdatePMImage : ImagePreview}
                                            alt="--Preview--"
                                        />
                                    </div>
                                );
                                break;
                            default:
                                inputElement = null;
                        }

                        return inputElement;
                    })}

                    <div className="flex justify-end space-x-4">
                        <button
                            type={UpdatePMId == null ? "submit" : "button"}
                            onClick={() => UpdatePMId != null ? updateHandler() : null}
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                        >
                            {UpdatePMId != null ? "UPDATE" : "CREATE"}
                        </button>
                        <button
                            type={UpdatePMId == null ? "submit" : "button"}
                            onClick={() => settoggle(false)}
                            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                        >
                            CANCEL
                        </button>

                        {UpdatePMId != null && (
                            <button
                                onClick={clearHandler}
                                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                            >
                                CLEAR
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddPricemaster