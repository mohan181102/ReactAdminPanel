import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
// import "./newsandnotice.css";
import "../../css/style.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
// import Modal from "./Modal";
import Backend_Url from "../../config/config";
import ModalAddCategory from "./ModalProductMaster";
import ModalProductMaster from "./ModalProductMaster";
import { useCookies } from "react-cookie";

const ProductMaster = () => {
    //**************************************************** */


    const [isModalOpenProductMaster, setIsModalOpenProductMaster] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [inputValues, setInputValues] = useState({
        Category: '',
        ProductName: '',
        URL: '',
        Priority: '',
        Status: '',
        Price: '',
        Details2: '',
        Details3: '',
        Details4: '',
        Details5: '',
        Description: ''
    });

    const [Image, setImage] = useState({
        Image1: null,
        Image2: null,
        Image3: null,
        Image4: null,
        Image5: null,
        Image6: null,
        Image7: null,
        Image8: null,
        Image9: null
    });

    const openModalProductMaster = () => {
        setInputValues({
            Category: '',
            ProductName: '',
            URL: '',
            Priority: '',
            Status: '',
            Price: '',
            Details2: '',
            Details3: '',
            Details4: '',
            Details5: '',
            Description: ''
        })
        setImage({
            Image1: null,
            Image2: null,
            Image3: null,
            Image4: null,
            Image5: null,
            Image6: null,
            Image7: null,
            Image8: null,
            Image9: null
        })
        setIsModalOpenProductMaster(true);

    };

    // const handleEditClick = () => {
    //     setIsModalOpenCategory(true);
    // };

    const [productId, setProductId] = useState();

    const handleEditClick = (category) => {
        setProductId(category.Id)
        setInputValues({
            id: category.Id,
            Category: category.Category,
            ProductName: category.ProductName,
            URL: category.URL,
            Priority: category.Priority,
            Status: category.Status,
            Price: category.Price,
            Details2: category.Details2,
            Details3: category.Details3,
            Details4: category.Details4,
            Details5: category.Details5,
            Description: category.Description
        });
        setImage({
            Image1: category.Image1,
            Image2: category.Image2,
            Image3: category.Image3,
            Image4: category.Image4,
            Image5: category.Image5,
            Image6: category.Image6,
            Image7: category.Image7,
            Image8: category.Image8,
            Image9: category.Image9

        });
        setIsEditMode(true);
        setIsModalOpenProductMaster(true);
    };

    console.log(inputValues);
    console.log(Image);

    const closeModal = () => {
        setIsModalOpenProductMaster(false);
        setIsEditMode(false);
    };


    const [categoryList, setCategoryList] = useState([]);
    const fetchData = async () => {

        try {
            const response = await axios.get(`${Backend_Url}/ProductMaster/get/all`,
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
            const storedImage = localStorage.getItem('uploadFields');
            const imagePath = storedImage || data.Imagepaths;
            data.map((item) => {
                console.log(item);
            })
            setImage({
                ...Image,
                Image1: imagePath,
            });

            // Example: Setting category list data
            setCategoryList(data); // Adjust this based on your actual data structure
            setFilteredProducts(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data initially

    }, []); // Empty dependency array means it runs once on mount



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        const { Category, ProductName } = inputValues;

        // Filter products based on Category and ProductName
        const filtered = products.filter(product =>
            product.Category.toLowerCase() === Category.toLowerCase() &&
            product.ProductName.toLowerCase().includes(ProductName.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        // Update filtered products when the component mounts or products change
        setFilteredProducts(products);
    }, [products]);



    const deleteCategory = async (productId) => {
        // Show a confirmation alert before deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this product?");

        // If the user clicks "OK", proceed with the deletion
        if (userConfirmed) {
            try {
                const response = await axios.delete(`${Backend_Url}/ProductMaster/${productId}`,
                    {
                        headers: {
                            'authorization': 'Bearer ' + cookie.token
                        }
                    }
                );
                console.log(response.data.message);

                // Show success alert
                window.alert("Deleted successfully");

                // Refresh the category list after deletion
                fetchData();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        } else {
            console.log('Product deletion cancelled by user.');
        }
    };

    // console.log(categoryList);

    const findFirstNonEmptyImagePath = (category) => {
        for (let i = 1; i <= 9; i++) {
            const imageKey = `Image${i}`;
            if (category[imageKey]) {
                return category[imageKey];
            }
        }
        return ''; // Return empty string if no image path found
    };


    return (
        <div className="App">
            {/* <div className="sidebar fixed pb-[50px]">
                <Sidebar />
            </div> */}
            <div className="body-content absolute w-[77%] right-0">
                <div className="heading">
                    <h1 className="General-Setting-Head">Product Master</h1>
                </div>

                <div className="General-form-content">
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Select Category</label>
                            <select className="Input-Fill-Box" type="text" name="Category" value={inputValues.Category} onChange={handleInputChange} placeholder="" >
                                <option value="completedprojects">Completed Projects</option>
                                <option value="ongoingprojects">On Going Projects</option>
                            </select>
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Product Name</label>
                            <input className="Input-Fill-Box" type="text" name="ProductName" value={inputValues.ProductName} onChange={handleInputChange} placeholder="Enter Product Name" />
                        </div>

                        <div className="Input_Box-General">
                            <button type="search" className="Create-button" onClick={handleSearch}>
                                Search
                            </button>

                        </div>
                    </div>
                    <div className="Category-buttons">
                        <button type="submit" className="Create-button" onClick={openModalProductMaster}>
                            + Add Product
                        </button>
                    </div>
                    <div className="heading">
                        <h1 className="General-Setting-Head">Product List</h1>
                    </div>
                    <div className="">
                        <table>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>SNo.</th>
                                    <th>Image</th>
                                    <th>Product</th>

                                </tr>
                            </thead>
                            <tbody>
                                {categoryList.map((category, index) => (
                                    <tr key={index}>
                                        <td className={`w-[100px] border border-[#ccc]`}>
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
                                        <td className={`w-[50px] border border-[#ccc]`}>{index + 1}</td>
                                        <td className="  border  border-[#ccc]">
                                            <div className="image-parent-slider">
                                                <img
                                                    className="image-container-slider"
                                                    src={findFirstNonEmptyImagePath(category)}
                                                    alt={category.CategoryName}
                                                    width="100px"
                                                    height="30px"
                                                />
                                            </div>
                                        </td>
                                        <td className={`border  border-[#ccc]`}>{category.ProductName}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpenProductMaster && (
                        <div className="modal-Category">
                            <div className="modal-content !max-w-[80%] !mt-[80px]">
                                <div className="modal-title">
                                    <h3 className="modal-heading-top">Add Product</h3>
                                    <span className="close" onClick={closeModal}>&times;</span>
                                </div>
                                <div>
                                    < ModalProductMaster
                                        inputValues={inputValues}
                                        setInputValues={setInputValues}
                                        setImage={setImage}
                                        Image={Image}
                                        IsmodalOpen={setIsModalOpenProductMaster}
                                        closeModal={closeModal}
                                        isEditMode={isEditMode}
                                        fetchData={fetchData}
                                        productId={productId}
                                        handleInputChange={handleInputChange}
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

export default ProductMaster;
