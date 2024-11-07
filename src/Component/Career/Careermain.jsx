import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import * as XLSX from 'xlsx';

const Careermain = () => {
    const [alldata, setalldata] = useState([])
    const [cookie, setcookie, removeCookie] = useCookies(['token'])

    const fetchdata = async function () {
        try {
            debugger
            await fetch(`${Backend_Url}/career/`,
                {
                    method: 'GET',
                    headers: {
                        'content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    }
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setalldata(res)
                })
        } catch (error) {
            console.log(error)
            window.alert('error while fetching data')
        }
    }

    // ----------------------------------deletehandler---------------------------------------
    const deletehandler = async (id) => {
        const confirm = window.confirm(`Are you sure you want to delete this item?`)
        debugger
        if (!confirm) {
            return
        }

        try {
            await axios.delete(`${Backend_Url}/career/${id}`, {
                headers: {
                    'content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                }
            }).then(() => {
                alert(`Selected Employee data deleted successfully!`)
                fetchdata();
            })
        } catch (error) {
            console.log(error)
            alert(`Error while deleting employee`)
        }
    }

    useEffect(() => {
        fetchdata();
    }, [])

    useEffect(() => {
        console.log(alldata)

    }, [alldata])


    const EveryRow = () => {
        return alldata?.map((item, index) => (
            <tr key={index} className={`border border-[black]`}>
                <td className={`border  border-[#928e8e] `}>{index + 1}</td>

                {/* status */}
                <td className={`border border-[#928e8e]`}>{item.Name}</td>

                <td className={`border border-[#928e8e]`}>{item.MobileNo}</td>
                <td className={`border border-[#928e8e]`}>{item.Email}</td>
                <td className={`border border-[#928e8e]`}>{item.Qulification}</td>
                <td className={`border border-[#928e8e]`}>{item.Designation}</td>
                <td className={`border border-[#928e8e]`}>{item.Experience}</td>
                <td className={`border border-[#928e8e]`}>{item.ExpectedSalary}</td>
                <td className={`border border-[#928e8e]`}>{item.Address}</td>



                {/* action */}
                <td className={`border border-[#928e8e]`}>
                    <div className="buttons justify-center gap-0">
                        {/* <button
                            className="update-button"
                        // onClick={() => updateHandler(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button> */}

                        <button
                            className="delete-button"
                            onClick={() => deletehandler(item.id)}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    // ------------------handledownload-------------------------
    const handledownloadexcel = async () => {
        try {
            debugger
            if (alldata.length == 0) {
                return alert(`No data for download`)
            }

            const response = await axios.get(`${Backend_Url}/career/download/excel`,
                {
                    headers: {
                        'authorization': 'Bearer ' + cookie.token,
                        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    },
                    responseType: 'blob'
                }
            )

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'career.xlsx'; // Set the file name for download

            // Append to the body (required for Firefox)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link after triggering the download
            document.body.removeChild(link);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="gallery !bg-[#eee]">
            {/* ------------download-------------- */}
            <div className={`w-full h-auto py-[10px] flex items-center justify-end`}>
                <button onClick={handledownloadexcel} className={`w-auto h-auto px-[15px] py-[5px] bg-green-400 text-white flex items-center justify-center rounded-md`}>
                    Download Excel
                </button>
            </div>
            {alldata?.length != 0 ? (
                <table>
                    <thead>
                        <th>Sno.</th>
                        <th>Name</th>
                        <th>Mobile_No</th>
                        <th>Email</th>
                        <th>Qualification</th>
                        <th>Designation</th>
                        <th>Experience</th>
                        <th>Expected_Salary</th>
                        <th>Address</th>

                        <th>Action</th>
                    </thead>
                    <tbody>
                        {EveryRow()}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">No Albums! Please Create One</div>
            )}


        </div>
    )
}

export default Careermain