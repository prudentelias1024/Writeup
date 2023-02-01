import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import CreatePosts from './Components/createPosts';
import {userContext} from './Contexts/userContext';
import { useState } from 'react';
import Page404 from './Components/Page404';

function App() {
  const [user,setUser] = useState()
  return (
    <>
      <userContext.Provider value={{user,setUser} }>
    <Routes>

      <Route path='*' element={<Page404/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/create' element={<CreatePosts/>}/>
     
    </Routes>
      </userContext.Provider>

    </>
   
  );
}

export default App;
