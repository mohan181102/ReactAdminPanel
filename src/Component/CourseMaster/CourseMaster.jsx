import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import CourseMasterForm from './CourseMasterForm'
import CourseMasterMain from './CourseMasterMain'
import { useCookies } from 'react-cookie'
import Backend_Url from '../../config/config'

const CourseMaster = () => {
    const [cookie, setcookie, removeCookie] = useCookies(['token'])
    const [allcontent, setallcontent] = useState([])
    useEffect(() => { fetchdata() }, [])

    const fetchdata = async (req, res) => {

        try {
            await fetch(`${Backend_Url}/coursemaster/getAll`,
                {
                    method: 'GET',
                    headers: {
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => setallcontent(res.data))
        } catch (error) {
            console.log(error)
            return alert({ message: 'Error while fetching data', error })
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
                        <h1 className="heading">Course Master</h1>
                    </div>
                    <div className="form">
                        <CourseMasterForm fetchdata={fetchdata} allcontent={allcontent} />
                    </div>
                    <div className="Gallery">
                        <CourseMasterMain fetchdata={fetchdata} allcontent={allcontent} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseMaster