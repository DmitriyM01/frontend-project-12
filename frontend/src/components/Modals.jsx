import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import { actions as modalsActions } from '../slices/modalsSlice.js';

import { actions as channelsActions } from '../slices/channelsSlice';

export const AddChannelModal = () => {
    const dispatch = useDispatch(null);
    const { isShowing, modalType } = useSelector((state) => state.modalsReducer);

    const schema = yup.object().shape({
        channelName: yup.string()
            .min(3, 'Минимум 3 символа')
            .max(20, 'Максимум 20 символлов')
      });

    const modalHandler = () => {
        dispatch(modalsActions.closeModal())
    };

    const submitHandler = async (values) => {
        const channelName = values.channelName;
        console.log(values)
        try {
            await schema.validate(values)

            const newChannel = { name: channelName };
            const token = await window.localStorage.getItem('JWT');

            const { data } = await axios.post('/api/v1/channels', newChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            modalHandler();
            dispatch(channelsActions.setCurrentChannel(data))
        }
        catch (err) {
            console.log(err.message)
            const errors = {};
            errors.channelName = err.message;
            return errors;
        }
        console.log('nnooo')
    }
    console.log(modalType)

    return (
        <Modal show={isShowing && modalType === 'add'} onHide={modalHandler}>
            <Modal.Header>
                <Modal.Title>
                    Добавить канал
                </Modal.Title>
                <CloseButton onClick={modalHandler} />
            </Modal.Header>
            <Modal.Body>
                {<Formik
                    initialValues={{
                        channelName: '',
                    }}
                    onSubmit={submitHandler}
                    validationSchema={schema}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as='input'
                                    onChange={handleChange}
                                    type="text"
                                    name='channelName'
                                    value={values.channelName}
                                />
                                {errors.channelName && touched.channelName ? (
                                    <div className='invalid-feedback d-block'>{errors.channelName}</div>
                                ) : null}
                            </Form.Group>
                            <Button onClick={modalHandler} variant='secondary'>
                                Отменить
                            </Button>{' '}
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Form>
                    )}

                </Formik>}
            </Modal.Body>
        </Modal>
    )
};

export const RemoveChannelModal = () => {
    const dispatch = useDispatch(null);
    const { isShowing, modalType, data } = useSelector((state) => state.modalsReducer);

    const onRemove = async () => {
        const id = data
        try {
            const token = await window.localStorage.getItem('JWT');
            await axios.delete(`/api/v1/channels/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(channelsActions.setCurrentChannel({ id: '1', name: 'general' }))
            dispatch(modalsActions.closeModal())

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={isShowing && modalType === 'remove'} onHide={() => dispatch(modalsActions.closeModal())}>
            <Modal.Header>
                <Modal.Title>
                    Удалить канал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверенны?
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => dispatch(modalsActions.closeModal())} variant="secondary">
                    Отменить
                </Button>
                <Button variant="danger" onClick={onRemove}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export const RenameChannelModal = () => {
    const dispatch = useDispatch(null);
    const { currentChannel, entities } = useSelector((state) => state.channelsReducer);
    const { isShowing, data, modalType } = useSelector((state) => state.modalsReducer)

    const schema = yup.object().shape({
        channelName: yup.string()
            .min(3, 'Минимум 3 символа')
            .max(20, 'Максимум 20 символлов')
      });

    const submitHandler = async (values) => {
        const id = data;
        const editedChannel = { name: values.channelName };
        const token = await window.localStorage.getItem('JWT');

        try {
            axios.patch(`/api/v1/channels/${id}`, editedChannel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(modalsActions.closeModal())
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Modal show={isShowing && modalType === 'rename'} onHide={() => dispatch(modalsActions.closeModal())}>
            <Modal.Header>
                <Modal.Title>
                    Переименовать канал?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<Formik
                    initialValues={{
                        channelName: '',
                    }}
                    onSubmit={submitHandler}
                    validationSchema={schema}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as='input'
                                    onChange={handleChange}
                                    type="text"
                                    name='channelName'
                                    value={values.channelName}
                                />
                                {errors.channelName && touched.channelName ? (
                                    <div className='invalid-feedback d-block'>{errors.channelName}</div>
                                ) : null}
                            </Form.Group>
                            <Button onClick={() => dispatch(modalsActions.closeModal())} variant='secondary'>
                                Отменить
                            </Button>{' '}
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Form>
                    )}

                </Formik>}
            </Modal.Body>
        </Modal>
    )
}