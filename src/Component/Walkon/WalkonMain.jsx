import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import Backend_Url from '../../config/config'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import UpdateContex from '../CreateContex/CreateContex'

const WalkonMain = ({ alldata, fetchdata, setalldata }) => {
    const [cookie] = useCookies(['token'])
    const { setUpdatemaintex,
        setUpdatesubtext,
        setUpdateId } = useContext(UpdateContex)

    const deletehandler = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (e) => {
                if (e.isConfirmed) {
                    await axios.delete(`${Backend_Url}/walkon/delete/${id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + cookie.token
                        }
                    })

                    Swal.fire({
                        title: 'WalkOn delete Successfully:',
                        icon: 'success',
                        text: 'Process completed successfully',
                        cancelButtonText: 'Okay'
                    })

                    fetchdata()
                }
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Walkon delete Failed!',
                icon: 'warning',
                timer: 3000,
                text: 'Process completed successfully'
            })
        }
    }

    const handleUpdate = (item) => {
        setUpdatemaintex(item.Text1)
        setUpdatesubtext(item.Text2)
        setUpdateId(item.Id)
    }

    const renderWalkon = () => {
        return alldata.map((Singleitem, index) => (
            <tr key={index}>
                <td className={`border border-[#ccc]`}>
                    <input
                        // onChange={(e) => changecheck(e, Singleitem.Id)}
                        type="checkbox"
                    // checked={isSelected.includes(Singleitem.Id)}
                    />
                </td>
                <td className={`border border-[#ccc]`}>{index + 1}</td>

                <td className="Name border border-[#ccc]">{Singleitem.Text1}</td>
                <td className={`border border-[#ccc]`}>
                    {Singleitem.Text2}
                </td>


                <td>
                    <div className=" py-[8px] flex items-centers justify-center gap-2">
                        <button
                            className="update-button"
                            onClick={() => handleUpdate(Singleitem)}
                        >
                            <Icon icon="fluent:clipboard-text-edit-32-filled" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => deletehandler([Singleitem.Id])}
                        >
                            <Icon icon="material-symbols:delete-outline" />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };


    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <div className="gallery tc-main !bg-[#f8f8f8] !border !border-[#ccc]">
            {alldata.length != 0 ? (
                <table className=''>
                    <thead>
                        <tr>
                            <th className={`  th`}>
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                    // onChange={(e) => Allselected(e, allTc)}
                                    />
                                    <button
                                        className="delete-button"
                                    // onChange={() => deleteTc(isSelected)}
                                    >
                                        <Icon icon="material-symbols:delete-outline" />
                                    </button>
                                </div>
                            </th>
                            <th className={`th`}>Sno.</th>
                            <th className={`th`}>MainText</th>
                            <th className={`th`}>SubText</th>
                            <th className={`th`}>Action</th>
                        </tr>
                    </thead>
                    <tbody>{renderWalkon()}</tbody>
                </table>
            ) : (
                <div className="text-center">No TC! Please Create One</div>
            )}

            {/* <UpdateEvent show={showUpdate} onClose={() => setshowUpdate(false)} EditId={EditId} /> */}
        </div>
    )
}

export default WalkonMain