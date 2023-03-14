import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams, } from 'react-router-dom';
import NavBar from '../NavBar';
import axios from 'axios';
import { actions } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import SearchType from './SearchType';
import ProfileSearchResult from './ProfileSearchResult';
import Post from '../Post';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tag from '../tags/tag';
import LoginModal from '../loginModal';

const SearchPage = () => {
    let URL;
   const location = useLocation()
   const [tabIndex, setTabIndex] = useState(0);
   const [filteredView, setFilteredView] = useState(null)
   const [searchResult, setSearchResult] = useState(null)
    const dispatch= useDispatch()
    const [searchType, setSearchType] = useState(null)
    const [followed, setFollowed] = useState(false)
     const query = new URLSearchParams(location.search).get('search')
   const {user,showModal} = useSelector(state => state)
   const tabRef = useRef()
   const tab1Ref = useRef()
   const tab2Ref = useRef()
   const tab3Ref = useRef()
   const checkFollowed = (username) => {
    if(user !== null){
    if (user.following !== null || user.following !== undefined) {
        return user.following.some((followee)=> username == followee.username)
    }
}  else {
    return false
}
   }
//    const follow = async(author) => {
    // if(user == null){
    //     dispatch(actions.setShowModal(true))
    // }else {}
//     axios.post(``${URL}/api/follow`,{ user:user, author: author }, {headers: {Authorization: localStorage.getItem('token')}})
  
//     setFollowed(true)
// }
//    }
//    const unfollow = async(author) => {
//      axios.post(``${URL}/api/unfollow`,{ user:user, author: author }, {headers: {Authorization: localStorage.getItem('token')}})
//     setFollowed(false)

//   }
  
    const search = async(searchWords) => {
    let res =  await (await axios.post(`${URL}/api/search`, {query:  searchWords})).data
   console.log(user)
   setSearchResult(res)
   setTimeout(()=>
{ 
    tabRef.current.click()
},100
   )
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
  
  
   }
   setFilteredView({data : searchResult.user, type: 'people'})

   }
   const filterTag = () => {
    if(tab2Ref.current.classList.contains('underline')){
        tab2Ref.current.classList.remove('underline')
        tab2Ref.current.classList.remove('underline-offset-[1.5em]')
   } else{
    tab2Ref.current.className +=  ' underline underline-offset-[1.5em]'
    tabRef.current.classList.remove('underline')
    tabRef.current.classList.remove('underline-offset-[1.5em]')
    tab1Ref.current.classList.remove('underline')
    tab1Ref.current.classList.remove('underline-offset-[1.5em]')
   }
   setFilteredView({data : searchResult.tags, type: 'tags'})
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
    if (process.env.NODE_ENV == 'production') {
        URL = "https://inkup-api.onrender.com"
      }else{
        URL = "http://localhost:5000"
               
      }
    console.log(query)
   
        search(query);
    },[])
    return (
        <>
        {showModal == true ? <LoginModal/>: ''}
        <NavBar searchWords={query}/>
        <div className="top-32 relative w-full lg:bg-white pb-[33%] flex flex-row gap-[5em]">
            <div className='flex flex-col'>
            <div className='lg:ml-[9em] mt-[1em] flex gap-2 text-3xl lg:text-4xl font-bold text-gray-500 font-[Museo] ml-[1em]'><p> Results for</p> <p className='font-extrabold text-black'>{query}</p> </div>
        <div className='flex flex-col lg:w-2/3 lg:gap-[1em]'>
            
            <ul className='flex flex-row ml-[0.3em] gap-[5em] lg:gap-[7em] w-full p-0 h-[2.6em] border-gray-300 border-b-[2px] mt-[3em] lg:ml-[20em]'>
                <li onClick={filterPost} ref={tabRef} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>Post</li>
                <li onClick={filterPeople} ref={tab1Ref} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>People</li>
                <li onClick={filterTag} ref={tab2Ref} className='block font-[mulish]  h-min text-gray-500 cursor-pointer'>Tags</li>
              
            </ul>
             
            {filteredView !== null &&  filteredView.data.length !== 0 ?
             filteredView.type == 'post'  ?
             filteredView.data.map((post,index) => {
                return <Post key={index} post={post} showCoverImage="hidden" additionalStyles="lg:ml-[20em] mt-[1em]" removeReactions={true} />
            }): filteredView !== null &&  filteredView.data.length !== 0 &&   filteredView.type == 'people'  ? 
            filteredView.data.map((user,index) => {
                          return <ProfileSearchResult  people={user} key={index}/>
            }): filteredView !== null && filteredView.data.length !== 0 && filteredView.type == 'tags' ? 
           
                <div className='flex gap-2 lg:gap-5 flex-auto flex-wrap w-full mt-[1em]  lg:ml-[20em] '>
                         { filteredView.data.map((tag,index) => {
                         return <Link to={`/tag/${tag.split('#')[1]}`} key={index} className="tags bg-white lg:bg-[#f2f2f2] w-fit text-[#2d2d2d]  px-[1em] py-[.5em] rounded-2xl font-bold border">{tag}</Link>
                         }
                         )
                         }
                    </div>  
                           
          
            
            : ''
            
            
            :
            <p className='font-bold text-center lg:ml-[14em] w-full  rounded-md py-[2em] text-2xl text-gray-400'>No result found</p>
             }

           
           
            
          </div>   
        </div>

        <div className="hidden others lg:fixed lg:right-1 lg:mr-[.25em] lg:pl-[2em] lg:w-1/3 lg:flex lg:flex-col">
            <div className="tags">
            <p className='font-[Mulish] font-bold mb-7 ml-[1.5em] mt-[2em]'>Tags Matching {query}</p>
            <div className='flex gap-5 flex-auto flex-wrap ml-[1em] mr-[8em]'>
            {
               searchResult !== null && searchResult.tags.length !== 0  ? 
               searchResult.tags.map((tag,index) => {
                return <Link to={`/tag/${tag.split('#')[1]}`} key={index} className="tags bg-[#f2f2f2] w-fit text-[#2d2d2d]  px-[1em] py-[.5em] rounded-2xl font-bold border">{tag}</Link>
            }): <p className='font-[Mulish] font-bold ml-[1em] text-gray-400'>No Results Found</p>
            } 
           
            {/* <div className="tags bg-[#f2f2f2] w-fit text-[#2d2d2d]  px-[1em] py-[.5em] rounded-2xl font-bold border">#React</div> */}
            
            </div>

            </div>
            <div className="posts flex flex-col ml-[1em]">
            <p className='font-[Mulish] font-bold mb-7 ml-[1em] mt-[2em]'>Other Posts Matching {query}</p>
            
              {searchResult !== null && searchResult.post.length !== 0  ?
                     searchResult.post.length > 4 ?
                     searchResult.post.slice(searchResult.length - 4 , searchResult.length - 1).map((post,index) => {
                        return( <><div className="flex flex-row gap-[1em] pl-[1em]">
             <img className='h-[2em] w-[2em]  rounded-full' src={post.author.public_picture} alt={post.author.public_picture} />
             <p className='font-[Mulish] w-full text-md font-bold '>{ user != null ? post.author.name !== user.name ? post.author.name: 'You': post.author.name}</p>
             </div>
              <p className='font-bold w-3/4 ml-[4em] font-[Mulish]'>{post.title}</p>

              <div className='flex flex-row gap-[1em] mt-2 ml-[1em] '>
                <p className='text-gray-400 ml-[3em]'>Mar 2 2012</p>
                <p className='text-gray-400 '>8 mins read</p>
              </div>
              </>)
                    }) : searchResult.post.map((post,index) => {
                        return( <><div className="flex flex-row gap-[1em] pl-[1em]">
                        <img className='h-[2em] w-[2em]  rounded-full'  src={post.author.public_picture} alt={post.author.public_picture}  />
                        <p className='font-[Mulish] w-full text-md font-bold '>{ user != null ? post.author.name !== user.name ? post.author.name: 'You': post.author.name}</p>
                        </div>
                         <p className='font-bold w-3/4 ml-[4em] font-[Mulish]'>{post.title}</p>
           
                         <div className='flex flex-row gap-[1em] mt-2 ml-[1em] '>
                           <p className='text-gray-400 ml-[3em]'>Mar 2 2012</p>
                           <p className='text-gray-400 '>7 mins read</p>
                         </div>
                         </>)
                    })
                   
                 : <p className='font-[Mulish] font-bold ml-[1em] text-gray-400'>No Results Found</p>
            }
                
           
            <div>
             <div className='profile mt-[2em] '>
             <p className='font-[Mulish] font-bold mb-7 ml-[1em]'>Other People Matching {query}</p>
                {searchResult !== null && searchResult.user.length !== 0 ?
                     searchResult.user.length > 4 ?
                     searchResult.user.slice(searchResult.length - 4 , searchResult.length - 1).map((people,index) => {
                        return( <div className='flex flex-row pl-[1em]' key={index}>
                        <img className='h-[2em] w-[2em]  rounded-full' src={people.public_picture} alt={people.username} />
                        <div className="flex flex-col  ml-[1em]">
                            <p className="font-[Mulish] w-full text-md font-bold">{people.name}</p>
                            <p  className="font-[Mulish] text-ellipsis h w-[390px] overflow-hidden whitespace-nowrap">{people.bio}</p>
                        </div>
                          
                                         {
                                         user !== null?
                                         people.username !== user.username?
                          user.following.length !==  0 && user.following.some((followee)=> people.username == followee.username) 
                           ? (<button  className='font-[Mulish] m-auto text-green-500 px-[1em]  ml-[0em] mt-[-.751em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>)
                            : (<button className='font-[Mulish] m-auto text-red-500 px-[1em]  ml-[0em] mt-[-1.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-red-500 hover:border'>Following</button>): '' :<button  className='font-[Mulish] m-auto text-green-500 px-[1em] ml-[0em] mt-[-.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>
                     }
                    </div>)
                    }) : searchResult.user.map((people,index) => {
                        return( <div className='flex flex-row pl-[1em]' key={index}>
                        <img className='h-[2em] w-[2em]  rounded-full' src={people.public_picture} alt={people.username} />
                        <div className="flex flex-col  ml-[1em]">
                            <p className="font-[Mulish] w-full text-md font-bold">{people.name}</p>
                            <p  className="font-[Mulish] text-ellipsis w-[240px] overflow-hidden whitespace-nowrap">{people.bio}</p>
                        </div>
                        { user !== null?
                            people.username !== user.username?
                           user.following && user.following.length == 0 &&  user.following.some((followee)=> user.username == followee.username) == false 
                           ? (<button  className='font-[Mulish] m-auto text-green-500 px-[1em] ml-[0em] mt-[-.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>)
                            : (<button className='font-[Mulish] m-auto text-red-500 px-[1em] ml-[0em] mt-[-.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-red-500 hover:border'>Following</button>): '': <button  className='font-[Mulish] m-auto text-green-500 px-[1em] ml-[0em] mt-[-.75em] w-[7em] h-[3em] p-1.5 rounded-full align-middle hover:border-green-500 hover:border'>Follow</button>
                     }
                      
                    </div>)
                    })
                   
                 :  <p className='font-[Mulish] font-bold ml-[1em] text-gray-400'>No Result Found</p>
            }
                
           
            
        </div>
        </div>
            </div>
            <div className="people">

            </div>
        </div>
        </div>
        </>
    );
        }

export default SearchPage;
