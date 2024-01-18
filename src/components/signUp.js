import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './services/userManagement';
import { useAppData } from './services/appData';
import axios from 'axios';


import "../scss/signUp.scss"

function SignUp() {
    const { setUserInfo } = useAuth();
    const {apiUrl,setItem} = useAppData();
    const [email,setEmail] = useState({name:"email",value:"",err:"",});
    // const [phNum,setphNum] = useState({name:"phNum",value:"",err:"",});
    const [password,setPassword] = useState({name:"password",value:"",err:""});
    const [conPassword,setConPassword] = useState({name:"conPassword",value:"",err:""});
    //const [countryList,setCountryList] = useState([]);
    const [disabled,setDisable] = useState(true);
    const [resError,setResError] = useState();
    const refEle = useRef();
    const regex ={"email":/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"phNum":/^[7-9][0-9]{0,8}$/}
    var navigate = useNavigate();
    

    useEffect(()=>{
        refEle.current.focus();
    },[])

    const changeHandle =(value,type)=>{
        if(type=="email"){
            setEmail({...email,
                value: value,
                err: !value ? 'Email is required' : (regex.email.test(value) ? '' : 'Enter a valid email'),
            });
        }
        // else if(type=="phNum"){
        //     setphNum({...phNum,value : value,err : !value ? 'Phone number required' : (regex.phNum.test(value) ? '' :'Enter valid phone number')})
        // }
        else if(type == "password"){
            setPassword({...password, value : value, err : !!value ? value.length<4 ? "Password isn't long enough" : '' :'Password required'})
        }
        else if(type == "conPassword"){
            setConPassword({...conPassword, value : value, err : !!value ? value.length<4 ? "Password isn't long enough" : value==password.value ? '' : 'Password confirm password should be same'  : 'Confirm password required'})
        }
        if(!!resError)
            setResError("");
        
    }

    useEffect(() =>{
        if((!email.err && !password.err && !conPassword.err && !resError) && (!!email.value && !!password.value && !!conPassword.value))
            setDisable(false);
        else
            setDisable(true);
    },[email,password,conPassword,resError])

    const register = (event) => {
        event.preventDefault();
        console.log("register")
        var data = {}
        data.email = email.value;
        data.password = password.value;
        axios.post(apiUrl+'register/',data)
        .then((res) =>{
            if(!!res.data.status){
                console.log(res,"response");
                let userData = {login : true,token : res.data.token,userDetails : {email:email.value}};
                setUserInfo(userData);
                setItem("userInfo",userData,true);
                navigate("/");
            }
            else{
                setResError(res.data.message);
            }
        })
        .catch((err) =>{
            console.error(err);
        })
    }
   

  return (
    <div className='signup'>
        <div className='signup_container'>
            <div className='inner_container'>
                <h2>Create Your Account</h2>
                <form onSubmit={register} >
                    <div className='form_rows'>
                        <label>
                            <span className="input_txt">Email ID</span>
                            <input type="email" value={email.value} ref={refEle} onChange={(e)=>{changeHandle(e.target.value,"email")}} />
                            <span className='text_danger'>
                                <span>{email.err}</span>
                            </span>
                        </label>
                        {/* <label>
                            <span className="input_txt">Mobile Number</span>
                            <input type="text" value={phNum.value} onChange={(e)=>{changeHandle(e.target.value,"phNum")}} name="mobile" />
                            <span className='text_danger'>
                                <span>{phNum.err}</span>
                            </span>
                        </label> */}
                        <label>
                            <span className="input_txt">Password</span>
                            <input type="password" value={password.value} onChange={(e) => changeHandle(e.target.value,"password")} name="password" />
                            <span className='text_danger'>
                                <span>{password.err}</span>
                            </span>
                        </label>
                        <label>
                            <span className="input_txt">Confirm Password</span>
                            <input type="password" value={conPassword.value} name="conPassword" onChange={(e) => changeHandle(e.target.value,"conPassword")} />
                            <span className='text_danger'>
                                <span>{conPassword.err}</span>
                            </span>
                        </label>
                        <span className={`res_danger ${!!resError ? 'display_none' : ''}`} >{resError}</span>
                    </div>
                    
                    <button type='submit' disabled={disabled} style={{cursor : disabled ? 'no-drop' : 'pointer'}} className='signup_btn'>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp