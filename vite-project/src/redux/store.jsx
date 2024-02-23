import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from './reducer'
import clockedInReducer from './slice'

const store = configureStore({
    reducer: {
        formData: formDataReducer,
        clockedIn: clockedInReducer
    }
})

export default store;