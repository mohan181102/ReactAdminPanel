import React, { useState } from "react";
import "../../css/modal.css";


const ModalFlashNews = ({
  show,
  onClose,
  onSubmit,
  //   formData,
  fFlashNews,
  fDate,
  fStatus,
  fPriority,
  setNewFlashNews,
  setNewDate,
  setNewStatus,
  setNewPriority,
  currentid,
}) => {


  if (!show) {
    return null;
  }

  const handlesubmit = () => {
    // const formdata = new FormData();
    // formdata.append("FlashNews", fFlashNews);
    // formdata.append("Date", fDate);
    // formdata.append("Status", fStatus);
    // formdata.append("Priority", fPriority);
   const Flashdata = {
    FlashNews: fFlashNews,
        Date: fDate,
        Status: fStatus,
        Priority: fPriority,
   }
    onSubmit(Flashdata,currentid)

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="news-modal-content">
        <h3>Update News</h3>
        <div>
          <label>Flash News</label>
          <input
            type="text"
            value={fFlashNews}
            onChange={(e) => {
            setNewFlashNews(e.target.value);
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
          <label>Priority</label>
          <input
            type="number"
            value={fPriority}
            onChange={(e) => {
            setNewPriority(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handlesubmit}>Update</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFlashNews;
