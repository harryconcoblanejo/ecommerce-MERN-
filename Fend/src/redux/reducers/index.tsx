import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import orderReducer from './orders.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
