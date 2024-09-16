import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18Instance from './i18n/index.js';
import { io } from 'socket.io-client';
const socket = io();

socket.on('newMessage', (payload) => {
    console.log(payload);
    store.dispatch(messagesActions.addMessage(payload))
});

socket.on('newChannel', (payload) => {
  console.log(payload);
  store.dispatch(channelsActions.addChannel(payload))
});

socket.on('removeChannel', (payload) => {
  console.log(payload);
  store.dispatch(channelsActions.removeChannel(payload))
  store.dispatch(messagesActions.removeMessages(payload))
});

socket.on('renameChannel', (payload) => {
  console.log(payload); // { id: 7, name: "new name channel", removable: true }
  store.dispatch(channelsActions.renameChannel(payload))
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18Instance}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </I18nextProvider>
  </Provider>
);

