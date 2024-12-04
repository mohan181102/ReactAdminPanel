import React, { useMemo, useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import JoditEditor from "jodit-react";
import axios from 'axios';
import Backend_Url from "../../config/config";
import { useCookies } from "react-cookie";


const ModalAddCategory = (props) => {
    const {
        Image, setImage,
        inputValues,
        setInputValues,
        isEditMode,
        fetchData
    } = props
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const editor = useRef(null);

    console.log(inputValues.id);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDescriptionChange = (value) => {
        setInputValues((prevData) => ({
            ...prevData,
            Description: value
        }));
    };


    const handleImage = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        // Read the file and set the image URL
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result;
            setImage((prevData) => ({
                ...prevData,
                [name]: file,
                [`${name}URL`]: imageUrl
            }));
            // Store selected logo URL in localStorage
            localStorage.setItem('selectedImage', imageUrl);
        };
        reader.readAsDataURL(file);
    };



    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Prepare form data to be sent
        const formData = new FormData();
        Object.keys(inputValues).forEach(key => {
            formData.append(key, inputValues[key]);
        });
        formData.append('Image', Image.Imagepaths);

        try {
            let apiUrl = `${Backend_Url}/productCategoryMaster/create`;
            let response;

            if (isEditMode) {
                // Change API URL for update mode
                apiUrl = `${Backend_Url}/productCategoryMaster/update/${inputValues.id}`;
                response = await axios.put(apiUrl, formData, {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                });
                alert("Update Successfully");
            } else {
                response = await axios.post(apiUrl, formData, {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                });
                alert(response.data.message);
            }

            console.log('API Response:', response.data);

            // Clear input values and image after successful save or update
            setInputValues({
                CategoryName: '',
                URL: '',
                Priority: '',
                ShowOnCategory: true,
                ShowCategoryList: true,
                Status: true,
                Description: ''
            });
            setImage({
                Imagepaths: ''
            });

            // Fetch updated data
            fetchData();

        } catch (error) {
            console.error('Error creating/updating entity:', error);
        }
    };

    return (

        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isEditMode ? "Edit Category" : "Create Category"}</h2>
                </div>
                <div className="modal-body">
                    <div className="form-group !items-start">
                        <div className="input-row">
                            <div className="input-box">
                                <label htmlFor="CategoryName" className="input-label">Category/Sub Category</label>
                                <input
                                    id="CategoryName"
                                    className="input-field"
                                    type="text"
                                    name="CategoryName"
                                    value={inputValues.CategoryName}
                                    onChange={handleInputChange}
                                    placeholder=""
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="URL" className="input-label">URL</label>
                                <input
                                    id="URL"
                                    className="input-field"
                                    type="text"
                                    name="URL"
                                    value={inputValues.URL}
                                    onChange={handleInputChange}
                                    placeholder=""
                                />
                            </div>
                            <div className="input-box ">
                                <label htmlFor="Imagepaths" className="input-label">Image</label>
                                <input
                                    id="Imagepaths"
                                    className="input-field"
                                    type="file"
                                    name="Imagepaths"
                                    onChange={handleImage}
                                />
                            </div>
                        </div>
                        <div className="input-row !h-[250px] mx-[10px]">
                            <div className="input-box">
                                <label htmlFor="Priority" className="input-label">Priority</label>
                                <input
                                    id="Priority"
                                    className="input-field"
                                    type="text"
                                    name="Priority"
                                    value={inputValues.Priority}
                                    onChange={handleInputChange}
                                    placeholder=""
                                />
                            </div>
                            <div className="input-box">
                                <label htmlFor="ShowOnCategory" className="input-label">Show_on_cat</label>
                                <select
                                    id="ShowOnCategory"
                                    className="input-field"
                                    name="ShowOnCategory"
                                    value={inputValues.ShowOnCategory}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-row !h-[250px] mx-[10px]">
                            <div className="input-box">
                                <label htmlFor="ShowCategoryList" className="input-label">Show_catList</label>
                                <select
                                    id="ShowCategoryList"
                                    className="input-field"
                                    name="ShowCategoryList"
                                    value={inputValues.ShowCategoryList}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label htmlFor="Status" className="input-label">Status</label>
                                <select
                                    id="Status"
                                    className="input-field"
                                    name="Status"
                                    value={inputValues.Status}
                                    onChange={handleInputChange}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer !h-auto mx-[10px]">
                            <button
                                type="submit"
                                className={`action-button ${!isEditMode ? 'create-button bg-green-500' : 'update-button bg-gray-400 '}`}
                                onClick={handleFormSubmit}
                            >
                                {isEditMode ? "Update" : "Create"}
                            </button>
                            <button
                                type="button"
                                className="refresh-button !bg-[#ccc]"
                                onClick={() => {
                                    setInputValues({
                                        CategoryName: '',
                                        URL: '',
                                        Priority: '',
                                        ShowOnCategory: true,
                                        ShowCategoryList: true,
                                        Status: true,
                                        Description: ''
                                    });
                                }}
                            >
                                <Icon icon="ri:refresh-fill" />
                            </button>
                        </div>
                    </div>
                    <div className="image-preview-container">
                        <label htmlFor="ImagePreview" className="input-label">Image Preview</label>
                        {Image.Imagepaths && (
                            <img
                                id="ImagePreview"
                                src={Image.Imagepaths}
                                alt="Selected Image"
                                className="image-preview"
                            />
                        )}
                    </div>
                    <div className="editor-container">
                        <JoditEditor
                            name="Description"
                            value={inputValues.Description}
                            onBlur={handleDescriptionChange}
                            ref={editor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddCategory;
