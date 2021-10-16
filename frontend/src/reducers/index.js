import { combineReducers } from "redux"
import depositedBooksReducer from "./depositedBooksReducer"
import loginReducer from './loginReducer';
import adminLibraryReducer from './adminLibraryReducer';

export default combineReducers({
    depositedBooksReducer,
    loginReducer,
    adminLibraryReducer
})