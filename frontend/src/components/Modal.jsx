import axios from 'axios';
import * as yup from 'yup';

import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { actions as ChannelsActions } from '../slices/channelsSlice';

const schema = yup.string().required('Это обязательное поле').min(3, "Минимум 3 символа").max(20, "Максимум 20 символов")

const Modal = ({ openModal }) => {
    const inputEl = useRef(null);
    const dispatch = useDispatch();
    const [ channelName, setChannelName ] = useState('')
    const [ err, setErr ] = useState('')
    useEffect(() => inputEl.current.focus());

    const inputHandler = async (e) => {
        setChannelName(e.target.value);
        await schema.validate(channelName)
        .then(() => setErr(null))
        .catch((err) => setErr(err.message))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const newChannel = { name: channelName };
        
        const token = window.localStorage.getItem("JWT");
        try {
            const { data } = await axios.post('/api/v1/channels', newChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(ChannelsActions.addChannel(data))
        } catch(err) {
            console.log(err.message)
        }
        // openModal()
    }

    return (
        <>
            <div className="fade modal-backdrop show"></div>
            <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{'display': 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">
                                Добавить канал
                            </div>
                            <button onClick={openModal} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitHandler} className="">
                                <div>
                                    <input ref={inputEl} onChange={inputHandler} name="name" id="name" className="mb-2 form-control" value={channelName} />
                                    <label className="visually-hidden" htmlFor="name">
                                        Имя канала
                                    </label>

                                    <div className="invalid-feedback d-block">
                                        {err && <div>{err}</div>}
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button onClick={openModal} type="button" className="me-2 btn btn-secondary">
                                            Отменить
                                        </button>
                                        <button disabled={err} type="submit" className="btn btn-primary">
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;