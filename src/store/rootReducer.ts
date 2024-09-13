import { combineReducers } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import authReducer from '../features/auth/authSlice';

export const rootReducer = combineReducers({
    notes: notesReducer,
    auth: authReducer,
});