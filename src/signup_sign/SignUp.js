import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Divider } from '@mui/material';

const SignUp = () => {

        const [udata, setUdata] = useState({
            fname: "",
            email: "",
            mobile: "",
            password: "",
            cpassword: ""
        });
    
        // console.log(udata);
    
        const adddata = (e) => {
            const { name, value } = e.target;
            // console.log(name,value);
    
            setUdata((pre) => {
                return {
                    ...pre,
                    [name]: value
                }
            })
        };
    
        const senddata = async (e) => {
            e.preventDefault();
    
            const { fname, email, mobile, password, cpassword } = udata;
            try {
                const res = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fname, email, mobile, password, cpassword
                    })
                });
    
                const data = await res.json();
                // console.log(data);
    
                if (res.status === 422 || !data) {
                    toast.error("Invalid Details 👎!", {
                        position: "top-center"
                    });
                } else {
                    setUdata({
                        ...udata, fname: "", email: "",
                        mobile: "", password: "", cpassword: ""
                    });
                    toast.success("Registration Successfully done 😃!", {
                        position: "top-center"
                    });
                }
            } catch (error) {
                console.log("front end ka catch error hai" + error.message);
            }
        }
    


    return (
        <section>
           <div className="sign_container">
            <div className="sign_header">
                <img src="./blacklogoamazon.png" alt="amazonlogo" />

            </div>
            <div className="sign_form">
                <form>
                <h1>Sign-Up</h1>
                <div className="form_data">
                    <label htmlfor="fname">Your Name</label>
                    <input type="text"
                    onChange={adddata}
                    value={udata.fname}
                     name="fname" id="fname" />
                </div>
                <div className="form_data">
                    <label htmlfor="email">Email</label>
                    <input type="text"
                    onChange={adddata}
                    value={udata.email}
                     name="email" id="email" />
                </div>
                <div className="form_data">
                    <label htmlfor="number">Mobile</label>
                    <input type="text"
                    onChange={adddata}
                    value={udata.mobile}
                     name="mobile" id="mobile" />
                </div>
                <div className="form_data">
                    <label htmlfor="password">Password</label>
                    <input type="password"
                    onChange={adddata}
                    value={udata.password}
                     name="password" placeholder='At least 6 char' id="password" />
                </div>
                <div className="form_data">
                    <label htmlfor="cpassword">Password Again</label>
                    <input type="cpassword" 
                    onChange={adddata}
                    value={udata.cpassword}
                    name="cpassword"  id="cpassword" />
                </div>
                <button className="signin_btn">Continue</button>


                <div className="signin_info">
                    <p>Already have an Account?</p>
                    <NavLink to="/login">Signin</NavLink>
                </div>


                </form>
            </div>
           </div> 
        </section>
    )
}

export default SignUp