import axios from 'axios';

import { useEffect,  useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import filterBadWords from '../utilities/filterBadWords.js';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { getNormalizedData } from '../utilities/getNormalized.js';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import { AddChannelModal, RemoveChannelModal, RenameChannelModal } from './Modals.jsx';

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channelsReducer)
  const { t } = useTranslation();

  const [ message, setMessage ] = useState('');

  const [ removeModalActive, setRemoveModalActive ] = useState(false);
  const [ currentChannelTarget, setCurrentChannelTarget ] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("JWT");
    if (!token) navigate('/login');

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
    const newMessage = { body: filterBadWords(message), channelId: currentChannel, username: username };
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

  return (
    <div className="h-100">

      <AddChannelModal />
      <RemoveChannelModal />
      <RenameChannelModal />

      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Link className="navbar-brand" to='/signup'>{t('Hexlet Chat')}</ Link>
              <button onClick={onLogout} type="button" className="btn btn-primary">
                {t('buttons.logout')}
              </button>
            </div>
          </nav>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">

              <Channels 
                currentChannel={currentChannel} 
                setCurrentChannelTarget={setCurrentChannelTarget}
              />

              <Chat onSubmit={onSubmit} currentChannel={currentChannel} inputHandler={setMessage} val={message} />

            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
};