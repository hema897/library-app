import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppData } from './services/appData'
import { useAuth } from './services/userManagement';
import axios from 'axios';

import "../scss/home.scss"

function Home() {
  const {apiUrl,tenantUrl} = useAppData();
  const [booksData,setBooksData] = useState();
  const {userInfo} = useAuth();
  const navigate = useNavigate();

  if(!booksData){
    axios.get(apiUrl+"books/").then((res) =>{
      if(res.status===200){
        console.log(res.data);
        setBooksData(res.data);
      }
    })
    .catch((err)=>console.error(err))
  }

  const navigateToDetails = (id) => {
    !!(userInfo.login) ? navigate("details/"+id) : navigate("sign-in/")
    
  }


  return (
    <div className='container'>
      <div className='cont_inr'>
        {(!!booksData && !!Object.keys(booksData).length) && 
          Object.keys(booksData).map((genre)=>{return  <div key={genre} className='section'>
            {booksData[genre].length && 
              <>
                <h2 className='sec_title'>{genre}</h2>
                <div className='sec_data'>
                  <div className='sec_inr'>
                    {booksData[genre].map((book,index)=>{return  <div className='bookImg' key={index}>
                      <img src={tenantUrl+book.img} alt="bookImg" onClick={() => navigateToDetails(book.id)} />
                      <h3>{book.title}</h3>
                    </div>})}
                  </div>
                </div>
              </>
            }
            
          </div>})}
      </div>
    </div>
  )
}

export default Home