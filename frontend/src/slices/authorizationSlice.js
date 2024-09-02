import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthorized: 'notAuthorized',
    token: '',
    username: '',
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setAuthorization: (state, actions) => {
            const { isAuthorized, username, token } = actions.payload;
            state.isAuthorized = isAuthorized;
            state.token = token;
            state.username = username;

        },
    }
})

export const { actions } = authorizationSlice;
export default authorizationSlice.reducer;