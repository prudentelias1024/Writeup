import React from 'react';

const DetailsCard = ({color}) => {
    return (
        <div className={color + " text-white rounded-xl px-16 py-5 w-[25em]"}>
            <p className="details_amount text-5xl  text-bold">
                0
            </p>
            <p className="details_content font-[Montserrat] text-2xl font-semibold -ml-3 mt-5 text-white-400">
                Total post reactions
            </p>
        </div>
    );
}

export default DetailsCard;
