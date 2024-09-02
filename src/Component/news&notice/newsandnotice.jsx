import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./newsandnotice.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Modal from "./Modal";
import Backend_Url from "../../config/config";
import { useCookies } from "react-cookie";

const Newsandnotice = () => {
  const [Title, setTitle] = useState();
  const [Desc, setDesc] = useState();
  const [Date, setDate] = useState();
  const [Image, setImage] = useState();
  const [Status, setStatus] = useState(true);
  const [Type, setType] = useState();
  const [cookie, setcookie, removeCookie] = useCookies(['token'])
  const [newTitle, setnewTitle] = useState();
  const [newDesc, setnewDesc] = useState();
  const [newDate, setnewDate] = useState();
  const [newStatus, setnewStatus] = useState();
  const [newType, setnewType] = useState();

  const [currentId, setcurrentId] = useState();
  //Form variables ^

  const [show, setShow] = useState(false);
  //Modal vars

  const [Data, setData] = useState();
  const [isVisible, setIsVisible] = useState(null);
  // console.log("Data var", Data);
  //api calls variables

  // console.log("New date", newDate);

  //form functions starts here
  const handletitle = (e) => {
    setTitle(e.target.value);
  };

  const handledesc = (e) => {
    setDesc(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleImage = (e) => {
    // console.log(e.target.files[0])
    setImage(e.target.files[0]);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  //create api call
  const handleform = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", Desc);
    formData.append("Date", Date);
    formData.append("Image", Image);
    formData.append("Status", Status);
    formData.append("Type", Type);

    console.log("Formdata", formData);

    try {
      const response = await axios.post(
        `${Backend_Url}/newsnotices/create`, // /upload for single /uploads for multiple
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'authorization': 'Bearer ' + cookie.token
          },
        }
      );
      alert("News added successfully!");
      console.log(response.data);
      setTitle(" ");
      setDesc(" ");
      setDate(" ");
      setStatus(" ");
      setType(" ");
      // document.getElementById("image").value = "";
      fetchdata();
      // window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };
  //form functions ends here

  //api calls

  //get api call
  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Url}/newsnotices/get/all`,
        {
          headers: {
            'authorization': 'Bearer ' + cookie.token
          }
        }
      );
      const data = await response.json();
      // if (response) {
      // }
      setData(data);

      // console.log("Fetched Data", data);
    } catch (error) {
      throw new Error("Unable To fetch data");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  //api calls

  //api helper functions
  const toggleVisibility = (id) => {
    if (isVisible === id) {
      setIsVisible(null);
    } else {
      setIsVisible(id);
    }
  };

  function DescriptionToggle({ desc, isVisible, toggleVisibility }) {
    return (
      <div onClick={toggleVisibility}>
        {/* <div > */}
        {isVisible ? (
          <span className="visible-text">{desc}</span>
        ) : (
          <span className="read-message">Read message</span>
        )}
        {/* </div> */}
      </div>
    );
  }

  //api helper functions

  //action functions

  //modal action function
  const handleUpDate = (item) => {
    setcurrentId(item.Id);
    setnewTitle(item.Title);
    // console.log("Update field",item.Date)
    setnewDate(item.Date);
    setnewDesc(item.Description);
    setnewStatus(item.Status);
    setnewType(item.Type);
    setShow(true);
  };

  //put api call
  const handleupdatemodal = async (formdata, currentid) => {
    try {
      // console.log(formdata)
      const response = await fetch(
        `${Backend_Url}/newsnotices/update/${currentid}`,
        {
          method: "PUT",
          headers: {
            'authorization': 'Bearer ' + cookie.token
          },
          body: formdata,
        }
      );
      if (response) {
        alert("Successfully Updated");
      }
      fetchdata();
    } catch (error) {
      console.error(error);
    }
  };
  //modal

  //delete api call
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete the this?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(
        `${Backend_Url}/newsnotices/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            'authorization': 'Bearer ' + cookie.token
          }
        }
      );
      if (response) {
        alert("Deleted Successfully");
      }
      fetchdata();
    } catch (error) {
      console.error(error);
    }
  };

  //action functions

  return (
    <div className="App">
      <div className="sidebar fixed pb-[50px]">
        <Sidebar />
      </div>
      <div className="body-content absolute w-[77%] right-0">
        <div className="heading">
          <h1>News & Notice</h1>
        </div>
        <div className="Upload-form">
          <form onSubmit={handleform}>
            <div className="news-form-group">
              <div>
                <label>Title</label>
                <input type="text" value={Title} onChange={handletitle} />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  className="textarea-input"
                  value={Desc}
                  onChange={handledesc}
                />
              </div>
              <div>
                <label>Date</label>
                <input type="Date" value={Date} onChange={handleDate} />
              </div>
              <div>
                <label>Image</label>
                <input type="file" onChange={handleImage} />
              </div>
              <div>
                <label>Status</label>
                <select
                  id="booleanDropdown"
                  value={Status}
                  onChange={handleStatus}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label>Type</label>
                <select id="booleanDropdown" value={Type} onChange={handleType}>
                  <option value="News">News</option>
                  <option value="Notice">Notice</option>
                </select>
              </div>
            </div>
            <div className="buttons">
              <button type="submit" className="Create-button">
                Create
              </button>
            </div>
          </form>
        </div>
        <div className="form-content">
          {Data ? (
            <table>
              <thead>
                <th>Sno.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date <div className="date-format">(yyyy-mm-dd)</div> </th>
                <th>Image</th>
                <th>Status</th>
                <th>Type</th>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={item.Id}>
                    <td>
                      <div className="block">
                        <button
                          className="delete-button-news"
                          onClick={() => handleDelete(item.Id)}
                        >
                          <Icon icon="material-symbols:delete-outline" />
                        </button>{" "}
                        <button
                          className="update-button-news"
                          onClick={() => handleUpDate(item)}
                        >
                          <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>{" "}
                        {index + 1}
                      </div>
                    </td>
                    <td>{item.Title}</td>
                    <td className="description-box">
                      <DescriptionToggle
                        desc={item.Description}
                        isVisible={isVisible === item.Id}
                        toggleVisibility={() => toggleVisibility(item.Id)}
                      />
                    </td>
                    <td>{item.Date}</td>
                    <td>
                      {item.ImagePath ? (
                        <img src={item.ImagePath} width={"40px"} height={"30px"} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td style={{ color: item.Status ? "green" : "red" }}>
                      {item.Status ? "Active" : "Inactive"}
                    </td>
                    <td>{item.Type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No data"
          )}
        </div>
        <Modal
          show={show}
          onClose={() => setShow(false)}
          fTitle={newTitle}
          fDate={newDate}
          fDesc={newDesc}
          fStatus={newStatus}
          fType={newType}
          setNewTitle={setnewTitle}
          setNewDate={setnewDate}
          setNewDesc={setnewDesc}
          setNewStatus={setnewStatus}
          setNewType={setnewType}
          currentid={currentId}
          onSubmit={handleupdatemodal}
        />
      </div>
    </div>
  );
};

export default Newsandnotice;
