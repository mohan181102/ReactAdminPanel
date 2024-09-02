import React, { useState } from 'react'
import "./Testimonials.css"
import Sidebar from './Sidebar';
import TestimonialsForm from './TestimonialsForm';
import MainTestimonials from './MainTestimonials';

const Testimonials = () => {

    return (
        <>
            <div className="App">
                <div className="sidebar fixed pb-[50px]">
                    <Sidebar />
                </div>
                <div className="body-content absolute w-[77%] right-0">
                    <div>
                        <div className="Header">
                            <h1 className="heading">Testimonial</h1>
                        </div>
                        <div className="form">
                            <TestimonialsForm />
                        </div>
                        <div className="Gallery">
                            <MainTestimonials />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonials