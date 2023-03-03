import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams, } from 'react-router-dom';
import NavBar from '../NavBar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { actions } from '../../store';
import { useDispatch } from 'react-redux';
import SearchType from './SearchType';
import ProfileSearchResult from './ProfileSearchResult';
import Post from '../Post';


const SearchPage = () => {
   const location = useLocation()
   const [tabIndex, setTabIndex] = useState(0);
   const [filteredView, setFilteredView] = useState(null)
   const [searchResult, setSearchResult] = useState(null)
    const dispatch= useDispatch()
   const query = new URLSearchParams(location.search).get('search')
   const tabRef = useRef()
   const tab1Ref = useRef()
   const tab2Ref = useRef()
   const tab3Ref = useRef()
 
    const search = async(searchWords) => {
    let res =  await (await axios.post('http://localhost:5000/api/search', {query:  searchWords})).data
   setSearchResult(res)
    ;
    }

   const filterPost = () => {
   if(tabRef.current.classList.contains('underline')){
        tabRef.current.classList.remove('underline')
        tabRef.current.classList.remove('underline-offset-[1.5em]')
   } else{
    tabRef.current.className +=  ' underline underline-offset-[1.5em]'
    tab1Ref.current.classList.remove('underline')
    tab1Ref.current.classList.remove('underline-offset-[1.5em]')
    tab2Ref.current.classList.remove('underline')
    tab2Ref.current.classList.remove('underline-offset-[1.5em]')
    console.log(tabRef.current)
   }
     setFilteredView({data : searchResult.post, type: 'post'})
  
   }
   const filterPeople = () => {
    if(tab1Ref.current.classList.contains('underline')){
        tab1Ref.current.classList.remove('underline')
        tab1Ref.current.classList.remove('underline-offset-[1.5em]')
   } else{
    tab1Ref.current.className +=  ' underline underline-offset-[1.5em]'
    tabRef.current.classList.remove('underline')
    tabRef.current.classList.remove('underline-offset-[1.5em]')
    tab2Ref.current.classList.remove('underline')
    tab2Ref.current.classList.remove('underline-offset-[1.5em]')
  
    console.log(tab1Ref.current)
   }
   setFilteredView({data : searchResult.user, type: 'people'})

   }
   const underline3 = () => {
    if(tab2Ref.current.classList.contains('underline')){
        tab2Ref.current.classList.remove('underline')
        tab2Ref.current.classList.remove('underline-offset-[1.5em]')
   } else{
    tab2Ref.current.className +=  ' underline underline-offset-[1.5em]'
    console.log(tab2Ref.current)
   }
   }
//    const underline4 = () => {
//     if(tab3Ref.current.classList.contains('underline')){
//         tab3Ref.current.classList.remove('underline')
//         tab3Ref.current.classList.remove('underline-offset-[1.5em]')
//    } else{
//     tab3Ref.current.className +=  ' underline underline-offset-[1.5em]'
//     console.log(tab3Ref.current)
//    }
//    }
   useEffect(()=> {
    console.log(query)
        search(query);
    },[])
    return (
        <>
        <NavBar searchWords={query}/>
        <div className="top-32 relative bg-white flex flex-row gap-[5em]">
            <div className='flex flex-col'>
            <div className='lg:ml-[9em] mt-[1em] flex gap-2 text-4xl font-bold text-gray-500 font-[Museo]'><p> Results for</p> <p className='font-extrabold text-black'>{query}</p> </div>
        <div className='flex flex-col w-2/3 gap-[1em]'>
            
            <ul className='flex flex-row gap-[7em] w-full p-0 h-[2.6em] border-gray-300 border-b-[2px] mt-[3em] ml-[20em]'>
                <li onClick={filterPost} ref={tabRef} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>Post</li>
                <li onClick={filterPeople} ref={tab1Ref} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>People</li>
                <li onClick={underline3} ref={tab2Ref} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>Tags</li>
              
            </ul>
                
            {filteredView !== null  && filteredView.type == 'post' ? filteredView.data.map((post,index) => {
                return <Post key={index} post={post} showCoverImage="hidden" additionalStyles="ml-[20em]" removeReactions={true} />
            }) : '' }

            {filteredView !== null  && filteredView.type == 'people' ? 
                filteredView.data.map((user,index) => {
                              return <ProfileSearchResult user={user} key={index}/>
                }): '' }
            
           
          </div>   
        </div>

        <div className="others fixed right-1 mr-[1em] w-1/3 border flex flex-col">
            <div className="tags">
            

            </div>
            <div className="posts">

            <div>
             <div className='profile mt-[2em] '>
            <div className='flex flex-row'>
                <img className='h-[4em] w-[4em]  rounded-full' src="https://lh3.googleusercontent.com/a/AGNmyxYcBZqfBtl7dK4_13tr941uuw-1XpLhOPzrpKpJCw=s96-c" alt="" />
                <div className="flex flex-col  ml-[1em]">
                    <p className="font-[Mulish] w-full text-xl font-bold">Prudent Elias</p>
                    <p className="font-[Mulish] w-3/4">Hello World</p>
                </div>
                    <button className='font-[Mulish] bg-green-500 text-white px-[1em] h-[
                        3em] p-1.5 rounded-full mt-[1em]'>Follow</button>
              
            </div>
            
        </div>
        </div>
            </div>
            <div className="people"></div>
        </div>
        </div>
        </>
    );
}

export default SearchPage;
