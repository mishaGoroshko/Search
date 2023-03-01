import React from 'react';
import {Link} from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav
            className='flex justify-between items-center bg-gray-500 px-5 shadow-md h-[50px] text-white'>
            <h3 className='font-bold'>Github search</h3>

            <span className='flex gap-x-2 flex-wrap'>
                <Link to='/'>Home</Link>
                <Link to='favourite'>Favourites</Link>
            </span>
        </nav>
    );
};
