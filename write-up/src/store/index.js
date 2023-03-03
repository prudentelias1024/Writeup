import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {user:{},navStatus:false,showMobileSearch:false,posts:[],newNotifications: [], publishedCount: {},bookmarkedPosts: null},
    reducers: {
      updateUser(state,action){
       state.user = action.payload
      }, 
      updateMobileNavStatus(state,action){
        state.navStatus =  action.payload
      },
      showMobileSearch(state,action){
        state.showMobileSearch = action.payload
      },
      updatePosts(state,action){
        state.posts = action.payload
      },
      updateNewNotifications(state,action){
        state.newNotifications = action.payload
      },
      updatePublishedTagCount(state,action){
        state.publishedCount = action.payload
      },
      updateBookmarkedPosts(state,action){
        state.bookmarkedPosts = action.payload
      },
    
    
    }
})


const store = configureStore({
    reducer:userSlice.reducer,
   
})


export const actions = userSlice.actions
export default store;