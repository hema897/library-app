import { useState, createContext, useContext } from 'react'

const userContext = createContext()


const AuthProvider = ({ children }) => {
  var userData = {login : false,token:"",userdetails : ""}
  if(!!localStorage.getItem('userInfo'))
    userData = JSON.parse(localStorage.getItem('userInfo'));
  else
    localStorage.setItem('userInfo',JSON.stringify(userData))
    const [userInfo,setUserInfo] = useState(userData);
    return (
      <userContext.Provider value={{ userInfo,setUserInfo }}>
        {children}
      </userContext.Provider>
    );
  };

const useAuth = () => useContext(userContext);

export { AuthProvider, useAuth };

