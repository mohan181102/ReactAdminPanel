import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useEffect, useState } from 'react'
import UpdateContex from '../CreateContex/CreateContex'

const UserAuthMain = () => {
    const [checkedfield, setcheckedfield] = useState([])
    const [AllField, setAllField] = useState([
        "General Setting",
        "Slider",
        "Academic Master",
        "Course Master",
        "Footer",
        "FontAwesome",
        "Flash news",
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
        "JsonObject",
        "Career",
        "Employee"
    ])
    const { AllowField, setAllowField } = useContext(UpdateContex)

    // function for checked field
    const checked = function (e, field) {
        console.log(e)
        if (e.target.checked) {
            setAllowField((prev) => [...prev, field])
        } else {
            setAllowField((prev) => prev = AllowField?.filter((item) => item != field))
        }
    }

    // useEffect(() => { setAllowField((prev) => [...prev, checkedfield.map((item) => item)]) }, [checkedfield])

    const renderField = AllField.map((field, index) => {
        return (
            <>
                <tr>
                    <td className={`border w-[50px] border-[white]`}>
                        {index + 1}
                    </td>
                    <td className={`flex items-center border border-[white] justify-start gap-[10px]`}>
                        <div className={` w-[20px] h-[20px] flex items-center justify-center`}>
                            {AllowField.includes(field) ?
                                <input checked={AllowField.includes(field)} className={`w-full h-full`} onChange={(e) => checked(e, field)} type="checkbox" />
                                : <input className={`w-full h-full`} onChange={(e) => checked(e, field)} type="checkbox" />
                            }
                        </div>
                        <div className={` w-[80%] flex items-center justify-start  h-[30px]`}>
                            <p>{field}</p>
                        </div>
                    </td>
                </tr>
            </>
        )
    })

    return (
        <>
            <div className="gallery tc-main">
                {AllField.length != 0 ? (
                    <table className=''>
                        <thead>
                            <tr>

                                <th className={`th`}>Sno.</th>
                                <th className={`th flex items-center justify-start border-l border-l-white`}>Field Name</th>
                            </tr>
                        </thead>
                        <tbody>{renderField}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No Field! Please Create One</div>
                )}

            </div>
        </>
    )

}

export default UserAuthMain