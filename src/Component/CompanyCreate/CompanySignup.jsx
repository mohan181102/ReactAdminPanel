import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Backend_Url from '../../config/config'
import Swal from 'sweetalert2'
import logo from "../../Assests/Techcherrylogo.png"

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

            const response = await axios.post(`${Backend_Url}/ClientDetails/create`, data);
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
        // <div className={`w-screen  h-screen absolute top-0 flex items-center z-[1000] bg-[#007cff91] justify-center`}>
        //     <form onSubmit={(e) => createcompany(e)} className={`showdelay w-auto min-w-[300px] h-auto px-[30px] py-[12px] flex items-center shadow-md bg-[#bbbbbb] border gap-[20px] border-[#ccc] justify-center flex-col`}>
        //         <h2 className={`w-full flex items-center justify-center text-2xl font-[700] font-serif border-b-2 border-b-black`}>Create Company</h2>
        //         <div className={`w-[200px]`}>
        //             <label className={`w-full h-auto flex items-center justify-start`}>Company Name:- </label>
        //             <input required name='companyname' onChange={(e) => setCompanyName(e.target.value)} className={`!w-full h-auto`} type="text" placeholder="company name" />
        //         </div>
        //         <div className={`w-[200px]`}>
        //             <label className={`w-full h-auto flex items-center justify-start`}>SiteUrl:- </label>
        //             <input required name='siteurl' onChange={(e) => setsiteurl(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="siteurl" />
        //         </div>
        //         {
        //             //     <div className={`w-[200px]`}>
        //             //     <label className={`w-full h-auto flex items-center justify-start`}>DB Name:- </label>
        //             //     <input required name='DbName' onChange={(e) => setDbName(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="Company Code" />
        //             // </div>

        //             //RESTRICTION

        //             // <div className={`w-[200px]`}>
        //             //     <label className={`w-full h-auto flex items-center justify-start`}>Restriction:- </label>
        //             //     <select onChange={(e) => setRestriction(e.target.value)} className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`}>
        //             //         <option>True</option>
        //             //         <option>False</option>
        //             //     </select>
        //             // </div>
        //         }

        //         <button type="submit" className={`w-full h-auto flex items-center font-serif  justify-center text-xl mt-[20px] bg-green-500 py-[5px] px-[5px] transition-all  hover:bg-green-400 rounded-md`}>Create</button>

        //     </form>

        //     {/* new company */}
        //     <div className={`w-full flex absolute bottom-[30px] right-[30px] items-center justify-end h-auto`}>
        //         <button onClick={() => navigate("/login")} className={` font-bold text-xl bg-[#bbbbbb] p-2 rounded-md flex items-center justify-center`}>
        //             Login?
        //         </button>
        //     </div>
        // </div>

        <>
            <section class="bg-gray-50 dark:bg-gray-900 fixed top-0 w-[100%] h-[100vh]">
                <div class="flex w-[39%] flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-[130px] h-[3rem] mr-2" src={logo} alt="logo" />

                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create Your Company
                            </h1>
                            <form onSubmit={(e) => createcompany(e)} class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="compcode" class="flex justify-start mb-2   text-sm font-medium text-gray-900 dark:text-white">Company Name:-</label>
                                    <input type="text" onChange={(e) => setCompanyName(e.target.value)} name='companycode' id="compcode" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="company name" required="" />
                                </div>
                                <div>
                                    <label for="email" class="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white">SiteUrl:-</label>
                                    <input onChange={(e) => setsiteurl(e.target.value)} type="text" name='username' id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="siteurl" required="" />
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>

                                </div>
                                <button type="submit" class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-[18px] px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Company</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Login Company? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CompanySignup