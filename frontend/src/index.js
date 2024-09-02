import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
const socket = io();

socket.on('newMessage', (payload) => {
    console.log(payload);
    store.dispatch(messagesActions.addMessage(payload))
});

socket.on('newChannel', (payload) => {
  console.log(payload);

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

