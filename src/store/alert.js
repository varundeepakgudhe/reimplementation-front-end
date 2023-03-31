import {createSlice} from '@reduxjs/toolkit';

const defaultVariant = 'info';
const initialAlertState = {title: 'Info', message: 'This is Alert!', show: false, variant: defaultVariant};

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    showAlert(state, action) {
      state.title = action.payload.title || '';
      state.message = action.payload.message;
      state.show = true;
      state.variant = action.payload.variant || defaultVariant;
    },
    hideAlert(state) {
      state.show = false;
    }
  }
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;

