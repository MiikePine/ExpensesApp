import { configureStore } from '@reduxjs/toolkit';
import monthReducer from './slices/monthSlice';


export default configureStore({
  reducer: {
    month: monthReducer,
  },
});


