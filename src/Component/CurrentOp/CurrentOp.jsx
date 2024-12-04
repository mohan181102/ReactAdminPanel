import React, { useState } from 'react'
import CurrentOpMain from './CurrentOpMain'
import CurrentOpForm from './CurrentOpForm'
import Backend_Url from '../../config/config'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CurrentOp = () => {
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [allcontent, setallcontent] = useState([])
    const fetchdata = async () => {
        try {
            await axios.get(`${Backend_Url}/currentop/all/cop`, {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }).then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    setallcontent(res.data.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="App">
            {/* <div className="sidebar sidebar-cm">
        <Sidebar />
    </div> */}
            <div className="body-content body-cm">
                <div>
                    <div className="Header">
                        <h1 className="heading">Current Openinng</h1>
                    </div>
                    <div className="form">
                        <CurrentOpForm fetchdata={fetchdata} />
                    </div>
                    <div className="Gallery">
                        <CurrentOpMain allcontent={allcontent} fetchdata={fetchdata} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentOp