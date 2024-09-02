import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackendUrl from '../../config/URL.json'
import Swal from 'sweetalert2'


const CompanySignup = () => {
    const navigate = useNavigate()
    const [CompanyName, setCompanyName] = useState(null)
    const [Siteurl, setsiteurl] = useState(null)
    const [DbName, setDbName] = useState(null)
    const [Restriction, setRestriction] = useState(true)

    // CALL API
    // const createcompany = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const data = {
    //             "Name": CompanyName,
    //             "SiteUrl": Siteurl,
    //             "Restriction": Restriction,
    //             "DbName": DbName
    //         }
    //         await axios.post(`${Backend_Url}/ClientDetails/create`, data)
    //             .then((res) => window.alert(JSON.stringify(res.data.data)))
    //             .then(() => navigate("/login"))

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const createcompany = async (e) => {

        e.preventDefault();
        try {
            const data = {
                "Name": CompanyName,
                "SiteUrl": Siteurl,
                "Restriction": false,
                "DbName": CompanyName
            };

            const response = await axios.post(`${BackendUrl.Backend_Url}/ClientDetails/create`, data);
            const companyData = response.data.data;

            await Swal.fire({
                title: 'Company Created',
                html: `
                    <p>Company Code: <strong>${companyData.CompanyCode}</strong></p>
                    <p>A default user has been created with username <strong>admin</strong>.</p>
                    <button id="copyBtn" class="swal2-confirm swal2-styled">Copy Code</button>
                `,
                showConfirmButton: false,
                didOpen: () => {
                    const copyBtn = Swal.getPopup().querySelector('#copyBtn');
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(companyData.CompanyCode).then(() => {
                            Swal.fire('Copied to clipboard!', '', 'success');
                        });
                    });
                }
            });

            navigate("/login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`w-screen  h-screen absolute top-0 flex items-center z-[1000] bg-[#007cff91] justify-center`}>
            <form onSubmit={(e) => createcompany(e)} className={`showdelay w-auto min-w-[300px] h-auto px-[30px] py-[12px] flex items-center shadow-md bg-[#bbbbbb] border gap-[20px] border-[#ccc] justify-center flex-col`}>
                <h2 className={`w-full flex items-center justify-center text-2xl font-[700] font-serif border-b-2 border-b-black`}>Create Company</h2>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Company Name:- </label>
                    <input required name='companyname' onChange={(e) => setCompanyName(e.target.value)} className={`!w-full h-auto`} type="text" placeholder="company name" />
                </div>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>SiteUrl:- </label>
                    <input required name='siteurl' onChange={(e) => setsiteurl(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="siteurl" />
                </div>
                {
                    //     <div className={`w-[200px]`}>
                    //     <label className={`w-full h-auto flex items-center justify-start`}>DB Name:- </label>
                    //     <input required name='DbName' onChange={(e) => setDbName(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="Company Code" />
                    // </div>

                    //RESTRICTION

                    // <div className={`w-[200px]`}>
                    //     <label className={`w-full h-auto flex items-center justify-start`}>Restriction:- </label>
                    //     <select onChange={(e) => setRestriction(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`}>
                    //         <option>True</option>
                    //         <option>False</option>
                    //     </select>
                    // </div>
                }

                <button type="submit" className={`w-full h-auto flex items-center font-serif  justify-center text-xl mt-[20px] bg-green-500 py-[5px] px-[5px] transition-all  hover:bg-green-400 rounded-md`}>Create</button>

            </form>

            {/* new company */}
            <div className={`w-full flex absolute bottom-[30px] right-[30px] items-center justify-end h-auto`}>
                <button onClick={() => navigate("/login")} className={` font-bold text-xl bg-[#bbbbbb] p-2 rounded-md flex items-center justify-center`}>
                    Login?
                </button>
            </div>
        </div>
    )
}

export default CompanySignup