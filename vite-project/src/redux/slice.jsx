import { createSlice } from '@reduxjs/toolkit'

const clockedInSlice = createSlice({
    name: 'clockedIn',
    initialState: { clockedIn: false },
    reducers: {
        setClockedIn: (state) => {
            state.clockedIn = true;
          },
          setClockedOut: (state) => {
            state.clockedIn = false;
          },
    }
})

export const {setClockedIn, setClockedOut} = clockedInSlice.actions

export default clockedInSlice.reducer;