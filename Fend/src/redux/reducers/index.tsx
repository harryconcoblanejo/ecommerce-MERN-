import { combineReducers } from 'redux'
import authReducer from './auth.reducers'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
