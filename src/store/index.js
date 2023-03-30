import {configureStore} from '@reduxjs/toolkit';
import alertReducer from './alert';

const store = configureStore({
  reducer: {alert: alertReducer},
});

export default store;