import axios from '../../helpers/axios';
import { Dispatch } from 'react';

export const addProduct = (form: any) => {
  return async (dispatch: Dispatch<any>) => {
    const userId = '61088954a80c8825f0dbe93f';
    const res = await axios.post(`/products/createProduct/${userId}`, form);
    console.log(res);
  };
};
