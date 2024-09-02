// src/DisplayImage.js
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Backend_url from "../config/URL.json"

const DisplayImage = ({ imageId }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [cookie, setcookie, removecookies] = useCookies(['token'])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${Backend_Url}/image/${imageId}`,
          {
            headers: {
              'authorization': 'Bearer ' + cookie.token
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    // Clean up the URL object when the component is unmounted
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageId, imageSrc]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default DisplayImage;
