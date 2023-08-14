// src/redux/actions/authActions.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Action for login user (get token)
export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

// Action for register user (create user)
export const register = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};

// Action for logout (clear the user from the state)
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
