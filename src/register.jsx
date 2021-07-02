
import react, { useState }from "react";

const Register = (props) => {
    const [data,setData] = useState({
        lname: "",
        fname: "",
        username: "", 
        email:"" ,
        password:"", 
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
        console.log(data)
        props.signup(data.fname,data.lname,data.username,data.email,data.password)
        e.preventDefault();
        alert(`fname  ${data.fname}.lname is ${data.lname}.username is ${data.username}. email: ${data.email}`);
    };
    return (
        <>
            <div className="my-5">
                <h1 className="text-center">Register Yourself</h1>
            </div>

            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                    
                        <form onSubmit={formSubmit}>
                            
                        <div class="mb-3">
                                <label for="exampleFormControlInput6" class="form-label">First name</label>
                                <input
                                    type="string"
                                    class="form-control"
                                    id="exampleFormControlInput6"
                                    name="fname"
                                    value={data.fname}
                                    onChange={InputEvent}
                                    placeholder="firstname" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput3" class="form-label">Last name</label>
                                <input
                                    type="string"
                                    class="form-control"
                                    id="exampleFormControlInput3"
                                    name="lname"
                                    required="true"
                                    value={data.lname}
                                    onChange={InputEvent}
                                    placeholder="Last name" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput4" class="form-label">Username</label>
                                <input
                                    type="string"
                                    required="true"
                                    class="form-control"
                                    id="exampleFormControlInput4"
                                    name="username"
                                    value={data.username}
                                    onChange={InputEvent}
                                    placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput5" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleFormControlInput5"
                                    name="email"
                                    required="true"
                                    value={data.email}
                                    onChange={InputEvent}
                                    placeholder="Email" />
                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlInput6" class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleFormControlInput6"
                                    name="password"
                                    value={data.password}
                                    onChange={InputEvent}
                                    placeholder="password" />
                            </div>

                            <div class="col-12 py-2">
                                <button class="btn btn-outline-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

};


export default Register;