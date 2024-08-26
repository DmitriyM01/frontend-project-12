import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthorized: 'notAuthorized'
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setAuthorization: (state, actions) => {
            const currentUserState = actions.payload.isAuthorized;
            state.isAuthorized = currentUserState;
        },
        getAuthorizationState: (state) => {
            console.log(state.isAuthorized);
        }
    }
})

export const { actions } = authorizationSlice;
export default authorizationSlice.reducer;