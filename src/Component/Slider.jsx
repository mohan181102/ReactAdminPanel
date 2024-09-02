import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImageUpload from "./Imageupload";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./Slider.css";
import Modal from "./modal";
import Backend_Url from "../config/config";
import { useCookies } from "react-cookie";

const Slider = () => {
  const [Slider, setSlider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSliderId, setcurrentSliderId] = useState(null);
  const [newName, setNewName] = useState();
  const [cookie, setcookie, removeCookie] = useCookies(['token'])

  // console.log("Objects ",Object.keys(Slider))

  // const fetchSlider = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/Sliders/2");
  //     const data = await response.json();
  //     // console.log(data.slider);
  //     if (response) {
  //       setSlider(data.slider);
  //     }
  //   } catch (error) {
  //     console.error("error fetching data", error);
  //   }
  // };

  //get api call
  const fetchSlider = async () => {
    try {
      const response = await fetch(`${Backend_Url}/api/sliders/all`,
        {
          headers: {
            'authorization': 'Bearer ' + cookie.token
          }
        }
      );
      const data = await response.json();
      // console.log("object", data);
      if (response) {
        setSlider(data);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  useEffect(() => {
    fetchSlider();
  }, []);

  // console.log("Slider data", Slider);

  if (!Slider) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  const handleUpdateClick = (slidername, sliderid) => {
    console.log("the album name is:", slidername);
    console.log("Current Slider Id", sliderid);
    setNewName(slidername);
    setcurrentSliderId(sliderid);
    setShowModal(true);
  };

  //update api call
  const handleUpdate = async (formData, sliderId) => {
    try {
      const response = fetch(
        `${Backend_Url}/api/sliders/${sliderId}/images`,
        {
          method: "POST",
          headers: {
            'authorization': 'Bearer ' + cookie.token
          },
          body: formData,
        }
      );
      if (!response) {
        throw new Error("Unable To Update");
      }


      setShowModal(false);
      fetchSlider();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  //delete the slider api call

  const handleDelete = async (path, Id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete the Image?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = fetch(`${Backend_Url}/api/sliders/${Id}/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'authorization': 'Bearer ' + cookie.token
        },
        body: JSON.stringify({ imagePath: path }),
      });
      if (!response) {
        throw new Error(`Error Deleting the image ${path}`);
      }
      alert("Image deleted SuccessFully");
      fetchSlider();
      // console.log(JSON.stringify({imagePath:path}));
    } catch (error) {
      console.error(error);
    }
  };

  //delete an specific image from the slider
  const handleDeleteSlider = async (id) => {
    console.log("Sliderid", id);
    const confirmed = window.confirm(
      "Are you sure you want to Delete the Sldier?"
    );
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`${Backend_Url}/api/sliders/${id}`, {
        method: "DELETE",
        headers: {
          'authorization': 'Bearer ' + cookie.token
        }
      });
      if (!response) {
        throw new Error(`Error Deleting the Slider ${Slider.SliderName}`);
      }
      fetchSlider();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="App">
        <div className="sidebar fixed pb-[50px]">
          <Sidebar />
        </div>
        <div className="body-content absolute w-[77%] right-0">
          <div className="Header">
            <h1 className="heading">Slider</h1>
          </div>
          <div className="Upload Form">
            <ImageUpload
              name={"Slider"}
              endpoint={`${Backend_Url}/api/Sliders`}
            />
          </div>
          <div className="Slider-Table !bg-[f8f8f8]">
            {Slider ? (
              <table className={`!bg-[f8f8f8]`}>
                <thead>
                  <tr>
                    <th className={`12px font-bold p-[8px]`}>Sno</th>
                    {/* <th>Slider Id</th> */}
                    <th className={`12px font-bold p-[8px]`}>Slider Name</th>
                    <th className={`12px font-bold p-[8px] flex items-center justify-start`}>Images</th>
                    <th className={`12px font-bold p-[8px]`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {renderSliders()} */}
                  {Slider.map((slider, index) => (
                    <tr key={slider.Id} className={``}>
                      <td className={`border border-[#ccc]`}>{index + 1}</td>
                      {/* <td>{slider.Id}</td> */}
                      <td className={`border border-[#ccc]`}>{slider.SliderName}</td>
                      <td className="image-cell-slider border border-[#ccc]">
                        {slider.Imagepaths.map((image, imageIndex) => (
                          <div key={imageIndex} className="image-parent-slider">
                            <img
                              className="image-container-slider"
                              src={image}
                              alt={imageIndex}
                              width="200px"
                              height="50px"
                            />
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(image, slider.Id)}
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
                            onClick={() =>
                              handleUpdateClick(slider.SliderName, slider.Id)
                            }
                          >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteSlider(slider.Id)}
                          >
                            <Icon icon="material-symbols:delete-outline" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "NO Slider"
            )}
          </div>
        </div>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          imageName={newName}
          setNewName={setNewName}
          onSubmit={handleUpdate}
          sliderId={currentSliderId}
        />
      </div>
    </>
  );
};

export default Slider;
