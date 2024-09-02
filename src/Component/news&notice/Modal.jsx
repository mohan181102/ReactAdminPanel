import React, { useState } from "react";
import "./Modal.css";
import { useCookies } from "react-cookie";

const Modal = ({
  show,
  onClose,
  onSubmit,
  //   formData,
  fTitle,
  fDesc,
  fDate,
  fStatus,
  fType,
  setNewTitle,
  setNewDate,
  setNewDesc,
  setNewStatus,
  setNewType,
  currentid,
}) => {
  const [newImage, setnewImage] = useState();
  const [cookie, setcookie, removeCookie] = useCookies(['token'])
  if (!show) {
    return null;
  }
  const handleFileChange = (e) => {
    setnewImage(e.target.files[0]);
  };

  const handlesubmit = () => {
    const formdata = new FormData();
    formdata.append("Title", fTitle);
    formdata.append("Description", fDesc);
    formdata.append("Date", fDate);
    formdata.append("Image", newImage);
    formdata.append("Status", fStatus);
    formdata.append("Type", fType);

    console.log("Image ", newImage);
    onSubmit(formdata,currentid)

    setnewImage(" ");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="news-modal-content">
        <h3>Update News</h3>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={fTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            className="textarea-input"
            value={fDesc}
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={fDate}
            onChange={(e) => {
              setNewDate(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Image</label>
          <input id="Image" type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Status</label>
          <select
            id="booleanDropdown"
            value={fStatus}
            onChange={(e) => {
              setNewStatus(e.target.value);
            }}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            id="booleanDropdown"
            value={fType}
            onChange={(e) => {
              setNewType(e.target.value);
            }}
          >
            <option value="News">News</option>
            <option value="Notice">Notice</option>
          </select>
        </div>
        <div>
          <button onClick={handlesubmit}>Update</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
