import React, { useState } from "react";
import "./Modal.css";
// import ImageUpload from './Imageupload';

const Modal = ({ sliderId, show, onClose, onSubmit, imageName, setNewName, fetchSlider }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  if (!show) {
    return null;
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    debugger
    const formData = new FormData();
    formData.append("newName", imageName);
    if (selectedFile != null) {
      formData.append("Image", selectedFile);
    }
    onSubmit(selectedFile, imageName, sliderId);
    // console.log(formData)
    // console.log(sliderId)
    // onClose();
  };

  // const handleSubmit = async () => {
  //   const data = {
  //     newName: imageName,
  //     file: selectedFile, // You can adjust this based on how you want to handle the file
  //   };
  //   onSubmit(data);
  //   console.log(data)
  // };

  return (
    <div className="modal-overlay">
      <div className="modal-content1">
        <h3>Update Gallery</h3>
        <input
          type="text"
          placeholder="New name"
          value={imageName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
