import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from './reducer'
import clockStatusReducer from './slice'

const store = configureStore({
    reducer: {
        formData: formDataReducer,
        clockStatus: clockStatusReducer
    }
})

export default store;