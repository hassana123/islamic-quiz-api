// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success=null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.success=action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success=null;
      localStorage.removeItem("token")
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.loginSuccess=null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.success=action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;



const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    submitQuestionRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    submitQuestionSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    submitQuestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitQuestionRequest,
  submitQuestionSuccess,
  submitQuestionFailure,
} = questionsSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    questions: questionsSlice.reducer, 
  },
});

export default store;
