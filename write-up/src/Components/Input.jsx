import React from 'react';

const Input = ({label,placeholder,type, value}) => {
    return (
        <div>
   
        <label htmlFor={label} className="text-black font-[Mulish] text-xl font-bold float-left">{label}</label>
        <br></br>
            <input type={type}
             placeholder={placeholder}
              value={value}
               className="rounded-md  text-[#464646]  border font-[Mulish] text-xl w-full font-bold placeholder:font-[Mulish] placeholder:font-bold placeholder:ml-12 h-[2em]" />
        
        
        </div>
    );
}

export default Input;
