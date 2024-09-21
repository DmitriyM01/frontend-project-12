import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup  } from 'react-bootstrap';
import { useState } from 'react';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalsActions } from '../slices/modalsSlice';
import { useTranslation } from 'react-i18next';

const Channels = ({ currentChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector((state) => {
    return state.channelsReducer
  })

  const onDelete = (id) => () => {
    dispatch(modalsActions.openModal('remove'))
    dispatch(modalsActions.setData(id))
  }

  const onRename = (id) => () => {
    dispatch(modalsActions.openModal('rename'))
    dispatch(modalsActions.setData(id))
  }

  const { entities, ids } = channels;

    return (
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.channels')}</b>
          <button onClick={() => dispatch(modalsActions.openModal('add'))} type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg className='border border-primary' id="i-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M16 2 L16 30 M2 16 L30 16" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">

          {ids.map((id) => {
            const channel = entities[id];

            return (
              <li key={channel.id} className="nav-item w-100">

                <div key={channel.id} className="btn-group d-grid gap-2">
                  {/* <ButtonGroup>
                    <Button 
                      onClick={() => dispatch(channelsActions.setCurrentChannel(channel))} 
                      variant={currentChannel.id === id ? 'secondary' : ''}
                    >
                      <span class="me-1"># </span>
                      {channel.name}
                    </Button>

                    {
                      channel.removable ?
                        (
                          <DropdownButton variant={currentChannel.id === id ? 'secondary' : ''} as={ButtonGroup} title="" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1" onClick={onRename(id)}>{t('buttons.rename')}</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={onDelete(id)} >{t('buttons.delete')}</Dropdown.Item>
                          </DropdownButton>
                        )
                        : null
                    }
                  </ButtonGroup> */}

                  <Dropdown as={ButtonGroup}>
                    <Button
                      onClick={() => dispatch(channelsActions.setCurrentChannel(channel))} 
                      variant={currentChannel.id === id ? 'secondary w-100 rounded-0 text-start text-truncate' : ''}
                    >
                      <span class="me-1"># </span>
                      {channel.name}
                    </Button>

                    {
                      channel.removable ?
                        (
                          <>
                            <Dropdown.Toggle split variant={currentChannel.id === id ? 'secondary' : ''} id="dropdown-split-basic">
                              <span className="visually-hidden">Управление каналом</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="1" onClick={onRename(id)}>{t('buttons.rename')}</Dropdown.Item>
                              <Dropdown.Item eventKey="2" onClick={onDelete(id)} >{t('buttons.delete')}</Dropdown.Item>
                            </Dropdown.Menu>
                          </>
                        )
                        : null
                    }
                  </Dropdown>

                </div>
              </li>
            )
          })}

        </ul>
      </div>
    )
  }

  export default Channels;