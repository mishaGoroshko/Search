import React, {ChangeEvent, useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api';
import {useDebounce} from '../hooks/debounce';
import {Repo} from '../components/Repo';

export const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debouncedSearch = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUsersQuery(
        debouncedSearch, {
            skip: debouncedSearch.length < 3,
            refetchOnFocus: true
        })
    const [fetchRepos, {
        isLoading: areLoadingRepos,
        data: repos
    }] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debouncedSearch.length > 2 && users?.length! > 0)
    }, [debouncedSearch, users])

    const changeSearchHandle = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
    const chooseUserHandle = (userName: string) => {
        fetchRepos(userName)
        setDropdown(false)
    }

    return (
        <div className='h-100 w-100 flex justify-center pt-10 mx-auto'>
            {isError && <p className='text-red-600'>Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input type='text'
                       placeholder='Search for Github username...'
                       className='w-full h-[42px] px-4 border-2 mb-2'
                       value={search}
                       onChange={changeSearchHandle}
                />
                {dropdown && <ul
                    className='absolute top-[42px] left-0 right-0 overflow-y-scroll max-h-[200px] shadow-md bg-white'>
                    {isLoading && <p>Loading...</p>}

                    {users?.map((user) =>
                        <li key={user.id}
                            onClick={() => chooseUserHandle(user.login)}
                            className='hover:bg-gray-500 hover:text-white transition-all cursor-pointer select-none'>{user.login}</li>)}
                </ul>}
                <div className='container'>
                    {areLoadingRepos &&
                        <p className='text-center'>Repos are loading...</p>}
                    {repos?.map(repo => <Repo key={repo.id} repo={repo}/>)}
                </div>
            </div>
        </div>
    );
};
