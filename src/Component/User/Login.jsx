import React, { useState } from 'react'
import Backend_Url from '../../config/config'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import logo from "../../Assests/Techcherrylogo.png"
import { Icon } from '@iconify/react/dist/iconify.js'

const Login = () => {
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)
    const [CompanyCode, setCompany] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(cookie)
        console.log(username, password)
        const setExpires = new Date()
        setExpires.setHours(setExpires.getHours() + 1)
        try {
            const result = await axios.post(`${Backend_Url}/User/getOneUser`,
                {
                    'username': username,
                    "companyCode": CompanyCode,
                    'password': password
                }
            )
            if (result.status === 200) {
                console.log(result.data)
                const token = result.data.token
                // Cookies.set('token', token, { httpOnly: true, })
                setCookie("token", token, { httpOnly: false, expires: setExpires, sameSite: 'None', secure: true })
                window.alert(`Log in successfully !`)
                navigate("/")
            } else {
                return window.alert(`${result?.message}`)
            }
        } catch (error) {
            console.log("Error for login user" + error)
            window.alert(`Log in failed. Please try again`, error.message)
        }
    }
    const [passwordtype, setpasswordtype] = useState(null)
    const handlepasswordshow = () => {
        debugger
        const password = document.getElementById('password')
        const type = password.getAttribute('type')
        if (type == "password") {
            password.setAttribute('type', 'string')
            setpasswordtype("password")
        } else {
            password.setAttribute('type', 'password')
            setpasswordtype("text")
        }
        console.log(type)
        // password.setAttribute('')
    }
    return (
        // <div className={`w-screen  h-screen absolute top-0 flex items-center z-[1000] bg-[#007cff91] justify-center`}>
        //     <form onSubmit={(e) => handlesubmit(e)} className={`showdelay w-auto h-auto px-[30px] py-[12px] flex items-start shadow-md bg-[#bbbbbb] border gap-[20px] border-[#ccc] justify-center flex-col`}>
        //         <h2 className={`w-full flex items-center justify-center text-2xl font-[700] font-serif border-b-2 border-b-black`}>Log In</h2>
        //         <div className={`w-[200px]`}>
        //             <label className={`w-full h-auto flex items-center justify-start`}>Username:- </label>
        //             <input required onChange={(e) => setusername(e.target.value)} name='username' className={`!w-full h-auto`} type="text" placeholder="Username" />
        //         </div>
        //         <div className={`w-[200px]`}>
        //             <label className={`w-full h-auto flex items-center justify-start`}>Password:- </label>
        //             <input required onChange={(e) => setpassword(e.target.value)} name='password' className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="password" placeholder="Password" />
        //         </div>
        //         <div className={`w-[200px]`}>
        //             <label className={`w-full h-auto flex items-center justify-start`}>Company Code:- </label>
        //             <input required onChange={(e) => setCompany(e.target.value)} name='companycode' className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="Company Code" />
        //         </div>
        //         <button type="submit" className={`w-full h-auto flex items-center font-serif  justify-center text-xl mt-[20px] bg-green-500 py-[5px] px-[5px] transition-all  hover:bg-green-400 rounded-md`}>Login</button>

        //     </form>

        //     {/* new company */}
        //     <div className={`w-full flex absolute bottom-[30px] right-[30px] items-center justify-end h-auto`}>
        //         <button onClick={() => navigate("/creteCompany")} className={` font-bold text-xl bg-[#bbbbbb] p-2 rounded-md flex items-center justify-center`}>
        //             Create Company
        //         </button>
        //     </div>
        // </div>
        <>
            <section class="bg-gray-50 dark:bg-gray-900 fixed top-0 w-[100%] h-[100vh]">
                <div class="flex w-[39%] sm:w-[97%] flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-[130px] h-[3rem] mr-2" src={logo} alt="logo" />

                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={(e) => handlesubmit(e)} class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="compcode" class="flex justify-start mb-2   text-sm font-medium text-gray-900 dark:text-white">Company Code</label>
                                    <input type="text" onChange={(e) => setCompany(e.target.value)} name='companycode' id="compcode" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xAB1234" required="" />
                                </div>
                                <div>
                                    <label for="email" class="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input onChange={(e) => setusername(e.target.value)} type="text" name='username' id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                </div>
                                <div>
                                    <label for="password" class="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">Password
                                        <span onClick={handlepasswordshow} >
                                            {
                                                !(passwordtype === "password") ? <Icon icon="tabler:eye-filled" style={{ width: '20px', height: 'auto', color: "black" }} /> : <Icon icon="mdi:eye-off" style={{ width: '20px', height: 'auto', color: "black" }} />
                                            }


                                        </span>
                                    </label>
                                    <input onChange={(e) => setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 outline-none focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />

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
                                    <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-[18px] px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an company yet? <a href="/creteCompany" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login