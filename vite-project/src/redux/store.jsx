import { configureStore } from '@reduxjs/toolkit'
import formDataReducer from './reducer'

const store = configureStore({
    reducer: {
        formData: formDataReducer
    }
})

export default store;