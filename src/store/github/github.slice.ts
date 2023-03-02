import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GithubState {
    favourites: string[]
}

enum LS {
    favouriteKey = 'favouriteKey'
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS.favouriteKey) ?? '[]')
    // favourites: []
}

const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<string>) => {
            state.favourites.push(action.payload)
            localStorage.setItem(LS.favouriteKey, JSON.stringify(state.favourites))
        },
        removeFavourite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter(u => u !== action.payload)
            localStorage.setItem(LS.favouriteKey, JSON.stringify(state.favourites))
        },
    }
})

export const githubAction = githubSlice.actions
export const githubReducer = githubSlice.reducer