import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from 'react-facebook';
import {Provider} from 'react-redux';
import store from './store';
const clientId = process.env.GOOGLE_CLIENT_ID
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
   <GoogleOAuthProvider clientId="39584522765-krc4letrddkk8p1qk1fdknkbjnck871c.apps.googleusercontent.com">
   <FacebookProvider appId="1179176856069103">
      
    <Provider store={store}>
    <App />
    </Provider>
      </FacebookProvider>
     
   </GoogleOAuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
