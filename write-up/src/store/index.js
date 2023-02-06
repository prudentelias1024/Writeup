import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {user:{}},
    reducers: {
      updateUser(state,action){
       state.user = action.payload
      }, 
      
    }
})

const store = configureStore({
    reducer:userSlice.reducer
})

export const actions = userSlice.actions
export default store;