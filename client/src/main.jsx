import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import './index.css'
import axios from "axios";

axios.defaults.baseURL = 'https://countriesback-l6bu.onrender.com'
// axios.defaults.baseURL = 'http://localhost:3001/api'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
)
