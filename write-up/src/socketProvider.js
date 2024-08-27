import React, { createContext } from 'react';
import { io } from 'socket.io-client';

let URL;

if (process.env.NODE_ENV == 'production') {
  URL = "https://inkup-api.onrender.com"
}else{
  URL =  "http://localhost:5000" 
}

export const SocketContext = createContext(null)
const socket  = io(URL, {
  auth: {
    token: localStorage.getItem('token')
  }
  }) 
  

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
