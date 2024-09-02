import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "./MainGallery.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import Backend_Url from "../config/config";
import { useCookies } from "react-cookie";

function Maingallery() {
  const [groupedAlbums, setGroupedAlbums] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [checkedGalleries, setCheckedGalleries] = useState({});
  const [newName, setNewName] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const cookies = useCookies(['token'])
  const [oldName, setoldName] = useState(); //used for updating the Maingallery name

  console.log("isAllChecked", isAllChecked);

  const handleUpdateClick = (albumname) => {
    console.log("the album name is:", albumname);
    setNewName(albumname);
    setoldName(albumname);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      const token = cookies[0].token
      const response = await fetch(`${Backend_Url}/gallery/images/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      if (response) {
        setGroupedAlbums(data.groupedImages);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const deletegalleries = async (checkedGalleries) => {
    const selectedGalleries = Object.keys(checkedGalleries).filter(
      (galleryName) => checkedGalleries[galleryName]
    );
    const confirmed = window.confirm(
      "Are you sure you want to delete the Selected Galleries?"
    );
    if (!confirmed) {
      return;
    }
    // if (!checkedGalleries) {
    //   const confirmed = window.confirm(
    //     "Are you sure you want to delete the Selected Galleries?"
    //   );
    //   if (!confirmed) {
    //     return;
    //   }
    // }

    console.log("Selected Galleries", selectedGalleries);
    // console.log("Checked Galleries", selectedGalleries);
    const keys = Object.keys(checkedGalleries);

    // console.log(Object.keys(checkedGalleries));

    try {
      const Galleries = keys.map((items) => {
        return items;
      });
      // console.log("Galleries here",Galleries)
      const response = await fetch(`${Backend_Url}/gallery/selectedgalleries/deletegalleries`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: selectedGalleries }),
      });
      if (!response) {
        throw new Error("Failed to delete Gallery");
      }
      fetchData();
      console.log(response);
      console.log(JSON.stringify(Galleries));
      alert("Selected Album Has been Deleted Successfully");
    } catch (error) {
      console.error("Error Deleteing the Galleries", error);
    }
  };

  const handledeletegallery = async (galleryname) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(
        `${Backend_Url}/gallery/${galleryname}`,
        {
          method: "DELETE",
        }
      );
      if (!response) {
        throw new Error("Failed to delete Gallery");
      }
      fetchData();
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error(error);
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
      const response = await fetch(`${Backend_Url}/gallery/image/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      fetchData();
      //   fetchdata1();
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
        `${Backend_Url}/gallery/images/name`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        }
      );

      setShowModal(false);
      fetchData();
      alert("Gallery Updated");
      console.log("try block executed");
    } catch (error) {
      console.error("Error updating image name:", error);
    }
  };

  //check box logiccs
  const handleCheckboxChange = (albumName) => {
    setCheckedGalleries((prevState = {}) => {
      const isCurrentlyChecked = prevState[albumName];
      console.log(isCurrentlyChecked);
      // Show confirmation only if the checkbox is being checked
      // if (!isCurrentlyChecked) {
      //   const confirmed = window.confirm(
      //     `Are you sure you want to select ${albumName} gallery?`
      //   );
      //   if (!confirmed) {
      //     return prevState; // Return the previous state if not confirmed
      //   }
      // }
      const newState = {
        ...prevState,
        [albumName]: !prevState[albumName],
      };
      // const check = Object.values(newState).every((checked) => checked)
      // console.log(check)
      setIsAllChecked(Object.values(newState).every((checked) => checked));
      return newState;
    });
  };

  const handlemastercheckbox = (albums) => {
    if (!isAllChecked) {
      const confirmed = window.confirm(
        "Are you sure you want to Select All the Galleries?"
      );
      if (!confirmed) {
        return;
      }
    }
    const newCheckedState = !isAllChecked;
    const newCheckedGalleries = {};
    // console.log(newCheckedGalleries);
    albums.forEach((album) => {
      newCheckedGalleries[album] = newCheckedState;
    });
    setIsAllChecked(newCheckedState);
    setCheckedGalleries(newCheckedGalleries);
  };
  //check box logiccs

  const renderAlbums = () => {
    return Object.keys(groupedAlbums).map((albumName, index) => (
      <tr key={index}>
        <td className={`border border-[#ccc]`}>
          <input
            type="checkbox"
            checked={checkedGalleries[albumName]}
            onChange={() => handleCheckboxChange(albumName)}
          />
        </td>
        <td className={`border border-[#ccc]`}>{index + 1}</td>
        <td className="Name border border-[#ccc]">{albumName}</td>
        <td className="image-cell border border-[#ccc] !bg-[#f8f8f8]">
          {groupedAlbums[albumName].map((image, imageIndex) => (
            <div key={imageIndex} className="image-parent   bg">
              <img
                className="image-container"
                src={image.Imagepath}
                alt={`Image ${imageIndex}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
              <button
                className="delete-button"
                onClick={() => handleDelete(image.Id)}
              >
                <Icon icon="material-symbols:delete-outline" />
              </button>
            </div>
          ))}
        </td>
        <td className={`border border-[#ccc]`}>
          <div className="buttons">
            <button
              className="update-button"
              onClick={() => handleUpdateClick(albumName)}
            >
              <Icon icon="fluent:clipboard-text-edit-32-filled" />
            </button>
            <button
              className="delete-button"
              onClick={() => handledeletegallery(albumName)}
            >
              <Icon icon="material-symbols:delete-outline" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
        {groupedAlbums ? (
          <table>
            <thead>
              <tr>
                <th>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onChange={() =>
                        handlemastercheckbox(
                          Object.keys(groupedAlbums).map((albumName) => {
                            return albumName;
                          })
                        )
                      }
                      checked={isAllChecked}
                    />
                    <button
                      className="delete-button"
                      onClick={() => deletegalleries(checkedGalleries)}
                    >
                      <Icon icon="material-symbols:delete-outline" />
                    </button>
                  </div>
                </th>
                <th>Sno.</th>
                <th>Gallery Name</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderAlbums()}</tbody>
          </table>
        ) : (
          <div className="text-center">No Albums! Please Create One</div>
        )}

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

export default Maingallery;
