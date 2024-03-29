import React from 'react';

const DetailsCard = ({color, text,amount}) => {
    return (
        <div className={color + "  lg:mr-[2em] h-fit py-[1.25em] px-4 w-[95%] lg:w-[85%] pb-[1em]  text-white rounded-xl lg:h-[12em]  lg:px-16 lg:py-5 lg:w-[45em] mb-2"}>
            <p className="details_amount text-3xl mt-[.25em] lg:text-5xl  text-bold">
            {amount}
            </p>
            <p className="details_content font-[Outfit] text-base  lg:text-2xl font-semibold mt-3 lg:-ml-3 lg:mt-5 text-white-400 mb-[1em]">
               {text}
            </p>
        </div>
    );
}

export default DetailsCard;
