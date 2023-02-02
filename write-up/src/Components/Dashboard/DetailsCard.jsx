import React from 'react';

const DetailsCard = () => {
    return (
        <div className='bg-white rounded-xl px-16 py-5 w-[25em]'>
            <p className="details_amount text-5xl  text-bold">
                1
            </p>
            <p className="details_content font-[Montserrat] text-2xl font-semibold -ml-3 mt-5 text-gray-400">
                Total post reactions
            </p>
        </div>
    );
}

export default DetailsCard;
