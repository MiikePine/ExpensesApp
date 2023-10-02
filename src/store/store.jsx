import { configureStore, combineReducers } from "@reduxjs/toolkit";
import monthReducer from "./slices/monthSlice";
import userReducer from "./slices/userSlice";
import expReducer from "./slices/expSlice";
import sumincReducer from "./slices/sumincSlice";
import sumexpReducer from "./slices/sumexpSlice";
import yearReducer from "./slices/yearSlice";

const rootReducer = combineReducers({
  month: monthReducer,
  user: userReducer,
  exp: expReducer,
  suminc: sumincReducer,
  sumexp: sumexpReducer,
  year: yearReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
