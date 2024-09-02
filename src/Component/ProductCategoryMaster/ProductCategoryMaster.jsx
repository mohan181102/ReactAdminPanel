import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
// import "./newsandnotice.css";
import "../../css/style.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
// import Modal from "./Modal";
import Backend_Url from "../../config/config";
import ModalAddCategory from "./ModalAddCategory";
import { useCookies } from "react-cookie";

const ProductCategoryMaster = () => {
    //**************************************************** */

    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [inputValues, setInputValues] = useState({
        CategoryName: '',
        URL: '',
        Priority: '',
        ShowOnCategory: true,
        ShowCategoryList: true,
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
        setInputValues({
            id: category.Id,
            CategoryName: category.CategoryName,
            URL: category.URL,
            Priority: category.Priority,
            ShowOnCategory: category.ShowOnCategory,
            ShowCategoryList: category.ShowCategoryList,
            Status: category.Status,
            Description: category.Description
        });
        setImage({
            Imagepaths: category.Imagepaths
        });
        setIsEditMode(true);
        setIsModalOpenCategory(true);
    };

    console.log(inputValues);
    console.log(Image);

    const closeModal = () => {
        setIsModalOpenCategory(false);
        setIsEditMode(false);
    };


    const [categoryList, setCategoryList] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${Backend_Url}/productCategoryMaster/get/all`,
                {
                    headers: {
                        'authorization': `Bearer ${cookie['token']}`
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
    // console.log(categoryList);
    useEffect(() => {
        fetchData(); // Fetch data initially

    }, []); // Empty dependency array means it runs once on mount


    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`${Backend_Url}/productCategoryMaster/delete/${id}`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            );
            // console.log(response.data.message);

            // Refresh the category list after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    // console.log(categoryList);

    return (
        <div className="App">
            <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div>
            <div className="body-content absolute w-[77%] right-0">
                <div className="heading">
                    <h1 className="General-Setting-Head">Product Category Master</h1>
                </div>
                <div className="General-form-content">
                    <div className="Category-buttons">
                        <button type="submit" className="Create-button" onClick={openModalCategory}>
                            + Add Category
                        </button>
                    </div>
                    <div className="heading">
                        <h1 className="General-Setting-Head">Root Category List</h1>
                    </div>
                    <div className="">
                        <table>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                    {/* <th></th>
                                    <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((category, index) => (
                                    <tr key={index}>
                                        <td className={`border border-[#bbbbbb]`}>{index + 1}</td>
                                        <td className="Image-Product-Cate border !w-auto border-[#bbbbbb] ">
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

                                        {/* status */}
                                        <td>
                                            {category.Status ? <p className={`text-green-500`}>Active</p> : <p className={`text-red-500`}>Inactive</p>}
                                        </td>
                                        <td className={`border border-[#bbbbbb]`}>
                                            <p className={` !w-auto h-full flex items-center justify-center`}>
                                                {category.CategoryName}
                                            </p>
                                        </td>

                                        <td className={`border border-[#bbbbbb]`}>
                                            <div className="buttons">
                                                <button
                                                    className="Add-button"
                                                    onClick={openModalCategory}
                                                >
                                                    <Icon icon="icon-park-solid:add" />
                                                </button>
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
                                <div >
                                    < ModalAddCategory
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
        </div >
    );
};

export default ProductCategoryMaster;
