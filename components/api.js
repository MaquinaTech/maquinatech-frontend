// api.js (o axiosConfig.js)

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Authorization': 'Bearer ' + token },
});

export default instance;
