import { fetchAndProcesd } from "./apiAxios";
import { METHOD_TYPE } from "./constant";


const createTask=(payload,callback)=>{
  fetchAndProcesd("/task",METHOD_TYPE.POST,payload,callback);
}

const updateUserProfile=(payload,callback)=>{
  fetchAndProcesd("/users/profile",METHOD_TYPE.POST,payload,callback);
}

const API = {createTask,updateUserProfile};
export default API;