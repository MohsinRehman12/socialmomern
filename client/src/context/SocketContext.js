import React, { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:8900');
  
socket.on('connection', () => console.log('connected to socket'));

export const SocketContext = React.createContext();
