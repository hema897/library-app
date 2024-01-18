import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppData } from "./services/appData";
import { useAuth } from "./services/userManagement";
import "../scss/details.scss";
import Payment from "./popups/payment";

function Details(){
    const { apiUrl } = useAppData();
    const { userInfo } = useAuth();
    const {bookId} = useParams();
    const [bookDetails, setBookDetails] = useState();
    const [buttonDetailss,setButtonDetails] = useState();
    const [showPopUp,setShowPopUp] = useState(false);
    const headers = {headers:{"Authorization" : "token " + userInfo.token}};

    if(!bookDetails){
        axios.get(apiUrl+"details/"+bookId+"/getBookDetails/",headers).then((res) =>{
            setBookDetails(res.data);
            setButtonDetails(res.data.userDetails.moreInfo)
            console.log(res.data)
        })
        .catch(err => console.error(err));
    }

    const borrowOrLend = (borrow) =>{
        var reqData = {id : bookDetails.id,borrow:borrow}
        axios.post(apiUrl+"details/borrowOrLend/",reqData,headers).then((res)=>{

        })
        .catch((err)=>console.error(err));
    }

    useEffect(() =>{
        if(showPopUp)
            document.body.classList.add("model_visble");
        else
            document.body.classList.remove("model_visble");
    },[showPopUp])

    return(
        <div className="detail_container">
            <div className="detail_inr">
                <div></div>
                {!!bookDetails && <div className="detail_data">
                        <h2 className="title">{bookDetails.title}</h2>
                        <span className="info">{bookDetails.publishedDate} | {bookDetails.genre}</span>
                        <p className="desc">{bookDetails.description}</p>
                        <h3 className="more_info">Author : {bookDetails.author}</h3>
                        <h3 className="more_info">Rating : {bookDetails.rating}</h3>
                        {!!buttonDetailss.borrow && <button type="button" onClick={() => borrowOrLend(true)} className="borrow">Borrow</button> }
                        {!!buttonDetailss.lend && <button type="button" onClick={() => !!buttonDetailss.fineData.fine ? setShowPopUp(!showPopUp) : borrowOrLend(false) } className="borrow">Lend</button> } 
                        {!!buttonDetailss.fineData.fine && <h4 className="fine"> <span>Total fine amount  : </span> {buttonDetailss.fineData.fineAmount} ₹ </h4>}
                        {!!showPopUp && <div className="payment"><Payment popUp={setShowPopUp} data={[buttonDetailss,setButtonDetails,bookId]}  /></div>}
                        
                    </div>}
            </div>
        </div>
    )
}

export default Details