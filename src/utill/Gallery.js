import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "./Gallery.css";
import { Icon } from "@iconify/react";
import axios from "axios";

function Gallery() {
  // const [images, setImages] = useState();
  const [showModal, setShowModal] = useState(false);
  const [imagePaths, setImagePaths] = useState([]);
  const [Albumname, SetAlbumname] = useState();
  const [newName, setNewName] = useState("");
  const [Brandname, setBrandname] = useState();
  const [Brandname1, setBrandname1] = useState();
  const [imagePaths1, setImagePaths1] = useState([]);
  const [Albumname1, SetAlbumname1] = useState();

  const [oldName, setoldName] = useState(); //used for updating the gallery name
  // console.log("ImagePaths", imagePaths);
  // console.log("ImagePaths1", imagePaths1);

  const handleUpdateClick = (image) => {
    const Name = image.map((name) => {
      const brand = name.Name;
      return brand;
    });
    // console.log("Handle update click", Name[0]);
    setNewName(Name[0]);
    setoldName(Name[0]);
    setShowModal(true);
  };
  useEffect(() => {
    getbrandname();
  }, []);

  useEffect(() => {
    fetchData();
    fetchdata1();
  }, [Brandname, Brandname1]); // Fetch images when brandName changes

  const getbrandname = async () => {
    try {
      const response = await fetch("http://localhost:3000/uniquename");
      const data = await response.json();
      const uniquename = data.uniqueNames.map((item) => {
        const name = item.Name;
        return name;
      });
      // console.log("brandssss", uniquename[0]);
      setBrandname(uniquename[0]);
      setBrandname1(uniquename[1]);
    } catch (error) {
      console.error("error fecthing album name", error);
    }
  };

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:3000/image/3");
      const response = await fetch(
        `http://localhost:3000/gallery/${Brandname}`
      );

      const data = await response.json();

      // console.log(data.Name);
      const Name = data.gallery.map((name) => {
        const brand = name.Name;
        return brand;
      });
      // console.log("data field name", Name);
      // setImagePaths(data.image.Imagepath);

      SetAlbumname(Name[0]);
      setImagePaths(data.gallery);
      // console.log("To find the id",data.gallery)
      // console.log("brand name", Name[0]);
      // window.location.reload()
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchdata1 = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/gallery/${Brandname1}`
      );

      const data = await response.json();

      const Name = data.gallery.map((name) => {
        const brand = name.Name;
        return brand;
      });
      // console.log(Name);
      SetAlbumname1(Name[0]);
      setImagePaths1(data.gallery);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return; // Exit early if the user cancels the deletion
    }
    try {
      const response = await fetch(`http://localhost:3000/image/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      fetchData();
      fetchdata1();
      const result = await response.json();
      console.log(result.message);

      // Update the local state to remove the deleted image
      // setImages(images.filter((image) => image.Id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdateName = async (formData) => {
    console.log("oldname", oldName);
    formData.append("oldName", oldName);
    console.log("form data is", formData);
    try {
      const response = await axios.put(
        `http://localhost:3000/images/name`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        }
      );

      setShowModal(false);
      fetchData();
      window.location.reload();
      console.log("try block executed");
    } catch (error) {
      console.error("Error updating image name:", error);
    }
  };

  return (
    <>
      <div className="gallery">
        <table>
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Gallery Name</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="Name">{Albumname}</td>
              <td className="image-cell">
                {imagePaths.map((imagePath, index) => (
                  <div key={index} className="image-parent">
                    <img
                      className="image-container !h-[50px]"
                      src={imagePath.Imagepath}
                      alt={`Image ${index}`}
                      style={{ width: "100px", margin: "5px" }}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(imagePath.Id)}
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => handleUpdateClick(imagePaths)}
                >
                  <Icon icon="fluent:clipboard-text-edit-32-filled" />
                </button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="Name">{Albumname1}</td>
              <td className="image-cell">
                {imagePaths1.map((imagePath, index) => (
                  <div key={index} className="image-parent !h-[50px]">
                    <img
                      className="image-container"
                      src={imagePath.Imagepath}
                      alt={`Image ${index}`}
                      style={{ width: "100px", margin: "5px" }}
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(imagePath.Id)}
                    >
                      <Icon icon="material-symbols:delete-outline" />
                      {/* Delete */}
                    </button>
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => handleUpdateClick(imagePaths1)}
                >
                  <Icon icon="fluent:clipboard-text-edit-32-filled" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleUpdateName}
          imageName={newName}
          setNewName={setNewName}
        />
      </div>
    </>
  );
}

export default Gallery;
