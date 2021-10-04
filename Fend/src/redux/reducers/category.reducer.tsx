import { categoriesConstants } from '../actions/constants';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case categoriesConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
  }
  return state;
};
