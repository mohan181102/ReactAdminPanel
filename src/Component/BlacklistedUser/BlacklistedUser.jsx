import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { Icon } from '@iconify/react/dist/iconify.js'
import Swal from 'sweetalert2'

const BlacklistedUser = () => {
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [User, setallUser] = useState([])
    const [AllBlacklisted, setAllBlacklisted] = useState([])
    const [selectaction, setselectaction] = useState(null)
    const [AllBlacklistedtoken, setAllBlacklistedtoken] = useState([])

    // GET ALL USER
    const alluser = async () => {
        try {
            await fetch(`${Backend_Url}/User/getAllUser`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token
                    }
                }
            ).then((res) => res.json())
                .then((res) => setallUser(res.data))

        } catch (error) {
            console.log(`error getting user list`)
        }
    }

    // ADD TO BLACKLISTED
    const getblacklisted = async () => {
        try {
            await fetch(`${Backend_Url}/blacklistToken/getAll`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => setAllBlacklisted(res.data))
                .then(() => {
                    AllBlacklisted.map((item) => {
                        setAllBlacklistedtoken((prev) => [...prev, item.BlackToken])
                    })
                })



        } catch (error) {
            console.log(`error adding blacklisted`)
        }
    }



    // ADD TO BLACKLIST 
    const Addtoblacklist = async (token) => {
        const confirm = window.confirm('are you sure you want to add this user to the blacklist?')
        console.log(token)
        if (!confirm) {
            return
        }

        try {
            await axios.post(`${Backend_Url}/blacklistToken/create`,
                {
                    UserToken: token
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token,
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((res) => res.status == 200 && window.location.reload())


        } catch (error) {
            console.log(error)
            console.log('Error adding blacklisted')
        }
    }


    // DELETE FROM BLACKLIST
    const DeleteFromBlacklist = async (token) => {
        try {
            await axios.delete(`${Backend_Url}/blacklistToken/delete/${token}`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token,
                    }
                }
            ).then((res) => res.status == 200 && alert('Blacklist deleted successfully'))

        } catch (error) {
            console.log(error)
        }
    }

    const handledeleteUser = async (id) => {
        try {
            debugger
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to undo this action!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`${Backend_Url}/User/deleteUser/${id.Username}`, {
                        headers: {
                            'authorization': 'Bearer ' + cookie.token,
                        }
                    }).then((res) => {
                        console.log(res.data)
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The item has been deleted successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        alluser()
                    })

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log('Delete canceled');
                }
            });


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { alluser() }, [])
    useEffect(() => { getblacklisted() }, [])

    const PerUser = () => {
        return User.map((item, index) => {


            if (item.Role == 'Admin') {
                return
            }
            return (
                <>
                    <tr>
                        <td className={`border border-[#ccc]`}>
                            {index + 1}
                        </td>
                        <td className={`border border-[#ccc]`}>
                            {item.Username}
                        </td>
                        <td>
                            {AllBlacklisted.find((blacklistedItem) => blacklistedItem.BlackToken === item.Token) ?
                                <p className={`w-auto h-full text-white flex items-center justify-start pl-[20px] bg-red-500`}>Blacklisted</p> :
                                <p className={`w-auto h-full text-white flex items-center justify-start pl-[20px] bg-green-500`}>Not Blacklisted</p>
                            }
                        </td>
                        <td className={`border border-[#ccc]`}>
                            <select onChange={(e) => e.target.value == "Blacklist" ? Addtoblacklist(item.Token) : null} className={` `}>
                                <option onClick={() => DeleteFromBlacklist(item.Token)}>Not Blacklist</option>
                                <option>Blacklist</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handledeleteUser(item)}>
                                <Icon icon="mingcute:delete-fill" style={{ color: "red" }} />
                            </button>
                        </td>
                    </tr>
                </>
            )
        })
    }


    return (
        <div className="App sm:items-center sm:justify-center sm:!flex-col">
            <div className={`sidebar   fixed pb-[50px] sm:!h-screen sm:absolute sm:!min-w-[100%] sm:!max-w-[100%] `}>
                <Sidebar />
            </div>
            <div className="body-content body-cm sm:!w-full sm:!static sm:pt-[70px] absolute w-[77%] right-0 ">
                <div>
                    <div className="Header">
                        <h1 className="heading sm:!text-[25px]">User Blacklisted</h1>
                    </div>
                    <div className="Gallery">
                        <table className={`border border-[#ccc]`}>
                            <thead>
                                <th>SNo.</th>
                                <th>UserName</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {User.length != 0 && PerUser()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlacklistedUser