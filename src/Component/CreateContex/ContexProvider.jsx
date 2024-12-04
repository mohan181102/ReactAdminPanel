import { useState } from "react";
import UpdateContex from "./CreateContex";

const UpdateProvider = function ({ children }) {
    const [UpdataTitle, setUpdateTitle] = useState(null)
    const [UpdateStatus, setUpdateStatus] = useState(null)
    const [UpdateID, setUpdateID] = useState(null)
    const [UpdateFile, setUpdateFile] = useState(null)
    const [UpdateURL, setUpdateURL] = useState(null)


    // ---------------------create json object------------------------------------
    const [jsonupdateID, setjsonupdateID] = useState(null)
    const [jsonupdateContent, setjsonupdateContent] = useState(null)


    // CREATE UPDATE STATE FOR UPDATE TESTIMONIALS
    const [UpdateTName, SetTname] = useState(null)
    const [UpdateTDetails, SetUpdateTDetails] = useState(null)
    const [UpdateTDesignation, setDesignation] = useState(null)
    const [UpdateTImage, setTImage] = useState(null)
    const [UpdateTPriority, setTpriority] = useState(null)
    const [UpdateTStatus, setTstatus] = useState(null)
    const [UpdateTURL, setTurl] = useState(null)
    const [Tid, setTid] = useState(null)


    // UPDATE STATE FOR VIDEOMASTER
    const [UpdateVMTitle, setVMTitle] = useState(null)
    const [UpdateVMURL, setVMUrl] = useState(null)
    const [UpdateVMPriority, setUpdateVMPriority] = useState(null)
    const [UpdateVMStatus, setVMStatus] = useState(null)
    const [UpdateVMId, setUpdateVMId] = useState(null)
    // UpdateVMTitle, setVMTitle, UpdateVMURL, UpdateVMId, setUpdateVMId, setVMUrl, UpdateVMStatus, setVMStatus, UpdateVMPriority, setUpdateVMPriority


    // UPDATE STATE FOR HPBODYCard
    const [UpdateCardTitle, setCardTitle] = useState(null)
    const [UpdateCardHeading, setUpdateCardHeading] = useState(null)
    const [UpdateCardStatus, setUpdateCardStatus] = useState(null)
    const [UpdateCardPriority, setUpdateCardPriority] = useState(null)
    const [UpdateCardId, setCardId] = useState(null)
    const [UpdateCardURL, setCardURL] = useState(null)
    const [UpdateCardWidth, setUpdateCardWidth] = useState(null)
    const [UpdateCardDetails, setUpdateCardDetails] = useState(null)
    const [UpdateCardImage, setUpdateCardImage] = useState(null)


    // UPDATE STATES FOR HOME PAGE CONTENT MASTER
    const [UpdateCMTitle, setUpdateCMTitle] = useState(null)
    const [UpdateCMContent, setUpdateCMContent] = useState(null)
    const [UpdateCMStatus, setUpdateCMStatus] = useState(null)
    const [UpdateCMPriority, setUpdateCMPriority] = useState(null)
    const [UpdateCMId, setUpdateCMId] = useState(null)
    const [UpdateBgcolor, setBgcolor] = useState(null)



    // CREATE UPDATE STATUS
    const [UpdateSN, setUpdateSN] = useState(null)
    const [UpdateFN, setUpdateFN] = useState(null)
    const [UpdateMN, setUpdateMN] = useState(null)
    const [UpdateTCID, setUpdateTCID] = useState(null)
    const [UpdateTCLINK, setUpdaTCLink] = useState(null)
    const [UpdateTCDOB, setUpdaTCDOB] = useState(null)
    const [UpdateTCAddmission, setTCAddmission] = useState(null)
    const [UpdateTCClassLeft, setUpdaTCClassLeft] = useState(null)
    const [UpdateTCNo, setUpdateTCNo] = useState(null)
    const [UpdateLeavingDate, setUpdateLeavingDate] = useState(null)
    const [UpdateTCRemark, setUpdateTCRemark] = useState(null)
    const [UpdateTCStatus, setUpdateTCStatus] = useState(null)


    // CREATE RESULT UPDATE
    const [UpdateRTitle, setUpdateRTitle] = useState(null)
    const [UpdateRURL, setUpdateRURL] = useState(null)
    const [UpdateRStatus, setUpdateRStatus] = useState(null)
    const [UpdateRFile, setUpdateRFile] = useState(null)
    const [UpdateRId, setUpdateRID] = useState(null)


    // UPDATE MENU MASTER 
    const [UpdateMMPriority, setUpdateMMPriority] = useState(null)
    const [UpdateMMStatus, setUpdateMMStatus] = useState(null)
    const [UpdateMMId, setUpdateMMId] = useState(null)
    const [UpdateMMCategory_sub, setUpdateMMCategory_sub] = useState(null)
    const [UpdateMMURL, setUpdateMMURL] = useState(null)
    const [UpdateMMGruopName, setUpdateMMCruopName] = useState(null)
    const [UpdateMMTextArea, setUpdateTextArea] = useState(null)
    const [UpdateMMImage, setUpdateMMImage] = useState(null)


    // UPDATE PRICE MASTER
    const [UpdatePricemasterCategory, setUpdatePricemasterCategory] = useState(null)
    const [UpdatePMPlanName, setUpdatePMPlanName] = useState(null)
    const [UpdatePMPriority, setUpdatePMPriority] = useState(null)
    const [UpdatePMStatus, setUpdatePMStatus] = useState(null)
    const [UpdatePMUrl, setUpdatePMUrl] = useState(null)
    const [UpdatePMTextarea, setUpdatePMTextArea] = useState(null)
    const [UpdatePMImage, setUpdatePMImage] = useState(null)
    const [UpdatePMId, setUpdatePMId] = useState(null)
    const [UpdatePMGruopName, setUpdatePMGruopName] = useState(null)


    // UPDATE CLIENT
    const [UpdateCTitle, setUpdateCTitle] = useState(null)
    const [UpdateCURL, setUpdateCURL] = useState(null)
    const [UpdateCDetails, setUpdateCDetails] = useState(null)
    const [UpdateCPriority, setUpdateCPriority] = useState(null)
    const [UpdateCId, setUpdateCID] = useState(null)
    const [UpdateCImage, setUpdateCImage] = useState(null)
    const [UpdateCStatus, setUpdateCStatus] = useState(null)


    // UPDATE PAGE VIEW MASTER
    const [UpdatePVMTitle, setUpdatePVMTitle] = useState(null)
    const [UpdatePVMPageName, setUpdatePVMPageName] = useState(null)
    const [UpdatePVMStatus, setUpdatePVMStatus] = useState(null)
    const [UpdatePVMId, setUpdatePVMId] = useState(null)
    const [UpdatePVMPriority, setUpdatePVMPriority] = useState(null)


    // ACADEMIC MASTER 
    const [UpdateAMTitle, setUpdateAMTitle] = useState(null)
    const [UpdateAMVideoURL, setUpdateAMVideoURL] = useState(null)
    const [UpdateAMVideoStatus, setUpdateAMVideoStatus] = useState(null)
    const [UpdateAMUpdateFile, setUpdateAMFile] = useState(null)
    const [UpdateAMId, setUpdateAMId] = useState(null)


    // COURSE MASTER
    const [UpdateCMID, setUpdateCMID] = useState(null)
    const [UpdateCoMTitle, setUpdateComTitle] = useState(null)
    const [UpdateComTextcontent, setUpdateComTextcontent] = useState(null)
    const [UpdateComPriority, setUpdateComPriority] = useState(null)
    const [UpdateComBgcolor, setUpdateComBgcolor] = useState(null)
    const [UpdateComStatus, setUpdateComStatus] = useState(null)


    // FOOTER MASTER
    const [UpdateFooterID, setUpdateFooterID] = useState(null)
    const [UpdateFooterTitle, setUpdateFooterTitle] = useState(null)
    const [UpdateFooterTextcontent, setUpdateFooterTextcontent] = useState(null)
    const [UpdateFooterPriority, setUpdateFooterPriority] = useState(null)
    const [UpdateFooterBgcolor, setUpdateFooterBgcolor] = useState(null)
    const [UpdateFooterStatus, setUpdateFooterStatus] = useState(null)


    //FONT UPDATE STATES
    const [UpdateFontID, setUpdateFontID] = useState(null)
    const [UpdateFontName, setFontName] = useState(null)
    const [UpdateFontValue, setFontValue] = useState(null)


    // FRONTEND PAGE
    const [UpdateIcon, setUpdateIcon] = useState(null)
    const [UpdatePageName, setUpdatePageName] = useState(null)
    const [UpdatePageUrl, setUpdatePageUrl] = useState(null)
    const [UpdateNewTab, setUpdateNewTab] = useState(null)
    const [UpdatePriority, setUpdatePriority] = useState(null)
    const [UpdateFStatus, setUpdateFStatus] = useState(null)
    const [UpdateFId, setUpdateFId] = useState(null)


    const [UpdateDCIcon, setUpdateDCIcon] = useState(null)
    const [UpdateDCCardName, setUpdateDCCardName] = useState(null)
    const [UpdateDCURL, setDCUrl] = useState(null)
    const [UpdateDCcolor, setDCcolor] = useState(null)
    const [UpdateDCTbname, setDCTBname] = useState(null)
    const [UpdateDCTabelcondition, setDCtableCondition] = useState(null)
    const [UpdateDCNewTab, setDCNewTab] = useState(null)
    const [UpdateDCPriority, setDCPriority] = useState(null)
    const [UpdateDCStatus, setDCStatus] = useState(null)
    const [UpdateDcId, setUpdateDCID] = useState(null)


    const [UpdateHTTitle, setUpdateHTTitle] = useState(null)
    const [UpdateHTPriority, setUpdateHTPRiority] = useState(null)
    const [UpdateHTColor, setUpdateHTColor] = useState(null)
    const [UpdateHTStatus, setUpdateHTStatus] = useState(null)
    const [UpdateHTTextarea, setUpdateHTTextArea] = useState(null)
    const [UpdateHTId, setUpdateHTId] = useState(null)

    const [UpdateJsonName, setUpdateJsonName] = useState(null);

    // USER
    const [AllowField, setAllowField] = useState([])

    // NAVIGATE
    const [MobileToggle, setMobileToggle] = useState(false)

    // --------------------------currentop-------------------------------
    const [COHeading, setCOheading] = useState(null)
    const [COlocation, setCOlocation] = useState(null)
    const [COExpe, setCOExpe] = useState(null)
    const [COPost, setCOPost] = useState(null)
    const [COSalary, setCOSalary] = useState(null)
    const [CODate, setCODate] = useState(null)
    const [COKey, setKey] = useState(null)
    const [CODescription, setCODescription] = useState(null)
    const [COUpdateID, setCOUpdateID] = useState(null)

    const [UpdateMainText, setUpdatemaintex] = useState(null)
    const [UpdateSubtext, setUpdatesubtext] = useState(null)
    const [UpdateId, setUpdateId] = useState(null)

    return (

        <UpdateContex.Provider value={{
            COHeading, setCOheading,
            COlocation, setCOlocation,
            COExpe, setCOExpe,
            COPost, setCOPost,
            COSalary, setCOSalary,
            CODate, setCODate,
            COKey, setKey,
            CODescription, setCODescription,
            COUpdateID, setCOUpdateID,

            UpdateMainText, setUpdatemaintex,
            UpdateSubtext, setUpdatesubtext,
            UpdateId, setUpdateId,

            MobileToggle, setMobileToggle,
            jsonupdateID, setjsonupdateID,
            AllowField, setAllowField,
            jsonupdateContent, setjsonupdateContent,
            UpdateJsonName, setUpdateJsonName,

            UpdateHTTitle, setUpdateHTTitle,
            UpdateHTPriority, setUpdateHTPRiority,
            UpdateHTColor, setUpdateHTColor,
            UpdateHTStatus, setUpdateHTStatus,
            UpdateHTTextarea, setUpdateHTTextArea,
            UpdateHTId, setUpdateHTId,

            UpdateDCIcon, setUpdateDCIcon,
            UpdateDCCardName, setUpdateDCCardName,
            UpdateDCURL, setDCUrl,
            UpdateDCcolor, setDCcolor,
            UpdateDCTbname, setDCTBname,
            UpdateDCTabelcondition, setDCtableCondition,
            UpdateDCNewTab, setDCNewTab,
            UpdateDCPriority, setDCPriority,
            UpdateDCStatus, setDCStatus,
            UpdateDcId, setUpdateDCID,

            UpdateIcon, setUpdateIcon,
            UpdatePageName, setUpdatePageName,
            UpdatePageUrl, setUpdatePageUrl,
            UpdateNewTab, setUpdateNewTab,
            UpdatePriority, setUpdatePriority,
            UpdateFStatus, setUpdateFStatus,
            UpdateFId, setUpdateFId,

            UpdateFontID, setUpdateFontID,
            UpdateFontName, setFontName,
            UpdateFontValue, setFontValue,

            UpdateFooterID, setUpdateFooterID,
            UpdateFooterTitle, setUpdateFooterTitle,
            UpdateFooterTextcontent, setUpdateFooterTextcontent,
            UpdateFooterPriority, setUpdateFooterPriority,
            UpdateFooterBgcolor, setUpdateFooterBgcolor,
            UpdateFooterStatus, setUpdateFooterStatus,

            UpdateCMID, setUpdateCMID,
            UpdateCoMTitle, setUpdateComTitle,
            UpdateComTextcontent, setUpdateComTextcontent,
            UpdateComPriority, setUpdateComPriority,
            UpdateComBgcolor, setUpdateComBgcolor,
            UpdateComStatus, setUpdateComStatus,

            UpdateAMId, setUpdateAMId,
            UpdateAMUpdateFile, setUpdateAMFile,
            UpdateAMTitle, setUpdateAMTitle,
            UpdateAMVideoURL, setUpdateAMVideoURL,
            UpdateAMVideoStatus, setUpdateAMVideoStatus,

            UpdatePVMTitle, setUpdatePVMTitle,
            UpdatePVMPageName, setUpdatePVMPageName,
            UpdatePVMStatus, setUpdatePVMStatus,
            UpdatePVMId, setUpdatePVMId,
            UpdatePVMPriority, setUpdatePVMPriority,

            UpdateCTitle, setUpdateCTitle,
            UpdateCURL, setUpdateCURL,
            UpdateCDetails, setUpdateCDetails,
            UpdateCPriority, setUpdateCPriority,
            UpdateCId, setUpdateCID,
            UpdateCStatus, setUpdateCStatus,
            UpdateCImage, setUpdateCImage,

            UpdatePMId, setUpdatePMId,
            UpdatePMImage, setUpdatePMImage,
            UpdatePMTextarea, setUpdatePMTextArea,
            UpdatePMUrl, setUpdatePMUrl,
            UpdatePMStatus, setUpdatePMStatus,
            UpdatePMPriority, setUpdatePMPriority,
            UpdatePMPlanName, setUpdatePMPlanName,

            UpdatePMGruopName, setUpdatePMGruopName,  //start from here
            UpdatePricemasterCategory, setUpdatePricemasterCategory,
            UpdateRTitle, setUpdateRTitle,
            UpdateRURL, setUpdateRURL,
            UpdateRStatus, setUpdateRStatus,
            UpdateRFile, setUpdateRFile,
            UpdateRId, setUpdateRID,
            UpdataTitle,
            UpdateMMPriority, setUpdateMMPriority,
            UpdateMMStatus, setUpdateMMStatus,
            UpdateMMId, setUpdateMMId,
            UpdateMMCategory_sub, setUpdateMMCategory_sub,
            UpdateMMURL, setUpdateMMURL,
            UpdateMMGruopName, setUpdateMMCruopName,
            UpdateMMTextArea, setUpdateTextArea,
            UpdateMMImage, setUpdateMMImage,
            setUpdateTitle,
            UpdateCardTitle, setCardTitle,
            UpdateCardImage, setUpdateCardImage,
            UpdateCardHeading, setUpdateCardHeading,
            UpdateCardStatus, setUpdateCardStatus,
            UpdateCardPriority, setUpdateCardPriority,
            UpdateCardId, setCardId,
            UpdateCardURL, setCardURL,
            UpdateCardWidth, setUpdateCardWidth,
            UpdateCardDetails, setUpdateCardDetails,
            UpdateFile,
            UpdateTDesignation, setDesignation,
            UpdateTImage, setTImage,
            UpdateTPriority, setTpriority,
            UpdateTStatus, setTstatus,
            UpdateTURL, setTurl,
            Tid, setTid,
            UpdateCMTitle, setUpdateCMTitle,
            UpdateCMContent, setUpdateCMContent,
            UpdateCMStatus, setUpdateCMStatus,
            UpdateCMPriority, setUpdateCMPriority,
            UpdateCMId, setUpdateCMId,
            UpdateBgcolor, setBgcolor,
            setUpdateFile, UpdateVMId, setUpdateVMId, UpdateVMTitle, setVMTitle, UpdateVMURL, setVMUrl, UpdateVMStatus, setVMStatus, UpdateVMPriority, setUpdateVMPriority, UpdateStatus, setUpdateStatus, UpdateID, setUpdateID, UpdateURL, setUpdateURL, UpdateTName, SetTname, UpdateTDetails, SetUpdateTDetails,
            UpdateSN, setUpdateSN,
            UpdateFN, setUpdateFN,
            UpdateTCID, setUpdateTCID,
            UpdateMN, setUpdateMN,
            UpdateTCLINK, setUpdaTCLink,
            UpdateTCDOB, setUpdaTCDOB,
            UpdateTCAddmission, setTCAddmission,
            UpdateTCClassLeft, setUpdaTCClassLeft,
            UpdateTCNo, setUpdateTCNo,
            UpdateLeavingDate, setUpdateLeavingDate,
            UpdateTCRemark, setUpdateTCRemark,
            UpdateTCStatus, setUpdateTCStatus
        }} >
            {children}
        </UpdateContex.Provider>


    )
}


export default UpdateProvider;

