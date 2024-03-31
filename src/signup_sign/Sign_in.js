/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useContext, useState } from 'react'
import "./signup.css";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sign_in = () => {


    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    // console.log(data);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        setData((pre) => {
            return {
                ...pre,
                ...logdata,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });


            const data = await res.json();
            // console.log(data);

            if (res.status === 400 || !data) {
                console.log("invalid details");
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ ...logdata, email: "", password: "" })
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    };




    return (
       <>
        <section>
           <div className="sign_container">
            <div className="sign_header">
                <img src="./blacklogoamazon.png" alt="amazonlogo" />

            </div>
            <div className="sign_form">
                <form>
                <h1>Sign-In</h1>
                <div className="form_data">
                    <label htmlfor="email">Email</label>
                    <input type="text"
                    onChange={adddata}
                    value={logdata.email}
                     name="email" id="email" />
                </div>
                <div className="form_data">
                    <label htmlfor="password">Password</label>
                    <input type="password"
                    onChange={adddata}
                    value={logdata.password}
                     name="password" placeholder='At least 6 char' id="password" />
                </div>
                <button className="signin_btn">Continue</button>

                </form>
            </div>
            <div className="create_accountinfo">
                <p>New To Amazon</p>
               <NavLink to="/register"> <button>Create Your Amazon Account</button></NavLink>
            </div>
           </div> 
        </section>
       </> 
    )
}

export default Sign_in