import { createContext,useContext } from "react";

const appContext = createContext();

const AppData = ({children}) =>{
    const apiUrl = "http://127.0.0.1:8000/api/";
    const tenantUrl = "http://127.0.0.1:8000";

    const getItem = (key,parse) =>{
        try {
            var data = localStorage.getItem(key);
            if(!!data){
                if(parse)
                    data=JSON.parse(data)
                return data
            }
            return false
        } catch (error) {
            console.error(error);
            return false
        }  
    }
    
    const setItem = (key,value,stringiFy) =>{
        try {
            if(stringiFy)
                value = JSON.stringify(value);
            localStorage.setItem(key,value);
            
        } catch (error) {
            console.error(error);
        }
    }

    const removeItem = (key) =>{
        try {
           localStorage.removeItem(key); 
        } catch (error) {
            
        }
    }

    return(
        <appContext.Provider value={{getItem,setItem,removeItem,apiUrl,tenantUrl}}>
            {children}
        </appContext.Provider>
    )
}

const useAppData = () =>useContext(appContext);

export {AppData,useAppData}

