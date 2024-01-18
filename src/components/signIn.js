import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../scss/signUp.scss";

import { useAuth } from './services/userManagement';
import { useAppData } from './services/appData';

function SignIn() {
    const {setUserInfo} = useAuth();
    const {setItem,apiUrl} = useAppData();
    const [email,setEmail] = useState({name:"email",value:"",err:"",text:"Email"})
    const [password,setPassword] = useState("");
    const regex ={"email":/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"phNum":/^[7-9][0-9]{0,8}$/}
    const emailBlk = useRef();
    const [resErr,setResErr] = useState("");
    const [disable,setDisable] = useState(true);
    const navigate = useNavigate();

    const changeHandle =(value,type)=>{
        if(type==="email"){
            setEmail({...email,
                value: value,
                err: !value ? 'Email is required' : (regex.email.test(value) ? '' : 'Enter a valid email'),
            });
        }
        else if(type === "password"){
            setPassword({...password, value : value, err : !!value ? value.length<4 ? "Password isn't long enough" : '' :'Password required'})
        }
        if(!!resErr)
            setResErr("");
    }

    useEffect(() => {
        emailBlk.current.focus();
    },[])

    useEffect(()=>{
        if((!email.err && !password.err && !resErr) && (!!email.value && !!password.value))
            setDisable(false);
        else
            setDisable(true);
    },[email,password,resErr]);

    const signIn = (event) =>{
        event.preventDefault();
        axios.post(apiUrl+"login/",{email: email.value,password : password.value}).then((res)=>{
            if(!!res.data.status){
                let userData = {login : true,token : res.data.token,userDetails : {email : email.value}};
                setUserInfo(userData);
                setItem("userInfo",userData,true);
                navigate("/");
            }
            else{
                console.log(res);
                setResErr(res.data.message);
            }

        })
    }

  return (
    <div className='signup'>
        <div className='signup_container'>
            <div className='inner_container'>
                <h2>Sign in to your Account</h2>
                <form onSubmit = {signIn}>
                    <div className='form_rows'>
                        <label>
                            <span className="input_txt">Email ID</span>
                              <input type="email" ref={emailBlk} onChange={(e)=>{changeHandle(e.target.value,'email')}} />
                            <span className='text_danger'>
                                <span>{email.err}</span>
                            </span>
                        </label>
                        <label>
                            <span className="input_txt">Password</span>
                            <input type="text" name="email" onChange={(e)=>{changeHandle(e.target.value,"password")}} />
                            <span className='text_danger'>
                                <span>{password.err}</span>
                            </span>
                        </label>
                        <span className={`res_danger ${!!resErr ? 'display_none' : ''}`} >{resErr}</span>
                    </div>
                    <button type='submit' style={{cursor : !!disable ? 'no-drop' : 'pointer'}} disabled={disable} className='signup_btn'>Sign In</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn