import React from "react";
import ImageUpload from "./Imageupload";
import Maingallery from "./MainGallery";
import Sidebar from "./Sidebar";
import Backend_Url from "../config/config";
// import './Gallery.css'

const Gallery = () => {
  return (
    <>
      <div className="App">
        <div className="sidebar fixed pb-[50px]">
          <Sidebar />
        </div>
        <div className="body-content absolute w-[77%] right-0">
          <div>
            <div className="Header">
              <h1 className="heading">Gallery</h1>
            </div>
            <div className="form">
              <ImageUpload name={"Gallery"} endpoint={`${Backend_Url}/gallery/uploads`} />
            </div>
            <div className="Gallery">
              <Maingallery />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
