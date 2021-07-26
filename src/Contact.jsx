import React, { useState } from "react";
// import React, { useStste } from "React"; 

const Contact = () => {
    const [data, setData] = useState({
        fullname: " ",
        phone: " ",
        email: " ",
        msg: " ",
    });
    const InputEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });

    };

    const formSubmit = (e) => {
        e.preventDefault();
        alert(`My name is ${data.fullname}.my phone number is ${data.phone}.my email is ${data.email}. i want to say that: ${data.msg}`);
    };

    return (
        <>
            <div className="my-5">
                <h1 className="top_product">Contact Us</h1>
            </div>
            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                        <form onSubmit={formSubmit}>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Full name </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="fullname"
                                    value={data.fullname}
                                    onChange={InputEvent}
                                    placeholder="enter your name" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">phone number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="phone"
                                    value={data.phone}
                                    onChange={InputEvent}
                                    placeholder="mobile number" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="email"
                                    value={data.email}
                                    onChange={InputEvent}
                                    placeholder="yourName@example.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label">Your Message</label>
                                <textarea className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="msg"
                                    value={data.msg}
                                    onChange={InputEvent}
                                ></textarea>
                            </div>
                            <div className="col-12 py-2">
                                <button className="btn btn-outline-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;