import { Dispatch } from 'redux';
import axios from '../../helpers/axios';
import { categoriesConstants } from './constants';

type IcategorieList = {
  categorieList: [];
};

export const getAllCategory = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST,
      payload: {},
    });

    const res = await axios.get('/category/get');
    console.log(res);

    if (res.status === 200) {
      const { categoriesList }: { categoriesList: IcategorieList } = res.data;

      dispatch({
        type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: categoriesConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
