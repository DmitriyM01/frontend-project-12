/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, CloseButton } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';

import filterBadWords from '../utilities/filterBadWords.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice';
import successToast from './toasts/index.js';

export const AddChannelModal = () => {
  const dispatch = useDispatch(null);
  const { isShowing, modalType } = useSelector((state) => state.modalsReducer);
  const { t } = useTranslation();
  const ref = useRef(null);

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('errors.min3'))
      .max(20, t('errors.max')),
  });

  const modalHandler = () => {
    dispatch(modalsActions.closeModal());
  };

  useEffect(() => ref.current.focus());

  const submitHandler = async (values) => {
    const channelName = filterBadWords(values.channelName);
    try {
      await schema.validate(values);

      const newChannel = { name: channelName };
      const token = await window.localStorage.getItem('JWT');

      const { data } = await axios.post('/api/v1/channels', newChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      modalHandler();
      successToast(t('toasts.add'));
      dispatch(channelsActions.setCurrentChannel(data));
    } catch (err) {
      const errors = {};
      errors.channelName = err.message;
      return errors;
    }
    return null;
  };
  // console.log(modalType)

  return (
    <Modal show={isShowing && modalType === 'add'} onHide={modalHandler}>
      <Modal.Header>
        <Modal.Title>
          {t('channels.addChannel')}
        </Modal.Title>
        <CloseButton onClick={modalHandler} />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          onSubmit={submitHandler}
          validationSchema={schema}
        >
          {({
            handleSubmit, handleChange, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  ref={ref}
                  as="input"
                  onChange={handleChange}
                  type="text"
                  id="channelName"
                  name="channelName"
                  value={values.channelName}
                />
                <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
                {errors.channelName && touched.channelName ? (
                  <div className="invalid-feedback d-block">{errors.channelName}</div>
                ) : null}
              </Form.Group>
              <Button onClick={modalHandler} variant="secondary">
                {t('buttons.cancel')}
              </Button>
              {' '}
              <Button variant="primary" type="submit">
                {t('buttons.send')}
              </Button>
            </Form>
          )}

        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export const RemoveChannelModal = () => {
  const dispatch = useDispatch(null);
  const { isShowing, modalType, data } = useSelector((state) => state.modalsReducer);
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => ref.current.focus());

  const onRemove = async (e) => {
    e.preventDefault();

    const id = data;
    try {
      const token = await window.localStorage.getItem('JWT');
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(channelsActions.setCurrentChannel({ id: '1', name: 'general' }));
      dispatch(modalsActions.closeModal());
      successToast(t('toasts.delete'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={isShowing && modalType === 'remove'} onHide={() => dispatch(modalsActions.closeModal())}>
      <Modal.Header>
        <Modal.Title>
          {t('channels.delete')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('questions.areYouSure')}
      </Modal.Body>
      <Modal.Footer>
        <form>
          <Button onClick={() => dispatch(modalsActions.closeModal())} variant="secondary">
            {t('buttons.cancel')}
          </Button>
          <Button ref={ref} type="submit" variant="danger" onClick={onRemove}>
            {t('buttons.delete')}
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
};

export const RenameChannelModal = () => {
  const dispatch = useDispatch(null);
  const { isShowing, data, modalType } = useSelector((state) => state.modalsReducer);
  const { t } = useTranslation();
  const ref = useRef(null);

  const schema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('min3'))
      .max(20, t('max')),
  });

  useEffect(() => ref.current.focus());

  const submitHandler = async (values) => {
    const id = data;
    const newName = filterBadWords(values.channelName);
    const editedChannel = { name: newName };
    const token = await window.localStorage.getItem('JWT');

    try {
      axios.patch(`/api/v1/channels/${id}`, editedChannel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(modalsActions.closeModal());
      successToast(t('toasts.rename'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={isShowing && modalType === 'rename'} onHide={() => dispatch(modalsActions.closeModal())}>
      <Modal.Header>
        <Modal.Title>
          {t('channels.renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          onSubmit={submitHandler}
          validationSchema={schema}
        >
          {({
            handleSubmit, handleChange, values, touched, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  ref={ref}
                  as="input"
                  onChange={handleChange}
                  type="text"
                  name="channelName"
                  id="channelName"
                  value={values.channelName}
                />
                <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
                {errors.channelName && touched.channelName ? (
                  <div className="invalid-feedback d-block">{errors.channelName}</div>
                ) : null}
              </Form.Group>
              <Button onClick={() => dispatch(modalsActions.closeModal())} variant="secondary">
                {t('buttons.cancel')}
              </Button>
              {' '}
              <Button variant="primary" type="submit">
                {t('buttons.send')}
              </Button>
            </Form>
          )}

        </Formik>
      </Modal.Body>
    </Modal>
  );
};
