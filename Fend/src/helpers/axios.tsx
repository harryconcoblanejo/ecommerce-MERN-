import axios from 'axios';
import { api } from '../urlConfig';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: api,

  headers: {
    'Content-Type': 'application/json',
    // Authorization: token ? `${token}` : '',
    Authorization: token,
  },
});
export default axiosInstance;
