import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalType: null,
    isShowing: false,
    data: null
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            state.isShowing = true;
            state.modalType = payload
        },
        closeModal: (state) => {
            state.isShowing = false;
            state.modalType = null;
            state.data = null;
        },
        setData: (state, { payload }) => {
            state.data = payload;
        }
    }
})

export const { actions } = modalsSlice;
export default modalsSlice.reducer;