import React, { useContext, useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';

import UpdateContex from './CreateContex/CreateContex';
import { useCookies } from 'react-cookie';
import Backend_Url from '../config/config';

const MainTestimonials = () => {
    const [AllTestimonials, setAlltetimonials] = React.useState([]);
    const [isSelected, setSelected] = React.useState([])
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { setDesignation,
        setTImage,
        setTpriority,
        setTstatus,
        setTurl, SetTname, SetUpdateTDetails, setTid } = useContext(UpdateContex)


    useEffect(() => { fetchAllrow() }, [])

    const fetchAllrow = async () => {
        const Alltestimonials = await fetch(`${Backend_Url}/Testimonial/getall`,
            {
                headers: {
                    'authorization': 'Bearer ' + cookie.token
                }
            }
        ).then((res) => res.json())
        setAlltetimonials(Alltestimonials.data)
    }
    console.log(AllTestimonials)


    // UPDATE HANDLER
    const updateHandler = async (e, Singleitem) => {
        e.preventDefault()
        console.log(Singleitem)
        setDesignation(Singleitem.Designation)
        setTImage(Singleitem.Image)
        setTid(Singleitem.Id)
        setTpriority(Singleitem.Priority)
        setTstatus(Singleitem.Status)
        setTurl(Singleitem.URL)
        SetTname(Singleitem.Name)
        SetUpdateTDetails(Singleitem.Details)
    }


    // DELETE HANDLER
    const deleteHandler = async (id) => {
        console.log(id)
        // debugger
        try {
            const confirm = window.confirm('Are you sure you want to delete this item?')
            if (!confirm) return
            console.log(id)
            await fetch(`${Backend_Url}/Testimonial/delete/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + cookie.token
                    },
                    body: JSON.stringify({ id }),
                }
            ).then((response) => response.status == 200 ?
                alert("Deleted Successfully") : alert("Failed to Delete"))
            fetchAllrow()
        } catch (error) {
            console.log("Something went wrong")
        }
    }


    const changecheck = (e, id) => {
        if (e.target.checked) {
            setSelected((prev => [...prev, id]))
        } else {
            setSelected((prev) => prev = isSelected.filter((item) => item != id))
        }
    }

    const Allselected = function (e, Alldonwload) {
        if (e.target.checked) {
            setSelected(AllTestimonials.map(item => item.id))
        } else {
            setSelected([])
        }
    }


    const deletehandler = async () => {
        console.log(isSelected)
        if (isSelected.length == 0) {
            window.alert("Please select an testimonial")
            return
        }
        await fetch(`${Backend_Url}/Testimonial/delete/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + cookie.token
                },
                body: JSON.stringify({ id: isSelected }),
            }
        ).then((response) => response.status == 200 ?
            alert("Deleted Successfully") : alert("Failed to Delete"))
        fetchAllrow()

    }


    // ALL ROWS
    const renderTestimonials = () => {
        console.log(AllTestimonials)
        return AllTestimonials.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc]`}>
                    <input
                        onChange={(e) => changecheck(e, Singleitem.id)}
                        type="checkbox"
                        checked={isSelected.includes(Singleitem.id)}
                    />
                </td>
                <td className={`border border-[#ccc]`}>{index + 1}</td>

                <td className="Name border border-[#ccc]">{Singleitem.Name}</td>
                <td className="view-cell border border-[#ccc]">
                    <img
                        src={Singleitem.Image}
                        className="image-container"
                        style={{ width: "100px", height: "100px", margin: "5px" }}
                    />
                </td>


                {/* Details */}
                <td className="border border-[#ccc]">
                    {Singleitem.Details}
                </td>

                {/* DEsignation */}
                <td className=" border border-[#ccc]">
                    {Singleitem.Designation}
                </td>
                <td className=" border border-[#ccc]">
                    {Singleitem.URL}
                </td>
                <td className=" border border-[#ccc]">
                    {Singleitem.Priority}
                </td>
                <td className=" border border-[#ccc]">
                    {Singleitem.Status ? <p className='active'>Active</p> : <p className='inactive'>Inactive</p>}
                </td>
                <td className='border border-[#ccc]'>
                    <div className="buttons">
                        <button
                            className="update-button"
                            onClick={(e) => updateHandler(e, Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={(e) => deleteHandler([Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    return (
        <>
            <div className="gallery !bg-[#f8f8f8] border border-[#ccc]">
                {AllTestimonials != null ? (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"

                                            onChange={(e) => Allselected(e, AllTestimonials)}
                                        />
                                        <button
                                            className="delete-button"
                                            onClick={() => deletehandler(isSelected)}
                                        >
                                            <Icon icon="material-symbols:delete-outline" />
                                        </button>
                                    </div>
                                </th>
                                <th>Sno.</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Details</th>
                                <th>Designation</th>
                                <th>URL</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTestimonials()}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">No Albums! Please Create One</div>
                )}

            </div>
        </>
    )
}

export default MainTestimonials