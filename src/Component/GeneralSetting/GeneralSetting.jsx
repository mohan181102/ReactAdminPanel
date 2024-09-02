import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
// import "./newsandnotice.css";
import "../../css/style.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
// import Modal from "./Modal";

import { useCookies } from "react-cookie";
import Backend_Url from "../../config/config";

const GeneralSetting = () => {
    //**************************************************** */
    const [Image, setImage] = useState({
        FaviconImage: null,
        SelectLogo: null,

    });
    const [cookie, setcookie, removecookie] = useCookies(['token'])

    // const [faviconImage, setFaviconImage] = useState(null);
    // const [selectLogo, setSelectLogo] = useState(null);

    const [inputValues, setInputValues] = useState({
        ProjectName: '',
        Email: '',
        Phone: '',
        Address1: '',
        Address2: '',
        Address3: '',
        Address4: '',
        GoogleMapLink: '',
        FacebookLink: '',
        TwitterLink: '',
        InstagramLink: '',
        LinkedinLink: '',
        GooglePlusLink: '',
        YoutubeLink: '',
        CopyrightInfo: '',
        PrivacyPolicyInfo: '',
        MetaDescription: '',
        MetaKeyWords: '',
        MetaAuthor: '',
        SendEmailTo: '',
        SendSms: '',
        ProjectFontFamilyLinkURL: '',
        ProjectBackgroundColor: '',
        MenuBackgroundColor: '',
        MenuTextColor: '',
        MenuFontFamily: '',
        MenuFontSize: '',
        MenuFontWeight: ''

    });

    console.log(inputValues);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // const handleImage = (e) => {
    //     const { name, files } = e.target;
    //     setImage((prevData) => ({
    //         ...prevData,
    //         [name]: files[0]
    //     }));

    // };

    const handleImage = (e) => {

        const { name, files } = e.target;
        const file = files[0];

        // Read the file and set the image URL
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result;
            setImage((prevData) => ({
                ...prevData,
                [name]: file,
                [`${name}URL`]: imageUrl
            }));
            // Store selected logo URL in localStorage
            localStorage.setItem('selectedLogo', imageUrl);
        };
        reader.readAsDataURL(file);
    };

    console.log(Image);

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("submit")

        const formData = new FormData()
        Object.keys(inputValues).forEach(key => {
            formData.append(key, inputValues[key]);
        });

        formData.append('SelectLogo', Image.SelectLogo)
        formData.append('FaviconImage', Image.FaviconImage)

        console.log(Backend_Url);

        try {
            const response = await fetch(`${Backend_Url}/GeneralSetting/create`, {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                },
                body: formData
            });

            if (response) {
                const result = await response.json();
                window.alert(result.message)
                console.log('Form submitted successfully:', result);
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchdata = async (id) => {

            try {
                const response = await fetch(`${Backend_Url}/GeneralSetting/${id}`, {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                })

                var Data = await response.json()
                const newInputValues = {};
                for (const key in inputValues) {
                    if (Data.hasOwnProperty(key)) {
                        newInputValues[key] = Data[key];
                    }
                }
                setInputValues(newInputValues);
                const storedLogo = localStorage.getItem('selectedLogo');
                if (storedLogo) {
                    setImage({
                        ...Image,
                        SelectLogoURL: storedLogo
                    });
                } else {
                    setImage({
                        ...Image,
                        SelectLogoURL: Data.SelectLogo // Set initial logo URL from backend response
                    });
                }
            }
            catch (error) {
                console.log("enable to fetch", error)
            }
        }
        fetchdata(1)
    }, [])


    // REFRESH BUTTON
    const Refresh = () => {
        setInputValues({
            ProjectName: '',
            Email: '',
            Phone: '',
            Address1: '',
            Address2: '',
            Address3: '',
            Address4: '',
            GoogleMapLink: '',
            FacebookLink: '',
            TwitterLink: '',
            InstagramLink: '',
            LinkedinLink: '',
            GooglePlusLink: '',
            YoutubeLink: '',
            CopyrightInfo: '',
            PrivacyPolicyInfo: '',
            MetaDescription: '',
            MetaKeyWords: '',
            MetaAuthor: '',
            SendEmailTo: '',
            SendSms: '',
            ProjectFontFamilyLinkURL: '',
            ProjectBackgroundColor: '',
            MenuBackgroundColor: '',
            MenuTextColor: '',
            MenuFontFamily: '',
            MenuFontSize: '',
            MenuFontWeight: ''
        })
        setImage({
            FaviconImage: null,
            SelectLogo: null,
            SelectLogoURL: ''
        })
        // window.location.reload();
    }

    return (
        <div className="App">
            <div className="sidebar fixed">
                <Sidebar />
            </div>
            <div className="body-content absolute w-[77%] right-0">
                <div className="heading">
                    <h1 className="General-Setting-Head">General Setting</h1>
                </div>
                <div className="General-form-content">
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl"> Project Name</label>
                            <input className="Input-Fill-Box" value={inputValues.ProjectName} type="text" name="ProjectName" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Email</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Email} name="Email" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Phone</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Phone} name="Phone" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Address1</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Address1} name="Address1" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Address2</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Address2} name="Address2" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Address3</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Address3} name="Address3" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Address4</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.Address4} name="Address4" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Google Map Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.GoogleMapLink} name="GoogleMapLink" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Facebook Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.FacebookLink} name="FacebookLink" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Twitter Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.TwitterLink} name="TwitterLink" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Instagram Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.InstagramLink} name="InstagramLink" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Linkedin Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.LinkedinLink} name="LinkedinLink" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Google Plus Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.GooglePlusLink} name="GooglePlusLink" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Youtube Link</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.YoutubeLink} name="YoutubeLink" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Copyright Info.</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.CopyrightInfo} name="CopyrightInfo" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Privacy Policy info.</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.PrivacyPolicyInfo} name="PrivacyPolicyInfo" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Meta Description</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MetaDescription} name="MetaDescription" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Meta Keywords</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MetaKeyWords} name="MetaKeyWords" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Meta Author</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MetaAuthor} name="MetaAuthor" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">favicon Image</label>
                            <input className="Images-Height-General !p-0" type="file" value={inputValues.FaviconImage} name="FaviconImage" onChange={handleImage} />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Send Email to</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.SendEmailTo} name="SendEmailTo" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Send SMS</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.SendSms} name="SendSms" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Project Font Family Link/URL</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.ProjectFontFamilyLinkURL} name="ProjectFontFamilyLinkURL" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Project Background Color</label>
                            <input className="Input-Fill-Box !h-[30px] !rounded-md !shadow-none" type="color" value={inputValues.ProjectBackgroundColor} name="ProjectBackgroundColor" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="heading Menu-bg-color">
                        <h1 className="General-Setting-Head">Menu Setting</h1>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Select Logo</label>
                            {/* <input className="Input-Fill-Box" type="text" name="" placeholder="" /> */}
                            <input className="Images-Height-General !p-0" type="file" value={inputValues.SelectLogo} name="SelectLogo" onChange={handleImage} />
                        </div>
                        <div className="Input_Box-General">
                            {Image.SelectLogoURL && (
                                <img src={Image.SelectLogoURL} alt="Selected Logo" style={{ width: '100px', height: '60px', marginTop: '10px' }} />
                            )}
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Menu Background Color</label>
                            <input className="Input-Fill-Box !h-[35px]" type="color" value={inputValues.MenuBackgroundColor} name="MenuBackgroundColor" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Menu Text Color</label>
                            <input className="Input-Fill-Box !h-[35px]" type="color" value={inputValues.MenuTextColor} name="MenuTextColor" onChange={handleChange} placeholder="" />
                        </div>
                    </div>
                    <div className="Flex-Input_General">
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Menu Font Family</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MenuFontFamily} name="MenuFontFamily" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Menu Font Size</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MenuFontSize} name="MenuFontSize" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            <label className="inputName-lbl">Menu Font Weight</label>
                            <input className="Input-Fill-Box" type="text" value={inputValues.MenuFontWeight} name="MenuFontWeight" onChange={handleChange} placeholder="" />
                        </div>
                        <div className="Input_Box-General">
                            {/* <label className="inputName-lbl">Menu Text Color</label>
                            <input className="Input-Fill-Box" type="text" name="" placeholder="" /> */}
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" onClick={handleSubmit} className="Create-button">
                            Submit
                        </button>
                        <button type="button" onClick={Refresh} className="Create-button">
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSetting;
