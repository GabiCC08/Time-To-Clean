


//Configuracion Axios
import axios from "axios";
export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials:true
    });

//api.interceptors.request.use(function (config){
  //  const token =localStorage.getItem('token');
    //console.log('token',token);
    //if(token){config.headers.common['Authorization']=`Bearer ${token}`;}

    //return config;
//},function (error) {
//return Promise.reject(error);
//});