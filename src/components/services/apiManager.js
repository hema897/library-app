import { createContext,useContext } from "react";
import axios from 'axios';

const apiContext = createContext();
const test = ["home"];
const baseUrl ="http://127.0.0.1:8000/api/";

const ApiManager = ({children}) =>{
    return(
        <apiContext.Provider value={{test, getData, postData}}>
            {children}
        </apiContext.Provider>
    )
};

const useApi = () => useContext(apiContext)

export { ApiManager,useApi }

const getData = (url) => {
    return axios.get(baseUrl + url)
        .then((res) => {
            if(!!res.status && res.data!==401 && res.data!==500)
                return res.data;
        })
        .catch((err) => {
            console.error('Error fetching data:', err);
            throw err; 
        });
};

const postData = (url,data) => {
    return axios.post(baseUrl + url,data)
    .then((res) => {
        if(!!res.status)
            return res.data
    })
    .catch((err) => {
        console.error('Error fetching data:', err);
        throw err; 
    });
};

