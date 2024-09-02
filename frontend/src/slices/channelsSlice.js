import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: []
}

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
            state.ids = [...state.ids, id]
        },
        // removeChannel: (state, { payload }) => {
        //     state.channels = state.channels.filter(({ id }) => id !== payload.id)
        // }
    }
})

export const { actions } = channelsSlice;
export default channelsSlice.reducer;