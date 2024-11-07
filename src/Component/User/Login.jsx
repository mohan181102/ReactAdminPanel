import React, { useState } from 'react'
import Backend_Url from '../../config/config'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

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


    return (
        <div className={`w-screen  h-screen absolute top-0 flex items-center z-[1000] bg-[#007cff91] justify-center`}>
            <form onSubmit={(e) => handlesubmit(e)} className={`showdelay w-auto h-auto px-[30px] py-[12px] flex items-start shadow-md bg-[#bbbbbb] border gap-[20px] border-[#ccc] justify-center flex-col`}>
                <h2 className={`w-full flex items-center justify-center text-2xl font-[700] font-serif border-b-2 border-b-black`}>Log In</h2>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Username:- </label>
                    <input required onChange={(e) => setusername(e.target.value)} name='username' className={`!w-full h-auto`} type="text" placeholder="Username" />
                </div>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Password:- </label>
                    <input required onChange={(e) => setpassword(e.target.value)} name='password' className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="password" placeholder="Password" />
                </div>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Company Code:- </label>
                    <input required onChange={(e) => setCompany(e.target.value)} name='companycode' className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="text" placeholder="Company Code" />
                </div>
                <button type="submit" className={`w-full h-auto flex items-center font-serif  justify-center text-xl mt-[20px] bg-green-500 py-[5px] px-[5px] transition-all  hover:bg-green-400 rounded-md`}>Login</button>

            </form>

            {/* new company */}
            <div className={`w-full flex absolute bottom-[30px] right-[30px] items-center justify-end h-auto`}>
                <button onClick={() => navigate("/creteCompany")} className={` font-bold text-xl bg-[#bbbbbb] p-2 rounded-md flex items-center justify-center`}>
                    Create Company
                </button>
            </div>
        </div>
    )
}

export default Login