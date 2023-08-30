import { configureStore } from '@reduxjs/toolkit';
import monthReducer from './slices/monthSlice';
import userReducer from './slices/userSlice'; 


export default configureStore({
  reducer: {
    month: monthReducer,
    user: userReducer,
  },
});


