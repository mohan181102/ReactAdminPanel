import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const RouteAccessCheck = ({ children }) => {
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [allowfield, setallowfield] = useState([])

    const AllField = [
        {
            name: "General Setting",
            route: "/GeneralSetting"
        },
        {
            name: "Slider",
            route: "/slider"
        },
        {
            name: "Academic Master",
            route: "/academicmaster"
        },
        {
            name: "Course Master",
            route: "/coursemaster"
        },
        {
            name: "Footer",
            route: "/footer"
        },
        {
            name: "FontAwesome",
            route: "/fontawesome"
        },
        {
            name: "Flash news",
            route: "/flash-news"
        },
        {
            name: "Gallery",
            route: "/gallery"
        },
        {
            name: "Menu Master",
            route: "/menumaster"
        },
        {
            name: "Testimonial",
            route: "/testimonials"
        },
        {
            name: "Page View Master",
            route: "/pageviewmaster"
        },
        {
            name: "Client",
            route: "/client"
        },
        {
            name: "Plan and Prices Master",
            route: "/pricemaster"
        },
        {
            name: "Result",
            route: "/results"
        },
        {
            name: "Download",
            route: "/Download"
        },
        {
            name: "TC Issued",
            route: "/tcissued"
        },
        {
            name: "Contact",
            route: "/contact"
        },
        {
            name: "HP BodyCard",
            route: "/homepageBodycard"
        },
        {
            name: "HP Content Master",
            route: "/homepage/contentmaster"
        },
        {
            name: "Video Master",
            route: "/videoMaster"
        },
        {
            name: "Event",
            route: "/Event"
        },
        {
            name: "JsonObject",
            route: "/jsonobject"
        },
        {
            name: "Employee",
            route: "/employee"
        },
        {
            name: "Career",
            route: "/career"
        },
        {
            name: "Advertisment Master",
            route: "/advertismentmaster"
        },
        {
            name: "Product Category Master",
            route: "/product-category-master"
        },
        {
            name: "Product Master",
            route: "/productMaster"
        },
        {
            name: "News & Notice",
            route: "/newsnotice"
        }

    ]

    useEffect(() => {
        if (!cookie.token) {
            window.location.replace("/login");
        } else {
            const decode_token = jwtDecode(cookie.token);
            setallowfield(decode_token.AllowField);
        }
    }, [cookie.token]);

    if (!cookie?.token) {
        return window.location.replace("/login")
    }

    const isAuthorized = () => {
        const currentPath = window.location.pathname;
        const currentField = AllField.find(item => item.route === currentPath);
        return currentField ? allowfield.includes(currentField.name) : false;


    };


    // if (!cookie.token) {
    //     return null; // Return null if no token is present to avoid rendering the children
    // }
    const check = isAuthorized()
    debugger
    if (allowfield != undefined && allowfield.length != 0) {

        return check || allowfield?.includes("all") ? (children) : alert('Not authorized')
    } else {
        return null
    }
}

export default RouteAccessCheck