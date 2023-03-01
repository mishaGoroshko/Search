import React, {MouseEvent, useEffect, useState} from 'react';
import {IRepo} from '../models/models';
import {useActions} from '../hooks/actions';
import {useAppSelector} from '../hooks/redux';

export const Repo = ({repo}: { repo: IRepo }) => {
    const {addFavourite, removeFavourite} = useActions()
    const {favourites} = useAppSelector(state => state.github)
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    useEffect(() => {
        setIsFav(favourites.includes(repo.html_url))
        console.log(favourites.includes(repo.html_url))
    }, [favourites])

    const addToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addFavourite(repo.html_url)
    }
    const removeFromFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeFavourite(repo.html_url)
    }

    return (
        <div
            className='border mb-2 p-2 rounded bg-gray-100 hover:bg-gray-200 hover:shadow-md transition-all'>
            <h3
                className='text-lg font-bold'>
                <a href={repo.html_url} target='_blank' className="hover:underline">{repo.name}</a>
            </h3>
            <p>watchers: <span
                className='text-mb'>{repo.watchers}</span> forks: {repo.forks}</p>
            <p className='text-sm font-thin'>{repo?.description}</p>
            {!isFav ? <button
                    className='p-2 rounded bg-amber-400 shadow-md hover:bg-amber-500 transition-all cursor-pointer'
                    onClick={addToFavourite}>Add
                </button>
                : <button
                    className='p-2 rounded bg-orange-500 shadow-md hover:bg-orange-600 transition-all cursor-pointer'
                    onClick={removeFromFavourite}>Remove
                </button>}

        </div>
    );
};
