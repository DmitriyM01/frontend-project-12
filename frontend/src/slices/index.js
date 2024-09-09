import { configureStore } from '@reduxjs/toolkit';

import authorizationReducer from './authorizationSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalsSlice.js'

export default configureStore({
    reducer: {
        authorizationReducer,
        channelsReducer,
        messagesReducer,
        modalsReducer
    }
})