import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
// import "./newsandnotice.css";
import "../../css/style.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
// import Modal from "./Modal";
import Backend_Url from "../../config/config";
import ModelAddAdvertisement from "./ModelAddAdvertisement";
import { useCookies } from "react-cookie";

const AdvertisementMaster = () => {
    //**************************************************** */

    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [inputValues, setInputValues] = useState({
        Category: '',
        AdvertisementName: '',
        URL: '',
        Priority: '',
        Status: true,
        Description: ''
    });

    const [Image, setImage] = useState({
        Imagepaths: null,
    });

    const openModalCategory = () => {
        setIsModalOpenCategory(true);
    };

    // const handleEditClick = () => {
    //     setIsModalOpenCategory(true);
    // };

    const handleEditClick = (category) => {
        debugger
        setInputValues({
            id: category.Id,
            Category: category.Category,
            AdvertisementName: category.AdvertisementName,
            URL: category.URL,
            Priority: category.Priority,
            Status: category.Status,
            Description: category.Description
        });
        setImage({
            Imagepaths: category.Imagepaths
        });
        setIsEditMode(true);
        setIsModalOpenCategory(true);
        fetchData();
    };

    useEffect(() => {
        console.log(inputValues)
        console.log('Image', Image)
    }, [inputValues, Image]);

    console.log(inputValues);
    console.log(Image);

    const closeModal = () => {
        setIsModalOpenCategory(false);
        setIsEditMode(false);
    };


    const [categoryList, setCategoryList] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${Backend_Url}/AdvertisementMaster/get/all`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            );
            const data = response.data;

            // Update inputValues state
            const newInputValues = { ...inputValues };
            for (const key in inputValues) {
                if (data.hasOwnProperty(key)) {
                    newInputValues[key] = data[key];
                }
            }
            setInputValues(newInputValues);

            // Update Image state
            const storedImage = localStorage.getItem('Image');
            const imagePath = storedImage || data.Imagepaths;
            setImage({
                ...Image,
                Imagepaths: imagePath
            });

            // Example: Setting category list data
            setCategoryList(data); // Adjust this based on your actual data structure

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log(categoryList);
    useEffect(() => {
        fetchData(); // Fetch data initially

    }, []); // Empty dependency array means it runs once on mount


    const deleteCategory = async (id) => {

        const userConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (userConfirmed) {
            try {
                const response = await axios.delete(`${Backend_Url}/AdvertisementMaster/delete/${id}`, {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                });

                window.alert("Deleted successfully");

                // alert("Image deleted");
                // Refresh the category list after deletion
                fetchData();
            } catch (error) {
                console.error('Error deleting Advertisement:', error);
            }
        } else {
            console.log('Advertisement deletion cancelled by user.');
        }
    };


    return (
        <div className="App">
            {/* <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div> */}
            <div className="body-content absolute w-[77%] right-0">
                <div className="heading">
                    <h1 className="General-Setting-Head">Advertisement Master</h1>
                </div>
                <div className="General-form-content">
                    <div className="Category-buttons">
                        <button type="submit" className="Create-button" onClick={openModalCategory}>
                            + Add Advertisement
                        </button>
                    </div>
                    <div className="heading">
                        <h1 className="General-Setting-Head">Advertisement List</h1>
                    </div>
                    <div className="sm:overflow-scroll">
                        <table>
                            <thead>
                                <tr className={`sm:overflow-scroll`}>
                                    <th>Action</th>
                                    <th>SNo.</th>
                                    <th>Image</th>
                                    <th>URL</th>
                                    <th>Advertisement</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((category, index) => (
                                    <tr key={index}>
                                        <td className={`border border-[#ccc] !w-[50px] `}>
                                            <div className="buttons">
                                                <button
                                                    className="update-button"
                                                    onClick={() => handleEditClick(category)}
                                                >
                                                    <Icon icon="flowbite:edit-solid" />
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteCategory(category.Id)}
                                                >
                                                    <Icon icon="material-symbols:delete-outline" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className={`border border-[#ccc] !w-[40px]`}>{index + 1}</td>
                                        <td className="Image-Product-Cate !border !w-[auto] !border-[#ccc] ">
                                            <div className="image-parent-slider">
                                                <img
                                                    className="image-container-slider"
                                                    src={category.Imagepaths}
                                                    alt={category.CategoryName}
                                                    width="100px"
                                                    height="50px"
                                                />
                                            </div>
                                        </td>
                                        <td className={`border border-[#ccc] !min-w-[200px]`}>{category.URL}</td>
                                        <td className={`border border-[#ccc]`}>{category.AdvertisementName}</td>
                                        <td className={`border border-[#ccc]`}>{category.Status ? <p className={`text-red-500`}>Active</p> : <p className={`text-green-500`}>Inactive</p>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpenCategory && (
                        <div className="modal-Category">
                            <div className="modal-content !max-w-[90%]">
                                <div className="modal-title">
                                    <h3 className="modal-heading-top">Add Category</h3>
                                    <span className="close" onClick={closeModal}>&times;</span>
                                </div>
                                <div>
                                    < ModelAddAdvertisement
                                        inputValues={inputValues}
                                        setInputValues={setInputValues}
                                        setImage={setImage}
                                        Image={Image}
                                        closeModal={closeModal}
                                        isEditMode={isEditMode}
                                        fetchData={fetchData}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementMaster;
