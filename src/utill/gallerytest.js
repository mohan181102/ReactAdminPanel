import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./galleryt.css";

const GalleryTable = () => {
  const [groupedAlbums, setGroupedAlbums] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/images/all");
      const data = await response.json();
      setGroupedAlbums(data.groupedImages);
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
      //   fetchdata1();
      const result = await response.json();
      console.log(result.message);

      // Update the local state to remove the deleted image
      // setImages(images.filter((image) => image.Id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleUpdateClick = (images) => {
    // Handle update logic
  };

  const renderAlbums = () => {
    return Object.keys(groupedAlbums).map((albumName, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="Name">{albumName}</td>
        <td className="image-cell">
          {groupedAlbums[albumName].map((image, imageIndex) => (
            <div key={imageIndex} className="image-parent">
              <img
                className="image-container"
                src={image.Imagepath}
                alt={`Image ${imageIndex}`}
                style={{ width: "100px", margin: "5px" }}
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
        <td>
          <button
            className="update-button"
            onClick={() => handleUpdateClick(groupedAlbums[albumName])}
          >
            <Icon icon="fluent:clipboard-text-edit-32-filled" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sno.</th>
            <th>Gallery Name</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderAlbums()}</tbody>
      </table>
    </div>
  );
};

export default GalleryTable;
