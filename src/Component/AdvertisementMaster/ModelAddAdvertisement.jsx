import React, { useMemo, useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import JoditEditor from "jodit-react";
import axios from 'axios';
import Backend_Url from "../../config/config";
import { useCookies } from "react-cookie";


const ModelAddAdvertisement = (props) => {

    const {
        Image, setImage,
        inputValues,
        setInputValues,
        isEditMode,
        fetchData
    } = props
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const editor = useRef(null);

    console.log(inputValues);

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
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result;
            setImage((prevData) => ({
                ...prevData,
                [name]: file,
                [`${name}URL`]: imageUrl
            }));
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
            let apiUrl = `${Backend_Url}/AdvertisementMaster/create`;
            let response;

            if (isEditMode) {
                console.log(formData)
                // Change API URL for update mode
                apiUrl = `${Backend_Url}/AdvertisementMaster/update/${inputValues.id}`;
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
                Category: '',
                AdvertisementName: '',
                URL: '',
                Priority: '',
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

        <div>
            <div className="Header-Category-Content">
                <div className="Category-Left-Width">
                    <div className="Flex-Input_General">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Category</label>
                            <select className="Input-Fill-Box input-width-sub" type="text" name="Category" value={inputValues.Category} onChange={handleInputChange} placeholder="">
                                <option value="completedprojects">Completed Projects</option>
                                <option value="ongoingprojects">On Going Projects</option>
                            </select>
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Advertisement Name</label>
                            <input className="Input-Fill-Box input-width-sub" type="text" name="AdvertisementName" value={inputValues.AdvertisementName} onChange={handleInputChange} placeholder="Enter Advertisement Name" />
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">URL</label>
                            <input className="Input-Fill-Box input-width-sub" type="text" name="URL" value={inputValues.URL} onChange={handleInputChange} placeholder="Enter URL" />
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image</label>
                            <input className="Input-Fill-Box input-width-sub" type="file" value={inputValues.Imagepaths} name="Imagepaths" onChange={handleImage} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Flex-Advertisement-cate">
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-name">Priority(Ex. 0,1,2,3...)</label>
                                <input className="Input-Fill-Box" type="text" name="Priority" value={inputValues.Priority} onChange={handleInputChange} placeholder="" />
                            </div>
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-name">Status</label>
                                <select className="Input-Fill-Box" type="text" name="Status" value={inputValues.Status} onChange={handleInputChange} placeholder="">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="Category-buttons">
                                {!isEditMode && (
                                    <button type="submit" className="Create-button !bg-green-500" onClick={handleFormSubmit}>
                                        Create
                                    </button>
                                )}
                                {isEditMode && (
                                    <button type="submit" className="Create-button !bg-gray-400" onClick={handleFormSubmit}>
                                        Update
                                    </button>
                                )}

                                <button type="submit" className="Create-button">
                                    <Icon icon="ri:refresh-fill" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Category-Right-width">
                    <div className="">
                        <div className="">
                            <label className="inputName-lbl lbl-width-name">Image Preview</label>
                            {Image.ImagepathsURL && (
                                <img src={Image.ImagepathsURL} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "65%", marginBottom: "15px" }}>
                <JoditEditor name=" " value={inputValues.Description} onBlur={handleDescriptionChange}
                    ref={editor}
                />
            </div>
        </div>
    );
};

export default ModelAddAdvertisement;
