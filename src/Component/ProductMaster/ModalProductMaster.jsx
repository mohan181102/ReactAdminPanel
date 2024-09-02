import React, { useMemo, useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import JoditEditor from "jodit-react";
import axios from 'axios';
import Backend_Url from "../../config/config";
import img from "../../Assests/Images/images.png";
import { useCookies } from "react-cookie";

const ModalProductMaster = (props) => {
    const readImageFile = new FileReader();
    const {
        Image, setImage,
        inputValues,
        setInputValues,
        isEditMode,
        fetchData,
        closeModal,
        IsmodalOpen,
        productId,
        handleInputChange
    } = props

    const editor = useRef(null);
    const [isProductCreated, setIsProductCreated] = useState(false);
    const [cookie, setcookie, removeCookie] = useCookies(['token'])


    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputValues((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

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
                //[`${name}URL`]: imageUrl
            }));
            console.log(Image)

            // Optionally store selected image URL in localStorage
            //localStorage.setItem(`selectedImage`, imageUrl);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // console.log(Image);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const isValid = validateForm(inputValues);
        if (!isValid) {
            alert("Please fill out all required fields.");
            return;
        }

        // Prepare form data to be sent
        const formData = new FormData();
        Object.keys(inputValues).forEach(key => {
            formData.append(key, inputValues[key]);
        });
        // formData.append('Image', Image.Imagepaths);
        Object.keys(Image).forEach((key) => {
            if (Image[key] !== null) {
                formData.append(`${key}`, Image[key]);
            }
        });

        try {
            let apiUrl = `${Backend_Url}/ProductMaster/create`;
            let response;

            if (isEditMode) {
                // Change API URL for update mode
                apiUrl = `${Backend_Url}/ProductMaster/update/${inputValues.id}`;
                response = await axios.put(apiUrl, formData,
                    {
                        headers: {
                            'authorization': 'Bearer ' + cookie.token
                        }
                    }
                );
                alert("Update Successfully");
                setInputValues({
                    Category: '',
                    ProductName: '',
                    URL: '',
                    Priority: '',
                    Status: true,
                    Price: '',
                    Details2: '',
                    Details3: '',
                    Details4: '',
                    Details5: '',
                    Description: ''
                });
                setImage({
                    Image1: '',
                    Image2: '',
                    Image3: '',
                    Image4: '',
                    Image5: '',
                    Image6: '',
                    Image7: '',
                    Image8: '',
                    Image9: ''
                });


                fetchData();
            } else {
                response = await axios.post(apiUrl, formData, {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                });
                alert(response.data.message);
                setInputValues({
                    Category: '',
                    ProductName: '',
                    URL: '',
                    Priority: '',
                    Status: true,
                    Price: '',
                    Details2: '',
                    Details3: '',
                    Details4: '',
                    Details5: '',
                    Description: ''
                });
                setImage({
                    Image1: '',
                    Image2: '',
                    Image3: '',
                    Image4: '',
                    Image5: '',
                    Image6: '',
                    Image7: '',
                    Image8: '',
                    Image9: ''
                });



                // Fetch updated data
                fetchData();

            }
            console.log('API Response:', response.data);
            // Clear input values and image after successful save or update
        } catch (error) {
            console.error('Error creating/updating entity:', error);
        }
    };

    // Function to validate form inputs
    const validateForm = (inputValues) => {
        for (let key in inputValues) {
            debugger
            console.log(key)
            if (!inputValues[key]) {
                console.warn(`Validation failed for ${key}`);
                return false;
            }
        }
        // Optionally, you can also validate images if they are required
        // for (let key in Image) {
        //     if (Image[key] !== null && Image[key] === '') {
        //         console.warn(`Validation failed for ${key}`);
        //         return false;
        //     }
        // }
        return true;
    };

    const deleteImage = async (productId, imageId) => {
        // Ask for confirmation before deleting the image
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) {
            return; // If the user clicks "Cancel", exit the function
        }

        try {
            const response = await axios.delete(`${Backend_Url}/ProductMaster/${productId}/images/${imageId}`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            );
            console.log(response.data);

            // Update the state to remove the deleted image immediately
            setImage((prevData) => ({
                ...prevData,
                [`Image${imageId}`]: null,  // Set the image data to null for the specified imageId
            }));

            alert("Image deleted");

            // Optionally fetch the updated data if necessary
            //   fetchData();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    console.log(inputValues)

    return (

        <div>
            <div className="Header-Category-Content">
                <div className="Category-Left-Width">
                    <div className="Flex-Input_General">
                        <div className="Flex-Second-ProductMaster">
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-name">Category</label>
                                <select className="Input-Fill-Box" type="text" name="Category" value={inputValues.Category} onChange={handleInputChange} placeholder="">
                                    <option value="completedprojects">Completed Projects</option>
                                    <option value="ongoingprojects">On Going Projects</option>
                                </select>
                            </div>
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-name">Product Name</label>
                                <input className="Input-Fill-Box" type="text" name="ProductName" value={inputValues.ProductName} onChange={handleInputChange} placeholder="" />
                            </div>
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category lbl-width-product">URL</label>
                            <input className="Input-Fill-Box input-width-promaster" type="text" name="URL" value={inputValues.URL} onChange={handleInputChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Flex-Second-ProductMaster">
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-product  ">Priority (Ex. 0,1,2,3...)</label>
                                <input className="Input-Fill-Box" type="text" name="Priority" value={inputValues.Priority} onChange={handleInputChange} placeholder="" />
                            </div>
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-product">Status</label>
                                <select className="Input-Fill-Box" type="text" name="Status" value={inputValues.Status} onChange={handleInputChange} placeholder="">
                                    <option value={inputValues.Status ? "true" : "false"}>{inputValues.Status !== '' ? inputValues.Status ? "True" : "False" : "Select"}</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        <div className="Flex-Second-ProductMaster">
                            <div className="Input_Box-Category">
                                <label className="inputName-lbl lbl-Text-Category lbl-width-product">Price</label>
                                <input className="Input-Fill-Box" type="text" name="Price" value={inputValues.Price} onChange={handleInputChange} placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category lbl-width-product">Details 2</label>
                            <input className="Input-Fill-Box input-width-promaster" type="text" name="Details2" value={inputValues.Details2} onChange={handleInputChange} placeholder="Details 2" />
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category lbl-width-product">Details 3</label>
                            <input className="Input-Fill-Box input-width-promaster" type="text" name="Details3" value={inputValues.Details3} onChange={handleInputChange} placeholder="Details 3" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category lbl-width-product">Details 4</label>
                            <input className="Input-Fill-Box input-width-promaster" type="text" name="Details4" value={inputValues.Details4} onChange={handleInputChange} placeholder="Details 4" />
                        </div>
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category lbl-width-product">Details 5</label>
                            <input className="Input-Fill-Box input-width-promaster" type="text" name="Details5" value={inputValues.Details5} onChange={handleInputChange} placeholder="Details 5" />
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
                                <button type="submit" className="Create-button" onClick={handleFormSubmit}>
                                    Update
                                </button>
                            )}

                            <button type="submit" onClick={() => {
                                setInputValues({
                                    Category: '',
                                    ProductName: '',
                                    URL: '',
                                    Priority: '',
                                    Status: true,
                                    Price: '',
                                    Details2: '',
                                    Details3: '',
                                    Details4: '',
                                    Details5: '',
                                    Description: ''
                                });

                                setImage({
                                    Image1: '',
                                    Image2: '',
                                    Image3: '',
                                    Image4: '',
                                    Image5: '',
                                    Image6: '',
                                    Image7: '',
                                    Image8: '',
                                    Image9: ''
                                });
                            }} className="Create-button ">
                                <Icon icon="ri:refresh-fill" />
                            </button>
                        </div>
                    </div>
                    <div style={{ width: "100%", marginBottom: "15px" }}>
                        <JoditEditor name="Description" value={inputValues.Description} onBlur={handleDescriptionChange}
                            ref={editor}
                        />
                    </div>
                </div>
                <div className="Category-Right-width">
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 1</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image1} name="Image1" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            <div className="image-preview">
                                {Image.Image1 ? (
                                    <img src={Image.Image1} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 1)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 2</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image2} name="Image2" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            <div className="image-preview">
                                {Image.Image2 ? (
                                    <img src={Image.Image2} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 2)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 3</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image3} name="Image3" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image3 ? (
                                    <img src={Image.Image3} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 3)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 4</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image4} name="Image4" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {/* {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image4 ? (
                                    <img src={Image.Image4} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 4)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 5</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image5} name="Image5" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image5 ? (
                                    <img src={Image.Image5} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 5)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 6</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image6} name="Image6" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image6 ? (
                                    <img src={Image.Image6} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 6)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 7</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image7} name="Image7" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image7 ? (
                                    <img src={Image.Image7} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 7)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 8</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image8} name="Image8" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label>
                            {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image8 ? (
                                    <img src={Image.Image8} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 8)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="Flex-Upload-images">
                        <div className="Input_Box-Category">
                            <label className="inputName-lbl lbl-Text-Category">Image 9</label>
                            <input className="Input-Fill-Box input-width-sub !h-auto" type="file" value={inputValues.Image9} name="Image9" onChange={handleImage} placeholder="" />
                            {/* <button className="inputName-lbl lbl-Text-Category bg-color-upload">Upload</button> */}
                        </div>
                        <div className="">
                            {/* <label className="inputName-lbl lbl-width-product">Image Preview</label> */}
                            {/* {Image.Imagepaths && (
                                <img src={Image.Imagepaths} alt="Selected Image" style={{ width: '100px', height: '75px' }} />
                            )} */}
                            <div className="image-preview">
                                {Image.Image9 ? (
                                    <img src={Image.Image9} alt="Selected Image" />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <img src={img} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className="buttons  ">
                                <button
                                    className="delete-button !p-[7px]"
                                    onClick={() => deleteImage(productId, 9)}
                                >
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProductMaster;
