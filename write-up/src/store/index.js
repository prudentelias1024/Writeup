import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {user:{},navStatus:false},
    reducers: {
      updateUser(state,action){
       state.user = action.payload
      }, 
      updateMobileNavStatus(state,action){
        state.navStatus =  action.payload
      }
    }
})


const store = configureStore({
    reducer:userSlice.reducer,
   
})


export const actions = userSlice.actions
export default store;