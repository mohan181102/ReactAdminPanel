import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import Backend_Url from "../config/config";
import Swal from "sweetalert2";


const Sidebar = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  const decode = cookie.token != undefined ? jwtDecode(cookie.token) : null
  const username = decode?.Uname
  const [Field, setField] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => { decode != null && field() }, [])
  useEffect(() => {
    if (cookie.token == undefined || !cookie) {
      window.alert("Please re-login")
      navigate("/login")
    }
  }, [cookie.token])

  const AllField = [
    {
      name: "General Setting",
      icon: "ant-design:setting-filled",
      navigate: "/GeneralSetting",
      disable: !Field.includes("General Setting")
    },
    {
      name: "Flash News",
      icon: "ant-design:setting-filled",
      navigate: "/flash-news",
      disable: !Field.includes("Flash News")
    },
    {
      name: "Slider",
      icon: "ci:slider-02",
      navigate: "/slider",
      disable: !Field.includes("Slider")
    },
    {
      name: "Academic Master",
      icon: "solar:square-academic-cap-2-bold",
      navigate: "/academicmaster",
      disable: !Field.includes("Academic Master")
    },
    {
      name: "Course Master",
      icon: "fluent:book-24-filled",
      navigate: "/coursemaster",
      disable: !Field.includes("Course Master")
    },
    {
      name: "Footer",
      icon: "fluent:phone-footer-arrow-down-20-filled",
      navigate: "/footer",
      disable: !Field.includes("Footer")
    },
    {
      name: "FontAwesome",
      icon: "simple-icons:iconify",
      navigate: "/fontawesome",
      disable: !Field.includes("FontAwesome")
    },
    {
      name: "JsonObject",
      icon: "material-symbols-light:file-json-rounded",
      navigate: "/jsonobject",
      disable: !Field.includes("JsonObject")
    },
    {
      name: "Employee",
      icon: "clarity:employee-solid",
      navigate: "/employee",
      disable: !Field.includes("Employee")
    },
    {
      name: "Career",
      icon: "tabler:brightness-up-filled",
      navigate: "/career",
      disable: !Field.includes("Career")
    },
    {
      name: "Gallery",
      icon: "solar:gallery-bold",
      navigate: "/gallery",
      disable: !Field.includes("Gallery")
    },
    {
      name: "Menu Master",
      icon: "ic:sharp-menu-book",
      navigate: "/menumaster",
      disable: !Field.includes("Menu Master")
    },
    {
      name: "Testimonial",
      icon: "dashicons:testimonial",
      navigate: "/testimonials",
      disable: !Field.includes("Testimonial")
    },
    {
      name: "Page View Master",
      icon: "foundation:page-edit",
      navigate: "/pageviewmaster",
      disable: !Field.includes("Page View Master")
    },
    {
      name: "Client",
      icon: "bi:people-fill",
      navigate: "/client",
      disable: !Field.includes("Client")
    },
    {
      name: "Plan and Prices Master",
      icon: "solar:tag-price-bold",
      navigate: "/pricemaster",
      disable: !Field.includes("Plan and Prices Master")
    },
    {
      name: "Result",
      icon: "carbon:result-new",
      navigate: "/results",
      disable: !Field.includes("Result")
    },
    {
      name: "Download",
      icon: "ic:round-download",
      navigate: "/Download",
      disable: !Field.includes("Download") || !Field.includes("all")
    },
    {
      name: "TC Issued",
      icon: "fluent:certificate-32-filled",
      navigate: "/tcissued",
      disable: !Field.includes("TC Issued") || !Field.includes("all")
    },
    {
      name: "Contact",
      icon: "bxs:contact",
      navigate: "/contact",
      disable: !Field.includes("Contact") || !Field.includes("all")
    },
    {
      name: "Advertisment Master",
      icon: "bxs:contact",
      navigate: "/advertismentmaster",
      disable: !Field.includes("Advertisment Master")
    },
    {
      name: "HP BodyCard",
      icon: "fa6-solid:id-card",
      navigate: "/homepageBodycard",
      disable: !Field.includes("HP BodyCard") || !Field.includes("all")
    },
    {
      name: "HP Content Master",
      icon: "ic:twotone-message",
      navigate: "/homepage/contentmaster",
      disable: !Field.includes("HP Content Master") || !Field.includes("all")
    },
    {
      name: "Product Category Master",
      icon: "ic:twotone-message",
      navigate: "/product-category-master",
      disable: !Field.includes("Product Category Master")
    },
    {
      name: "Video Master",
      icon: "fluent:video-16-filled",
      navigate: "/videoMaster",
      disable: !Field.includes("Video Master") || !Field.includes("all")
    },
    {
      name: "Product Master",
      icon: "fluent:video-16-filled",
      navigate: "/productMaster",
      disable: !Field.includes("Product Master")
    },
    {
      name: "Event",
      icon: "ic:round-event",
      navigate: "/Event",
      disable: !Field.includes("Event") || !Field.includes("all")
    },
    {
      name: "News & Notice",
      icon: "ooui:help-notice-ltr",
      navigate: "/newsnotice",
      disable: !Field.includes("News & Notice") || !Field.includes("all")
    }

  ]

  // fetch field
  const field = async () => {

    try {
      await axios.get(`${Backend_Url}/User/getbyusername/${username}`, {
        headers: {
          'authorization': 'Bearer ' + cookie.token
        }
      })
        .then((res) => setField(res.data.data.AllowField))


    } catch (error) {
      console.log(error)
    }
  }


  // -----------------------sync database -----------------------
  const synchandler = async (e) => {
    try {
      // const confirm = window.confirm('While process any intereption will cost lost all data')
      // if (!confirm) {
      //   return null
      // }

      Swal.fire({
        title: 'Warning!',
        text: 'While process any intereption will cost lost all data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, go ahead!',
        cancelButtonText: 'No, cancel!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request.',
            showConfirmButton: false,  // Hide the confirm button
            allowOutsideClick: false,  // Disable clicking outside the Swal to close it
            didOpen: () => {
              // You can simulate a process with a delay here, or make an AJAX call
              // Simulating a 2-second process
            }
          });

          debugger
          await axios.post(`${Backend_Url}/sync/v1/sync-models`, {}, {
            headers: {
              'authorization': 'Bearer ' + cookie.token
            }
          }).then((res) => {
            console.log(res)

            if (res.status == 200) {
              Swal.fire({
                title: 'Done!',
                text: 'Your request has been processed successfully.',
                icon: 'success',
              });
            }
            alert('Model sync successfully!')
          })
        } else {
          Swal.fire(
            'Cancelled',
            'Your action has been cancelled.',
            'error'
          )

          return
        }
      });


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className="sidebar-container bg-[#f8f8f8]">
        {/* BTN FOR RESPONSIVE */}

        {/* <h1 className="text-center">Sidebar Menu</h1> */}
        <div className="">
          <ul className={`sidebar-ul sm:!w-full pb-[90px]`}>
            <li className={`border px-[10px] sm:w-full py-[5px] ${location.pathname == "/dashboard" && "!bg-[#eee]"} cursor-pointer hover:bg-[#eee] flex items-center justify-start border-[#eee] w-full`}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "grey" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                })}

              >
                <div className=" w-auto h-auto flex items-center justify-start gap-[4px]">
                  <div>
                    <Icon

                      icon="clarity:dashboard-solid"

                      className={` text-[#23527c] !text-[20px]`}
                    />
                  </div>
                  <div className={`text-[15px] text-[#23527c] font-[550]`}>Dashboard</div>
                </div>
              </NavLink>
            </li>

            {
              AllField.map((item) => {


                return (
                  <>
                    <li className={`border px-[10px] py-[5px] ${location.pathname == item.navigate ? "bg-[#eee]" : ""} ${item.disable && !Field.includes("all") ? " cursor-not-allowed opacity-50" : ""} cursor-pointer hover:bg-[#eee] flex items-center justify-start border-[#eee] w-full`}>
                      <NavLink
                        to={item.disable && !Field.includes("all") ? null : item.navigate}
                        style={({ isActive }) => ({
                          textDecoration: "none",
                          color: isActive ? "grey" : "inherit",
                          fontWeight: isActive ? "bold" : "normal",
                        })}
                        className={`${item.disable && !Field.includes("all") ? " cursor-not-allowed" : ""}`}
                      >
                        <div className=" w-auto h-auto flex items-center justify-start gap-[4px]">
                          <div>
                            <Icon

                              icon={item.icon}
                              className={` text-[#23527c] !text-[20px]`}
                            />
                          </div>
                          <div className={`text-[15px] text-[#23527c] font-[550]`}>{item.name}</div>
                          {
                            item.disable && !Field.includes("all") &&
                            <span className={`w-auto h-auto p-[5px] rounded-md bg-white`}>
                              <Icon icon="mdi:lock" />

                            </span>
                          }
                        </div>
                      </NavLink>

                    </li>
                  </>
                )
              })
            }
            <li className={`border px-[10px] py-[5px]    hover:bg-[#eee] flex items-center justify-start border-[#eee] w-full`}>
              <button onClick={synchandler} className={`flex items-center font-[700] text-[#23527c] justify-center gap-1 `}>
                <Icon icon="hugeicons:connect" style={{ color: "black" }} />
                Sync Database
              </button>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
