import React from 'react';

const Input = ({handleChanges, label,placeholder,type, value, additionalStyle}) => {
    return (
        <div className='w-full'>
   
        <label htmlFor={label} className="text-black bg-white dark:bg-[#000] dark:text-white font-[Sen] uppercase ml-[.5em] text-xs font-bold float-left">{label}</label>
        <br></br>
            <input 
            name={label}
            onChange={handleChanges}
            type={type}
             placeholder={placeholder}
              value={value}
               className={additionalStyle +" rounded-md  text-[#464646]  dark:bg-[#000] dark:text-white border font-[Maven] pl-[.5em] text-xs w-[95%] font-bold placeholder:font-[Sen] placeholder:font-light ml-[.5em] placeholder:w-full placeholder:ml-12 h-[3em]"} />
        
        
        </div>
    );
}

export default Input;
