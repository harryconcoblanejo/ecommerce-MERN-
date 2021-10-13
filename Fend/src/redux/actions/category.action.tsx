import { Dispatch } from 'redux';
import axios from '../../helpers/axios';
import { categoriesConstants } from './constants';

type IcategoryList = {
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
      const { categoriesList }: { categoriesList: IcategoryList } = res.data;

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

export const addCategory = (form: any) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST });
    try {
      const res = await axios.post('/category/create', form);
      if (res.status === 200) {
        dispatch({
          type: categoriesConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoriesConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
