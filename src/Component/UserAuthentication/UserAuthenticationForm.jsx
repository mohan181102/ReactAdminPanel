import React, { useContext, useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import UpdateContex from '../CreateContex/CreateContex'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const UserAuthenticationForm = () => {
    const [AllUser, setAllUser] = useState([])
    const { AllowField, setAllowField } = useContext(UpdateContex)
    const [SelectedUsername, setSelectedUsername] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {
        fetchdata()
    }, [])

    useEffect(() => {
        // debugger
        console.log(AllowField);
        console.log(cookie.token)
    }, [AllowField])

    const fetchdata = async function () {
        console.log("token", cookie?.token)

        try {
            await fetch(`${Backend_Url}/User/getAllUser`,
                {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token,
                        'content-type': 'application/json'
                    }
                }
            )
                .then((res) => res.json())
                // .then((rs) => console.log(rs))
                .then((res) => setAllUser(res.data))
            // .then((res) => console.log(res))

        } catch (error) {
            console.log(error)
        }
    }

    // changeuser
    const changeuser = async (user) => {
        console.log(user)
        function setstates(res) {
            // setAllowField(res.data.AllowField)
            setAllowField(res.data.data.AllowField)
            console.log(res.data.data.AllowField)
            setSelectedUsername(res.data.data)
        }
        try {

            await axios.post(`${Backend_Url}/User/withusername`,
                {
                    'username': user
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token,
                    }
                }
            )
                .then((res) => setstates(res))

        } catch (error) {
            console.log(error)
            window.alert('error while fetching data')
        }

    }


    // update allowfield after submit
    const SetallowField = async function (e) {
        e.preventDefault()
        const confirm = window.confirm('Do you wish to apply changes to this allowed field?')
        if (!confirm) return

        try {
            await axios.put(`${Backend_Url}/User/updateUser/${null}`,
                {
                    "username": SelectedUsername.Username,
                    "Updateusername": SelectedUsername.Username,
                    "Updatepassword": SelectedUsername.Password,
                    "UpdateAllowField": AllowField
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token,
                    }
                }
            ).then((res) => res.status == 200 ? alert('Update allowfield successfully') : null)
                .then(() => window.location.reload())
        } catch (error) {
            console.log(error)
            alert('Error while updating allowfield')
        }
    }


    return (
        <>
            <div className={`w-full min-h-[90px] p-[10px] rounded-md flex items-center justify-center bg-[#bbbbbb]`}>
                {/*form  */}
                <form onSubmit={(e) => SetallowField(e)} className={`w-full h-full flex items-center justify-start gap-[30px]  `}>
                    {/* select employee */}
                    <select className={` !w-[400px] focus:border-2 focus:border-[#269abc]  rounded-md`} onChange={(e) => changeuser(e.target.value)}>
                        <option className={`text-[15px]  `}>--select--</option>
                        {
                            AllUser?.map((user) => {
                                return (
                                    <>
                                        <option className={` !border !border-[#bbbbbb] text-[15px] `}>{user.Username}</option>
                                    </>
                                )
                            })
                        }
                    </select>

                    {/* submit btn */}
                    <button type='submit' className={`bg-[#31b0d5] px-[30px] font-[650] p-[5px] rounded-md flex items-center justify-center text-white`}>
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}

export default UserAuthenticationForm



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVbmFtZSI6ImFkbWluIiwiVXBhc3N3b3JkIjoiJDJiJDEwJDRuRkczOEdiUWc4SHVJam1RVVZ2ZWVJbDB1aGQzZk1hcWg0OFVJYnQ5YXQ3QndtRGIzZXYyIiwiY29tcENvZGUiOiIweDAwQTEyNjY0IiwiaWF0IjoxNzI0MzI2NTc1fQ.WchPdbwOml-rqF2QLPUk0xWQ5iQCp4SBpHsTFmcVprs