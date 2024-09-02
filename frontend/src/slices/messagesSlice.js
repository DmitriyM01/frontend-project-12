import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: []
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, { payload }) => {
            const { entities, ids } = payload;
            state.ids = ids;
            state.entities = entities;
        },
        addMessage: (state, { payload }) => {
            const { id } = payload;
            state.ids = [...state.ids, id];
            state.entities[id] = payload;
        },
        // addChannel: (state, { payload }) => {
        //     state.channels = [ ...state.channels, payload]
        // },
        // removeChannel: (state, { payload }) => {
        //     state.channels = state.channels.filter(({ id }) => id !== payload.id)
        // }
    }
})

export const { actions } = messagesSlice;
export default messagesSlice.reducer;