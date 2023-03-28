import React, { useState } from 'react';

import "../scss/signUp.scss"

function SignUp() {
    const [email,setEmail] = useState({name:"email",value:"",err:"",text:"Email"})
    const [phNum,setphNum] = useState({name:"phNum",value:"",err:"",text:"Mobile Number"})
    const [Password,setPassword] = useState("");
    const regex ={"email":"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/","phNum":"/^[7-9][0-9]{0,8}$/"}


    const changeHandle =(value,type)=>{
        console.log(value,type)
        if(type="Password"){

        }
        else{
            if(!value){
                setEmail({...email,err:`${email.text} Required`,value})
            }
            else{
                if(regex[type].test(value)){
                    setEmail({...email,err:"",value})
                }
                else{
                    setEmail({...email,err:"Enter Valid ",value})
                }
            }
        }
    }

  return (
    <div className='signup'>
        <div className='signup_container'>
            <div className='inner_container'>
                <h2>Create Your Account</h2>
                <form>
                    <div className='form_rows'>
                        <label>
                            <span className="input_txt">Email ID</span>
                            <input type="email" {...email} onChange={(e)=>{changeHandle(e.target.value,email.name)}} />
                            <span className='text_danger'>
                                <span>{email.err}</span>
                            </span>
                        </label>
                        <label>
                            <span className="input_txt">Mobile Number</span>
                            <input type="text" name="email" />
                        </label>
                        <label>
                            <span className="input_txt">Password</span>
                            <input type="text" name="email" />
                        </label>
                        <label>
                            <span className="input_txt">Confirm Password</span>
                            <input type="text" name="email" />
                        </label>
                    </div>
                    <button type='button' className='signup_btn'>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp