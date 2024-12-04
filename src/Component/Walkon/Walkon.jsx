import React, { useEffect, useState } from 'react'
import WalkonForm from './WalkonForm'
import WalkonMain from './WalkonMain'
import Swal from 'sweetalert2'
import axios from 'axios'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'

const Walkon = () => {
    const [cookie, setcookie, removecookie] = useCookies(['token'])
    const [alldata, setalldata] = useState([])

    const fetchdata = async () => {
        debugger
        try {
            await axios.get(`${Backend_Url}/walkon/getall`, {
                headers: {
                    'Authorization': 'Bearer ' + cookie.token
                }
            }).then((res) => { setalldata(res.data.data) })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error while fetching',
                text: 'There was a problem fetching the data.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            })
        }
    }


    return (
        <>
            <div className="App">
                {/* <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div> */}
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">Walk On</h1>
                        </div>
                        <div className="form">
                            <WalkonForm setalldata={setalldata} fetchdata={fetchdata} />
                        </div>
                        <div className="Gallery">
                            <WalkonMain setalldata={setalldata} fetchdata={fetchdata} alldata={alldata} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Walkon