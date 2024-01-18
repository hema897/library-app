import React from "react";

import "../../scss/pop.scss"
import axios from "axios";
import { useAuth } from "../services/userManagement";
import { useAppData } from "../services/appData";

function Payment(props){
    console.log(props)
    const {userInfo} = useAuth();
    const {apiUrl} = useAppData();
    const payMoney = () =>{
        console.log("paymoney")
        if(props.data[0].fineData.fine)
            axios.post(apiUrl+"details/pay/",{fine:props.data[0].fineData.fineAmount,id:props.data[2]},{headers: {"Authorization" : "token "+userInfo.token}}).then(
        (res) =>{
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
    }
    return(
        <div className="modal">
            <div className="pop_cont">
                <div className="modal_cont">
                    <h2>To lend book please clear fine </h2>
                    <h3>Your fine amount {props.data[0].fineData.fineAmount}₹</h3>
                    <div className="btns">
                        <button type="button" className="pay" onClick={() => payMoney()}>Pay</button>
                        <button type="button" onClick={()=>props.popUp(false)} className="close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Payment