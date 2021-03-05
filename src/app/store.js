import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import fieldsReducer from '../features/fields/fieldsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    fields: fieldsReducer,
  },
});
