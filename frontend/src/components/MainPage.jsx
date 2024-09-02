import axios from 'axios';

import { useEffect,  useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { getNormalizedData } from '../utilities/getNormalized.js';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import Modal from './Modal.jsx'


export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const [ message, setMessage ] = useState('');
  const [ modal, setModal ] = useState('closed');
  const [ currentChannel, setCurrentChannel ] = useState({ id: '1', name: 'general' });

  useEffect(() => {
    const fetchChannels = async (bearerToken) => {
      const { data } = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${bearerToken}` } });
      const { entities, ids } = getNormalizedData(data);
      dispatch(channelsActions.setChannels({ entities, ids }))
    }

    const fetchMessages = async (bearerToken) => {
      const { data } = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${bearerToken}` } });
      const { entities, ids } = getNormalizedData(data);
      dispatch(messagesActions.setMessages({ entities, ids }))
    }

    const token = window.localStorage.getItem("JWT");
    if (!token) navigate('/login');

    fetchChannels(token);
    fetchMessages(token)
  }, [])

  const onLogout = () => {
    window.localStorage.removeItem('JWT');
    window.localStorage.removeItem('username');
    navigate('/login')
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("JWT");
    const username = window.localStorage.getItem("username");

    const newMessage = { body: message, channelId: currentChannel, username: username };
    try {
      const { data } = await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch(err) {
      console.log(err)
    }

    setMessage('')
  }

  const openModal = () => {
    modal === 'closed' ? setModal('opened') : setModal('closed');
  }

  return (
    <div className="h-100">

            {modal === 'opened' ? <Modal openModal={openModal} /> : null}

      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Mini Chat
              </a>
              <button onClick={onLogout} type="button" className="btn btn-primary">
                Выйти
              </button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              
              <Channels openModal={openModal} currentChannel={currentChannel} clickHandler={setCurrentChannel} />

              <Chat onSubmit={onSubmit} currentChannel={currentChannel} inputHandler={setMessage} val={message} />

            </div>
          </div>
        </div>
        <div className="Toastify">
        </div>
      </div>
    </div>
  )
};