import { configureStore } from '@reduxjs/toolkit';
import presurveysReducer from '../redux/slices/presurveysSlice';

const store = configureStore({
  reducer: {
    presurveys: presurveysReducer
  }
});

export default store;
