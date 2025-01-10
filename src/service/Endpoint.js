// import axios from "axios";
// export default axios.create({
//     baseURL: "https://run-dev-hol-app-cbc-470141199353.southamerica-east1.run.app/"
// });

import axios from "axios";

const Endpoint = axios.create({
  baseURL: "https://run-dev-hol-app-cbc-470141199353.southamerica-east1.run.app/",
});

// Interceptor para add o token de authenticatcao a todas as requisicoes
// Endpoint.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Récupéração do token
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default Endpoint;