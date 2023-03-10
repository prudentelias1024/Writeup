import React, { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../store';

const LoginModal = () => {
    const modalRef = useRef()
    const dispatch = useDispatch()
    const closeModal = () => {
    modalRef.current.classList.add("hidden")
    dispatch(actions.setShowModal(false))
    }
    return (
        <div ref={modalRef} onClick={(event) => {closeModal()}} className='bg-[#f2f2f2] fixed z-50 w-full h-full'>
        <div className='border shadow-2xl   rounded-xl flex flex-col bg-white w-2/4 z-50 fixed top-1/4 left-1/4 '>
            <RxCross2 className='relative text-4xl left-[95%] top-[.5em]' />
            <p className="font-[Mulish] lg:text-2xl mt-4 ml-24 4 mb-7 font-extrabold">Please Login or Signup to Continue</p>
            <hr />
            <Link to='/' className="font-[Pacifico] mx-auto my-[1em] text-2xl lg:text-3xl font-extrabold ">Ink Up</Link>
            <button><Link to="/login" className="border my-auto text-white mx-4  bg-blue-500 rounded-lg p-3 w-[70%] font-[Museo] h-[3em]" type="submit">Login</Link>  </button>
            <button><Link to='/register' className=" my-auto mb-[3em] text-pink-500 mx-4  bg-white-500 rounded-lg p-3 w-full font-[Museo] h-[3em]" type="submit">Register</Link>  </button>

        </div>
        </div>
    );
}

export default LoginModal;
