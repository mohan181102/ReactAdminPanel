import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Authentication = ({ children }) => {
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

  ])

  useEffect(() => {
    if (!token) return navigate("/login")
    if (token) {
      const decode = jwtDecode(token)
      setTokenallowField(decode.AllowField)
    }
  }, [])

  return children
}

export default Authentication