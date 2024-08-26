import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer from './authorizationSlice.js'

export default configureStore({
    reducer: {
        authorizationReducer
    }
})