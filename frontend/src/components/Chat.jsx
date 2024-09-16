import { useSelector } from "react-redux";
import { useRef, useEffect } from 'react';
import Messages from "./Messages";
import { useTranslation } from 'react-i18next';

const Chat = ({ currentChannel, onSubmit, val, inputHandler }) => {
    const { t } = useTranslation();

    const inputEl = useRef(null);
    const messages = useSelector((state) => {
        return state.messagesReducer
    })

    const currentMessages = {
        entities: {},
        ids: []
    };

    messages.ids.forEach((id) => {
        if (messages.entities[id].channelId.id === currentChannel.id) {
            currentMessages.ids = [...currentMessages.ids, id];
            currentMessages.entities[id] = messages.entities[id]
        }
    })

    useEffect(() => inputEl.current.focus())

    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># {currentChannel.name}</b>
                    </p>
                    <span className="text-muted">
                        {`${t('message.message', { count: currentMessages.ids.length })}`}
                    </span>
                </div>

                <Messages currentMessages={currentMessages} />

                <div className="mt-auto px-5 py-3">
                    <form onSubmit={onSubmit} noValidate="" className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                            <input ref={inputEl} onChange={(e) => inputHandler(e.target.value)} name="body" aria-label="Новое сообщение" placeholder={t('typeMessage')} className="border-0 p-0 ps-2 form-control" value={val} />
                            <button type="submit" className="border border-black btn btn-group-vertical" disabled={val === ''}>
                                <svg id="i-send" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="25" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M2 16 L30 2 16 30 12 20 Z M30 2 L12 20" />
                                </svg>
                                <span className="visually-hidden">
                                    {t('buttobs.send')}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat;