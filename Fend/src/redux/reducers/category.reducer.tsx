import { categoriesConstants } from '../actions/constants';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (categories: any[], category: any): any[] => {
  let myCategories = [];
  for (let cat of categories) {
    myCategories.push({
      ...cat,
      children:
        cat.children && cat.children.length > 0
          ? buildNewCategories(cat.children, category)
          : [],
    });
  }
  return myCategories;
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case categoriesConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoriesConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoriesConstants.ADD_NEW_CATEGORY_SUCCESS:
      const updatedCategories = buildNewCategories(
        state.categories,
        action.payload.category,
      );
      console.log(updatedCategories);

      state = {
        ...state,
        // categories: buildNewCategories(
        //   state.categories,
        //   action.payload.category,
        // ),
        loading: false,
      };
      break;

    case categoriesConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initialState,
      };
      break;
  }
  return state;
};
