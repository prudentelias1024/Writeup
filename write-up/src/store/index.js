import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {URL:'',user:null,navStatus:false,showMobileSearch:false,posts:[],notifications: [], publishedCount: {},bookmarkedPosts: null, showModal: false, tempDraft: {}, tempPost: {}, tempCollaborators: [], tempCollaboratorsName: '', drafts: [], reelsPlaceholder:'Add Text Reels', showPollCreator: false, cancelImageStatus: false, reels: [], podcasts: [], myReels: [], myPosts:[], loadingShortFormCreator:false, notis: []},
    reducers: {
      updateNotis(state,action){
        state.user = action.payload
      },
      updateUser(state,action){
       state.user = action.payload
      }, 
      updatePosting(state,action){
        state.loadingShortFormCreator = action.payload
      },
      updateMobileNavStatus(state,action){
        state.navStatus =  action.payload
      },
      updateMyReels(state,action){
        state.myReels =  action.payload
      },
      updateMyPosts(state,action){
        state.myPosts =  action.payload
      },
      updateDrafts(state,action){
        state.drafts =  action.payload
      },
      showMobileSearch(state,action){
        state.showMobileSearch = action.payload
      },
      updatePosts(state,action){
        state.posts = action.payload
      },
      updateReels(state,action){
        state.reels = action.payload
      },
      updatePodcasts(state,action){
        state.podcasts = action.payload
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
      setCollaborators(state,action){
        state.tempCollaborators = action.payload
      },
      setCollaboratorsName(state,action){
        state.tempCollaboratorsName = action.payload
      },
      setTempDraft(state,action){
        state.tempDraft = action.payload
      },
      setTempPost(state,action){
        state.tempDraft = action.payload
      },
    
      setShowPollCreator(state,action){
        state.showPollCreator = action.payload
      },
      setCancelImage(state,action){
        state.cancelImageStatus = action.payload
      },
    
    
    }
})


const store = configureStore({
    reducer:userSlice.reducer,
   
})


export const actions = userSlice.actions
export default store;