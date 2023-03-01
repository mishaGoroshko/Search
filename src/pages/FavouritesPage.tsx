import React from 'react';
import {useAppSelector} from '../hooks/redux';

export const FavouritesPage = () => {
    const {favourites} = useAppSelector(state => state.github)

    return (
        <div className='p-10'>
            {!favourites.length ? <p> favourites is empty</p> : favourites.map(f =>
                <p key={f}>
                    <a href={f} target='_blank'>{f}</a>
                </p>)}
        </div>
    );
};
