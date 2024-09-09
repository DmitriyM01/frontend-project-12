import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        removeMessages: (state, { payload }) => {
            const entries = Object.entries(state.entities);
            entries.forEach( async([ key, value ]) => {
                if (value.channelId === payload.id) {
                    delete state.entities[key];
                    state.ids.filter((id) => id !== payload.id)

                    const token = window.localStorage.getItem('JWT')
                    await axios.delete(`/api/v1/messages/${value.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                }
            })
            console.log(state.ids)
        }
    }
})

export const { actions } = messagesSlice;
export default messagesSlice.reducer;