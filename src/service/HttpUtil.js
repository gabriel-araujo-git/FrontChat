import xconfig from '../components/XConfig';
import axios from 'axios';
import UserService from './UserService';
 
const montaUrl  = async (recurso) => {
    let base = "." + await  xconfig.getReactEnvVar('REACT_APP_SERVER_API_ENDPOINT');
    let url =  base + recurso;
    return url;
}

const getConfig = () => {
    let config =  {headers: {'Authorization': `Bearer ${UserService.getToken()}`}};
    return config;
}

const performGet = async (recurso) => {
   let url = await montaUrl(recurso);
   let config = getConfig(); 
   return axios.get(url, config).then(res => res.data);
}

const performDelete = async (recurso) => {
   let url = await montaUrl(recurso);
   let config = getConfig(); 
   return axios.delete(url, config);
}

const performPost = async (recurso, item) => {
   let url = await montaUrl(recurso);
   let config = getConfig(); 
   return axios.post(url, item, config);
}

const performPut = async (recurso, item) => {
   let url = await montaUrl(recurso);
   let config = getConfig();
   console.log(url);
   console.log(item);
   return axios.put(url, item, config);
}

const HttpUtil = {
   performGet,
   performDelete,
   performPost,
   performPut
}

export default HttpUtil;