import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Sidebar from '../Sidebar'

const Authentication = ({ children, setsidebartogle, sidebartogle }) => {
  const token = Cookies.get('token')
  const navigate = useNavigate()
  const [TokenallowField, setTokenallowField] = useState([])
  const [AllField, setAllField] = useState([
    "General Setting",
    "Slider",
    "Academic Master",
    "Course Master",
    "Footer",
    "FontAwesome",
    "Gallery",
    "Menu Master",
    "Testimonial",
    "Page View Master",
    "Client",
    "Plan and Prices Master",
    "Result",
    "Download",
    "TC Issued",
    "Contact",
    "HP BodyCard",
    "HP Content Master",
    "Video Master",
    "Event",
    "CurrentOpenning",
    "Walk On"
  ])

  useEffect(() => {
    if (!token) return navigate("/login")
    if (token) {
      const decode = jwtDecode(token)
      setTokenallowField(decode.AllowField)
    }
  }, [])

  // ------------close sidebar-----------------------
  const location = useLocation()
  useEffect(() => {
    setsidebartogle(false)
  }, [location.pathname])

  return (
    <div className={`App`}>
      <div className={`sidebar fixed pb-[50px] ${!sidebartogle ? "sm:hidden" : "sm:block"}`}>
        <Sidebar />
      </div>

      {children}
    </div>
  )
}

export default Authentication