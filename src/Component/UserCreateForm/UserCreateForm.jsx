import React, { useState } from 'react'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react/dist/iconify.js'

const UserCreateForm = ({ toggle = true, settoggle }) => {
    const [UserName, setUserName] = useState(null)
    const [Password, setpassword] = useState(null)
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    // handlesubmit
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                username: UserName,
                password: Password,
                AllowField: []
            }

            const newuser = await fetch(`${Backend_Url}/User/creatUser`,
                {
                    method: 'POST',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                },
            ).then((res) => {
                res.status == 200 && Swal.fire({
                    title: "User Created!",
                    text: "The user has been successfully created.",
                    icon: "success",
                    confirmButtonText: "OK",

                });
                settoggle(false)
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error!",
                text: "There was a problem creating the user.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    }

    // --------passwordshow------------------
    const [passwordshowstate, setpasswordshowstate] = useState(false)
    const passwordshowhandler = () => {
        const passwordId = document.getElementById('password')
        const attribut = passwordId.getAttribute('type')
        if (attribut == "password") {
            passwordId.setAttribute('type', 'text')
            setpasswordshowstate(true)
        } else {
            passwordId.setAttribute('type', 'password')
            setpasswordshowstate(false)
        }
    }

    if (!toggle) return null

    return (
        <div className={`w-screen  h-screen absolute top-0 flex items-center z-[1000] bg-transparent  justify-center`}>
            <form onSubmit={(e) => handlesubmit(e)} className={`showdelay w-auto h-auto px-[30px] py-[12px] flex items-start shadow-md bg-[#f3f3f3] border gap-[20px] border-[#ccc] justify-center flex-col`}>
                <h2 className={`w-full flex items-center justify-center text-2xl font-[700] font-serif border-b-2 border-b-black`}>New User</h2>
                <div className={`w-[200px]`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Set Username:- </label>
                    <input required onChange={(e) => setUserName(e.target.value)} name='username' className={`!w-full h-auto`} type="text" placeholder="username" />
                </div>
                <div className={`w-[200px] relative`}>
                    <label className={`w-full h-auto flex items-center justify-start`}>Set Password:- </label>
                    <input required onChange={(e) => setpassword(e.target.value)} id='password' name='password' className={`!w-full h-auto py-[10px]   focus:border-[#67a0dd] outline-none border border-[#ccc] rounded-[5px] px-[10px]`} type="password" placeholder="password" />
                    <span onClick={() => passwordshowhandler()} className={`absolute cursor-pointer top-[37px] h-auto right-[10px]`}>
                        <Icon icon={passwordshowstate ? "fa:eye" : "mdi:eye-off"} style={{ color: "black", width: "20px", height: "auto" }} />
                    </span>
                    <span className={`font-[10px] text-red-500`}>password must 8 character</span>
                </div>
                <button type="submit" className={`w-full h-auto flex items-center font-serif  justify-center text-xl mt-[20px] bg-green-500 py-[5px] px-[5px] transition-all  hover:bg-green-400 rounded-md`}>Create User</button>

            </form>

            <div onClick={() => settoggle(false)} className={` absolute w-screen h-screen bg-[black] opacity-50 -z-10`}></div>

        </div>
    )

}

export default UserCreateForm