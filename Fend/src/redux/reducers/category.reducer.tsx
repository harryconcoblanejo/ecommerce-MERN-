import { categoriesConstants } from '../actions/constants';

const initialState = {
  categories: new Array(),
  loading: false,
  error: null,
};

const buildNewCategories = (
  parentId: string,
  categories: any[],
  category: any,
): any[] => {
  let myCategories = [];
  for (let cat of categories) {
    if (cat._id == parentId) {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(
                parentId,
                [
                  ...cat.children,
                  {
                    _id: category._id,
                    name: category.name,
                    parentId: category.parentId,
                    slug: category.slug,
                    children: category.children,
                  },
                ],
                category,
              )
            : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? buildNewCategories(parentId, cat.children, category)
            : [],
      });
    }
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
      const category = action.payload.category;

      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category,
      );

      console.log('updated categories', updatedCategories);

      state = {
        ...state,
        categories: updatedCategories,
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
