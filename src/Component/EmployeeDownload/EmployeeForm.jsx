import React from 'react'

const EmployeeForm = () => {
    return (
        <>
        {/* { ContactNo, OfficeNo, Name, FirmName, Email, Address, Position, Job_Description, Vacancy, Experience, Salary, Location } */}
            <div className="container">
                <form className="upload-form" style={{ backgroundColor: '#eee' }}  >
                    <div className={`w-full h-auto mb-[10px] flex-wrap flex items-center justify-start `}>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontName}
                                className='titlename'
                                // onChange={(e) => setIcon(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageName</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontValue}
                                className='titlename'
                                // onChange={(e) => setPageName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">PageUrl</label>
                            <input
                                type="text"
                                placeholder={"Enter Title"}
                                id="name"
                                // defaultValue={UpdateFontValue}
                                className='titlename'
                                // onChange={(e) => setPageURL(e.target.value)}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="image">Status</label>
                            <select id='select' className={`select`} >
                                <option>--select--</option>
                                <option>True</option>
                                <option>False</option>
                            </select>
                        </div>

                        <div className={`two-btn`}>
                            <button type={"submit"} className="submit-button">
                                CREATE
                            </button>
                            {/* CLEAR UPDATE */}
                            {/* {
                                UpdateFontID != null ?
                                    <button className="submit-button clear" onClick={() => { CancelHandler() }}>
                                        Cancel
                                    </button> : null
                            } */}
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default EmployeeForm