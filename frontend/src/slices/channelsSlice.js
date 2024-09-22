/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  currentChannel: { id: '1', name: 'general' },
  ids: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const { entities, ids } = payload;

      state.ids = ids;
      state.entities = entities;
    },
    addChannel: (state, { payload }) => {
      const { id } = payload;
      state.entities[id] = payload;
      state.ids = [...state.ids, id];
    },
    removeChannel: (state, { payload }) => {
      delete state.entities[payload.id];
      state.ids = state.ids.filter((id) => id !== payload.id);
    },
    renameChannel: (state, { payload }) => {
      state.entities[payload.id] = payload;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = { id: payload.id, name: payload.name };
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
