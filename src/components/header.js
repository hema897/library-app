import React, {useState ,useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import { useAppData } from './services/appData';
import { useAuth } from './services/userManagement';

import "../scss/header.scss"
import axios from 'axios';

function Header() {
  const {userInfo,setUserInfo} = useAuth();
  const {apiUrl,getItem,setItem} = useAppData();
  const [menuData,setMenuData] = useState(getItem("menuData",true));
  const [varMenus, setVarMenus] = useState(!!userInfo.login ? [] : loginMenus);

  const getMenus = async () => {
    axios.get(apiUrl+"menus/").then((res) => {
      setMenuData(res.data);
      setItem("menuData",res.data,true);
    })
    .catch((err) =>{
      console.error(err);
    })
  };


  function loginMenus (){
    return [{menuName:"sign in",menuLink:"sign-in"},{menuName:"sign up",menuLink:"sign-up"}];
  }
  useEffect(() =>{
    if(!menuData)
      getMenus()
  },[])

  useEffect(() =>{
    if(!userInfo.login)
      setVarMenus(loginMenus());
    else
      setVarMenus([]);
  },[userInfo])

  const signOut = () =>{
    axios.post(apiUrl+"logout/",{},
      {headers:{'Authorization' : `token ${userInfo.token}`,
    }}).then((res)=>{
      if(!!res.data.status){
        setUserInfo({login : false,token:"",userdetails : ""});
        setItem("userInfo",{login : false,token:"",userdetails : ""},true);
      }
    })
    .catch((err)=>console.error(err))
  };

  return (
    <nav className='header_container'>
        <header>
          {(!!menuData && !!Object.keys(menuData).length) && 
          <div className='inner_container'>
            <div className='menu_left'>
              <ul>
                {menuData.left.map(menu => <li key={menu.menuName}><div className='inner_block'><NavLink to={menu.menuLink} >{menu.menuName}</NavLink></div></li>)}
              </ul>
            </div>
            <div className='menu_right'>
              <ul>
                {menuData.right.map(menu => <li  key={menu.menuName}><div className='inner_block'><NavLink to={menu.menuLink} >{menu.menuName}</NavLink></div></li>)}
                {varMenus.map(menu => <li  key={menu.menuName}><div className='inner_block'><NavLink to={menu.menuLink} >{menu.menuName}</NavLink></div></li>)}
                {userInfo.login && 
                  <li ><div className='profile_info'><span className='profile_icon'>{userInfo.userDetails.email[0]}</span><span className='profile_name'>{userInfo.userDetails.email[0].toUpperCase()+userInfo.userDetails.email.substring(1)}</span>
                    <div className='profile_menu'>
                      <ul>
                        <li>My Account</li>
                        <li onClick={signOut}>Sign Out</li>
                      </ul>
                    </div>
                    </div>
                  </li>
              }
              </ul>
            </div>
          </div>}
        </header>
    </nav>
  )
}

export default Header