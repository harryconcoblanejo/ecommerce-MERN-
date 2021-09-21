import axios from 'axios'
import { api } from '../urlConfig'

const axiosInstance = axios.create({
  baseURL: api,
  //   headers:{
  //       'Autorization':''
  //   }
})
export default axiosInstance
