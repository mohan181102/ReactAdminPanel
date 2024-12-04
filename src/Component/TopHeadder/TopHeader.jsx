import React, { useContext, useEffect, useState } from 'react'
import "./TopHeader.css"
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import UpdateProvider from '../CreateContex/ContexProvider'
import UpdateContex from '../CreateContex/CreateContex'
import axios from 'axios'
import Backend_Url from '../../config/config'
import { jwtDecode } from 'jwt-decode'
import UserCreateForm from '../UserCreateForm/UserCreateForm'

const TopHeader = ({ sidebartogle, setsidebartogle }) => {
    const [dropdown, setshowdropdown] = useState(null)
    const [allowfield, SetallowField] = useState([])
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { MobileToggle, setMobileToggle } = useContext(UpdateContex)
    const [CompanyName, SetCompanyName] = useState(null)
    const [Username, setUsername] = useState(null)
    const [UserCreateToggle, setUserCreateToggle] = useState(false)

    useEffect(() => {
        console.log(allowfield)

    }, [allowfield])


    const setting = [
        {
            name: "General Settings",
            icon: "icon-park-solid:setting",
            navigate: "/GeneralSetting",
            allow: allowfield.includes("General Setting") || allowfield.includes("all")
        },
        {
            name: "Category Master",
            icon: "ic:twotone-category",
            navigate: "/menumaster",
            allow: allowfield.includes("Menu Master") || allowfield.includes("all")
        },
        {
            name: "User Authentication",
            icon: "tabler:lock-filled",
            navigate: "/auth",
            allow: allowfield.includes("User Authentication") || true
        },
        {
            name: "User Blacklisted",
            icon: "zondicons:block",
            navigate: "/blacklisted",
            allow: true
        },
        {
            name: "Iconify",
            icon: "simple-icons:iconify",
            navigate: "/fontawesome",
            allow: allowfield.includes("Iconify") || allowfield.includes("all")
        },
        {
            name: "Dashboard Pages",
            icon: "fluent:board-28-filled",
            navigate: "/dashboardpage",
            allow: allowfield.includes("Dashboard Pages") || allowfield.includes("all")
        },
        {
            name: "Front end page",
            icon: "fluent-mdl2:page-solid",
            navigate: "/frontendpage",
            allow: allowfield.includes("Front end page") || allowfield.includes("all")
        },
        {
            name: "HP Body Cards",
            icon: "fluent-mdl2:page-solid",
            navigate: "/homepageBodycard",
            allow: allowfield.includes("HP Body Cards") || allowfield.includes("all")
        },
        {
            name: "Dashboard Cards",
            icon: "fluent-mdl2:page-solid",
            navigate: "/dashboardcard",
            allow: allowfield.includes("Dashboard Cards") || allowfield.includes("all")
        },
        {
            name: "Footer Master",
            icon: "fluent-mdl2:page-solid",
            navigate: "/footer",
            allow: allowfield.includes("Footer Master") || allowfield.includes("all")
        },
        {
            name: "Footer",
            icon: "fluent-mdl2:page-solid",
            navigate: "/footer",
            allow: allowfield.includes("Footer") || allowfield.includes("all")
        },
        {
            name: "HP Body Cards",
            icon: "fluent-mdl2:page-solid",
            navigate: "/homepageBodycard",
            allow: allowfield.includes("Footer")
        },
        {
            name: "Clients",
            icon: "fluent-mdl2:page-solid",
            navigate: "/client",
            allow: allowfield.includes("Clients") || allowfield.includes("all")
        },
        {
            name: "HP Header Top",
            icon: "fluent-mdl2:page-solid",
            navigate: "/headertop",
            allow: allowfield.includes("HP Header Top") || allowfield.includes("all")
        },

    ]

    useEffect(() => {
        if (cookie.token) {
        }
    }, [])

    // DECRYPT TOKEN
    const loginUser = jwtDecode(cookie?.token)
    const LoginUserName = loginUser.Urole

    // DELETE SESSIONS
    const logout = function () {
        removeCookie('token')
    }

    // GETCOMPANY DETAILS
    const fetchdata = async (req, res) => {
        try {
            const token = cookie?.token
            const data = jwtDecode(token)

            // setcompany
            const setnames = (data) => {
                SetCompanyName(data.data.data.Name)
                const loginuser = jwtDecode(cookie?.token)
                setUsername(loginuser.Uname)
            }

            await axios.get(`${Backend_Url}/ClientDetails/login/${data.compCode}`,
                {
                    headers: {
                        'authorization': 'Bearer ' + token
                    }
                }
            ).then((data) => setnames(data))

            // GET USER DETAILS
            await axios.post(`${Backend_Url}/User/withusername`,
                {
                    'username': data.Uname
                },
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie?.token,
                    }
                }
            ).then((data) => SetallowField(data.data.data.AllowField))

        } catch (error) {
            console.log(error)
            alert(`Error while fetching company details: Top Headers`)
        }
    }

    useEffect(() => { cookie.token && fetchdata() }, [])
    return (
        <div className={`top-container !bg-[#f8f8f8] border-b border-b-[#e7e7e7] flex items-center justify-end fixed`}>
            <div className={`w-full h-full flex items-center justify-between`}>
                {/* RIGHT SIDE WITH NAME */}
                <div className={`w-auto h-full p-[10px] flex items-center cursor-default justify-center`}>
                    <h2 className={`font-bold text-[20px] sm:text-[15px] text-[#23527c] p-1`}>
                        {CompanyName}
                    </h2>
                </div>



                {/* LEFT SIDE */}
                <div className={`h-full w-auto flex items-center justify-center`}>
                    {/* username */}
                    <h2 className={`font-bold text-[20px] sm:text-[15px] text-[#23527c] p-1`}>
                        {Username}
                    </h2>
                    <div onClick={(e) => dropdown != "setting" ? setshowdropdown("setting") : setshowdropdown(null)} className={`w-auto cursor-pointer h-full hover:bg-[#eee] text-[#23527c]`}>
                        <div className={`w-auto relative flex items-center justify-center h-full px-[12px] text-2xl`}>
                            <Icon icon="icon-park-solid:setting" className={`text-[20px]`} />
                            <Icon className={`text-sm`} icon="eva:arrow-down-fill" />
                        </div>
                        <div className={`absolute overflow-y-scroll  border  border-[#eee] top-[50px] flex items-center justify-start text-left flex-col h-[500px] z-20 ${dropdown == "setting" ? "block" : "hidden"} bg-[#f8f8f8]  min-w-[100px] right-[10px] h-auto p-[10px]`}>
                            {
                                setting.map((item, index) => {
                                    if (loginUser.Urole == 'staff' && item.name == "User Authentication") {
                                        return null
                                    }

                                    if (item.name == "User Blacklisted" && loginUser.Urole == "staff") {
                                        return null
                                    }

                                    return (
                                        <div key={index} onClick={() => item.allow || LoginUserName != 'Admin' ? navigate(item.navigate) : alert("Not allow to access this setting!")} className={`w-auto cursor-pointer ${item.allow || loginUser.Urole == 'Admin' ? "" : " opacity-50"} font-bold  min-w-[200px] text-[15px] hover:bg-[#e7e7e7] h-auto flex items-center justify-start gap-2 p-[10px] text-sm`}>
                                            <Icon icon={item.icon} />
                                            <p>{item.name}</p>
                                            {
                                                !item.allow && LoginUserName != 'Admin' && <span> <Icon icon="mdi:lock" /></span>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div onClick={() => setshowdropdown(null)} className={`${dropdown == "setting" ? " absolute" : " hidden"} z-10 top-[50px] left-0 right-0 bg-transparent w-screen h-screen`}>

                        </div>
                    </div>


                    <div onClick={(e) => dropdown != "user" ? setshowdropdown("user") : setshowdropdown(null)} className={`w-auto cursor-pointer     h-full hover:bg-[#eee] text-[#23527c]`}>
                        <div className={`w-auto  relative flex items-center justify-center h-full px-[12px] text-2xl`}>
                            <Icon icon="bxs:user" className={`text-[20px]`} />
                            <Icon className={`text-sm`} icon="eva:arrow-down-fill" />
                        </div>
                        <div className={`absolute top-[50px] flex-col  bg-[#f8f8f8] items-start border z-[11] border-[#eee] ${dropdown == "user" ? "block" : "hidden"}  min-w-[100px] right-[10px] h-auto  `}>
                            <div className={`flex p-[10px] items-center hover:bg-[#e7e7e7] justify-center`}>
                                <Icon className={`text-xl h-full flex items-center justify-center  `} icon="tabler:logout" />
                                <p onClick={() => logout()} className={`w-fit cursor-pointer flex items-center font-bold h-full justify-center text-center`}>Logout</p>
                            </div>
                            {
                                LoginUserName == "Admin" && <div onClick={() => setUserCreateToggle((prev) => !prev)} className={`w-auto p-[10px] hover:bg-[#e7e7e7] h-auto flex items-center justify-center`}>
                                    <p className={`w-fit cursor-pointer flex items-center font-bold h-full justify-center text-center`}>New User?</p>
                                </div>
                            }
                        </div>

                        <div onClick={() => setshowdropdown(null)} className={`${dropdown == "user" ? " absolute" : " hidden"}  z-10 top-[50px]     right-0 bg-transparent absolute w-screen h-screen`}>

                        </div>
                    </div>

                    {/* responsive btn */}
                    <button onClick={() => setsidebartogle((prev) => !prev)} className={` hidden text-[#23527c] w-[50px] sm:flex  items-center justify-center h-[50px] text-xl bg-transparent top-[65px] z-20 right-[20px]`}>
                        {
                            !sidebartogle ? <Icon
                                icon={"fa:bars"}
                            /> : <Icon icon="icomoon-free:cross" />
                        }
                    </button>
                </div>
            </div>
            <UserCreateForm toggle={UserCreateToggle} settoggle={setUserCreateToggle} />
        </div>
    )
}

export default TopHeader