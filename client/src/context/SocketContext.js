import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('');
  
socket.on('connection', () => console.log('connected to socket'));

export const SocketContext = React.createContext();
