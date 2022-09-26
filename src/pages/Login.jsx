import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { BACKEND_URL } from '../config';
import { setCurrentUserAction } from '../store/actions/auth.actions';

export default function Login() {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickSignIn = async () => {        
        if(phone === "" || password === "")
        {
            NotificationManager.warning("Please fill all the inputs.");
        }
        await axios.post(`${BACKEND_URL}/api/user/login`,
            { phone, password }, {}
        ).then(response => 
        {
            if(response.data.code === 0)
            {
                localStorage.setItem("jwtToken", response.data.jwt);
                dispatch(setCurrentUserAction(response.data.user));
                NotificationManager.success("Successfully sign in", "Success");
                navigate('/home');
            }
        }).catch(error => {
            if (error && error.response && error.response.data && error.response.data.message)
            NotificationManager.error(error.response.data.message, 'Error');
            else
            NotificationManager.error('Internal Server Error', 'Error');
        })
    }

    return (
        <div id="login_container">
            <div className="flex items-center justify-center w-full h-full">
                <div className="layer-12 mt-12 space-y-8 rounded-xl bg-primary-dark-800 bg-opacity-60 p-4 py-12 md:p-12">
                    <div className='flex justify-center items-center' style={{flexDirection:"column"}}>                    
                        <img src="/images/icon.png" id="Layer_6" style={{width:"5rem", height:"5rem"}} />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">Sign in to your account</h2>
                    </div>
                    <div className="z-0 mt-8 ">
                        <div className="space-y-px rounded-md shadow-sm ">
                            <div className='flex justify-center'>
                                <label for="phone-number" className="sr-only">Phone number</label>
                                <input id="phone-number" name="phone-number" type="" autocomplete="email" required="" className="input-primary" placeholder="Phone number" 
                                    onChange={(e) => {setPhone(e.target.value) }}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <label for="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autocomplete="current-password" required="" className="input-primary" placeholder="Password" 
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="mt-6 items-center">
                            <div className="text-sm flex justify-center text-white">
                                <a className="font-medium text-primary-purple-100 hover:text-primary-purple-200" href="/register">Don't have an account? Sign up!</a>
                            </div>
                        </div>
                        <div className="mt-6 text-white w-full flex justify-center">
                            <button id="submit" className="btn-primary-purple group w-full" onClick={() => onClickSignIn()}>                                
                                <p className="grow">Sign in</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}