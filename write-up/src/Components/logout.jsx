import React from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { actions } from '../store';
const Logout = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    useEffect(() => {
         navigate('/')
        localStorage.removeItem("token")
        dispatch(actions.updateUser({}))
     }, []);
    return (
        <>
            
        </>
    );
}

export default Logout;
