// src/ImageUpload.js
import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import "./Imageupload.css";
import { useCookies } from "react-cookie";

const ImageUpload = ({ name, endpoint }) => {
  const [Name, setName] = useState("");
  const [imgdata, setImgdata] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const handleNameChange = (e) => {
    // console.log(e.target.value)
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0])
    const files = Array.from(e.target.files)
    console.log(files)
    // setImgdata(e.target.files[0]);
    setImgdata(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", Name);
    // formData.append("Image", imgdata);  //single upload

    imgdata.forEach((file, index) => {
      formData.append(`Image`, file); // Using the same key for multiple files
    });


    console.log(formData);

    try {
      const response = await axios.post(
        endpoint, // /upload for single /uploads for multiple
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'authorization': 'Bearer ' + cookie.token
          },
        }
      );
      alert("Image uploaded successfully!");
      console.log(response.data);
      setName(" ");
      setImgdata(" ");
      document.getElementById('image').value = '';
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  return (
    <div className="container">
      <form className="upload-form !justify-end !p-[7px] !bg-[#f8f8f8] border !border-[#eee]" onSubmit={handleSubmit}>
        <div className={`w-full h-auto flex items-center justify-start`}>
          <div className="form-group min-w-[150px] max-w-auto  flex flex-col p-[5px] !items-start justify-center">
            <label htmlFor="name" className={`text-[12px] font-bold `}>{name}</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Slider Name"
              className={`!h-[40px] !w-[200px]`}
              value={Name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group min-w-[150px] max-w-auto  flex flex-col p-[5px] !items-start justify-center">
            <label htmlFor="image" className={`text-[12px] font-[700]`}>Image</label>
            <input
              type="file"
              id="image"
              className={`text-[15px] `}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              required
            />
          </div>
        </div>
        <button type="submit" className=" w-auto rounded-md h-auto px-[10px] flex items-center justify-center font-[600] bg-[#286090] text-white py-[5px] ">
          Upload
          <Icon icon="solar:upload-outline" />
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
