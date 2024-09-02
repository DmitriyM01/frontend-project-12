import { configureStore } from '@reduxjs/toolkit';

import authorizationReducer from './authorizationSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
    reducer: {
        authorizationReducer,
        channelsReducer,
        messagesReducer,
    }
})