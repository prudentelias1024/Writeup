import React from 'react';

const Input = ({handleChanges, label,placeholder,type, value}) => {
    return (
        <div>
   
        <label htmlFor={label} className="text-black font-[Outfit] text-xl font-bold float-left">{label}</label>
        <br></br>
            <input 
            name={label}
            onChange={handleChanges}
            type={type}
             placeholder={placeholder}
              value={value}
               className="rounded-md  text-[#464646]  border font-[Maven] text-xl w-full font-bold placeholder:font-[Outfit] placeholder:font-light placeholder:ml-12 h-[2em]" />
        
        
        </div>
    );
}

export default Input;
