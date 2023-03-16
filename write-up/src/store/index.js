import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {URL:'',user:null,navStatus:false,showMobileSearch:false,posts:[],notifications: [], publishedCount: {},bookmarkedPosts: null, showModal: false},
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
      updateNotifications(state,action){
        state.notifications = action.payload
      },
      updatePublishedTagCount(state,action){
        state.publishedCount = action.payload
      },
      updateBookmarkedPosts(state,action){
        state.bookmarkedPosts = action.payload
      },
      updateURL(state,action){
        state.URL = action.payload
      },
      setShowModal(state,action){
        state.showModal = action.payload
      },
    
    
    }
})


const store = configureStore({
    reducer:userSlice.reducer,
   
})


export const actions = userSlice.actions
export default store;