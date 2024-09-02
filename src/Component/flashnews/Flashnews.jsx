import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import './flashnews.css'
import axios from "axios";
import Backend_Url from "../../config/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalFlashNews from "./ModalFlashNews";
import { useCookies } from "react-cookie";

const Flashnews = () => {
  const [formData, setFormData] = useState({
    FlashNews: "",
    Date: "",
    Status: '',
    Priority: 0,
  });
  const [apiData, setApiData] = useState([])
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const [FlashNews, setFlashNews] = useState();
  const [Date, setDate] = useState();
  const [Status, setStatus] = useState(true);
  const [Priority, setPriority] = useState();


  const [currentId, setcurrentId] = useState();
  const [newFlashNews, setNewFlashNews] = useState();
  const [newDate, setNewDate] = useState();
  const [newStatus, setNewStatus] = useState();
  const [newPriority, setNewPriority] = useState();
  const [show, setShow] = useState(false);

  console.log(apiData)


  const handleChange = (e) => {
    const { name, value } = e.target;

    // For checkbox input type
    // const newValue = type === 'checkbox' ? !formData[name] : value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  //***********************************************Create Api called Here****************************************************** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit')
    console.log(formData);
    console.log(cookie.token)
    // const formData = new FormData();
    // formData.append("FlashNews", FlashNews);
    // formData.append("Date", Date);
    // formData.append("Status", Status);
    // formData.append("Priority", Priority);

    // e.preventDefault();
    try {
      const response = await axios.post(`${Backend_Url}/flashnews/create`, formData,
        {
          headers: {
            'authorization': `Bearer ${cookie.token}`
          },

        }
      );
      console.log('Post response:', response.data);
      fetchData()
      if (response.status === 200) {
        alert(response.data.message)
      }
      // Optionally handle success feedback or redirect to another page
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle error feedback
    }
  };

  //**************************************************Get All Api*********************************************************** */

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/flashnews/get/all`,
        {
          headers: {
            'authorization': 'Bearer ' + cookie.token
          },

        }
      )
      if (response) {
        console.log(response)
        setApiData(response.data.result)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  //modal action function
  const handleUpDate = (item) => {
    setcurrentId(item.Id);
    setNewFlashNews(item.FlashNews);
    // console.log("Update field",item.Date)
    setNewDate(item.Date);
    setNewStatus(item.Status);
    setNewPriority(item.Priority);
    setShow(true);
  };

  //************************** Update ************************************* */
  const handleupdatemodal = async (formdata, currentid) => {
    console.log(formdata);
    try {
      const response = await axios.put(
        `${Backend_Url}/flashnews/update/${currentid}`,
        formdata, // Assuming data is your JSON object or FormData
        {
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + cookie.token
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully Updated");
        fetchData(); // Assuming fetchData() fetches updated data from the backend
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update. Please try again later.");
    }
  };


  //*************************Delete********************************* */
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete the this?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(
        `${Backend_Url}/flashnews/delete/${id}`,
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
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  /*
  form-input-update 
  form-label-update
  */
  return (
    <div className="App">
      <div className="sidebar fixed pb-[50px]">
        <Sidebar />
      </div>
      <div className="body-content absolute w-[77%] right-0">
        <div className="heading">
          <h1>FlashNews</h1>
        </div>
        <div className="container !bg-[#f8f8f8]">
          <form onSubmit={handleSubmit} className="upload-form !bg-[#f8f8f8] border border-[#ccc]">
            <div className=" form-gruop-update">
              <label className="form-label-update !w-full   !text-left">
                Flash News:
              </label>
              <input
                type="text"
                name="FlashNews"
                className="form-input-update "
                value={formData.FlashNews}
                onChange={handleChange}
              />
            </div>
            <div className="form-gruop-update">
              <label className="form-label-update">
                Date:
              </label>
              <input
                type="date"
                name="Date"
                value={formData.Date}
                className="form-input-update "
                onChange={handleChange}
              />
            </div>
            <div className="form-gruop-update">
              <label className="form-label-update">
                Status:
              </label>
              <select
                className="form-input-update"
                name="Status"
                value={formData.Status.toString()} // Convert boolean to string for select value
                onChange={handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-gruop-update">
              <label className="form-label-update">
                Priority:
              </label>
              <input
                className="form-input-update"
                type="number"
                name="Priority"
                value={formData.Priority}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>

        </div>
        <div className="form-content !bg-[#f8f8f8] border !border-[#ccc]">
          {apiData ? (
            <table>
              <thead>
                <th>Action</th>
                <th>Sno.</th>
                <th>Name</th>
                <th>Date <div className="date-format">(yyyy-mm-dd)</div> </th>
                <th>Status</th>
                <th>Priority</th>
              </thead>
              <tbody>
                {apiData.map((item, index) => (
                  <tr key={item.Id}>
                    <td className={`border border-[#ccc]`}>
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
                      </div>
                    </td>
                    <td className={`border border-[#ccc]`}>
                      {index + 1}
                    </td>
                    <td className={`border border-[#ccc]`}>{item.FlashNews}</td>
                    <td className={`border border-[#ccc]`}>{item.Date}</td>
                    <td className={`border border-[#ccc]`}>{item.Status ? 'Active' : 'Inactive'}</td>
                    <td className={`border border-[#ccc]`}>{item.Priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No data"
          )}
        </div>
        <ModalFlashNews
          show={show}
          onClose={() => setShow(false)}
          fFlashNews={newFlashNews}
          fDate={newDate}
          fStatus={newStatus}
          fPriority={newPriority}
          setNewFlashNews={setNewFlashNews}
          setNewDate={setNewDate}
          setNewStatus={setNewStatus}
          setNewPriority={setNewPriority}
          currentid={currentId}
          onSubmit={handleupdatemodal}
        />
      </div>
    </div>
  );
};

export default Flashnews;
