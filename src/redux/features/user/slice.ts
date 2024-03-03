import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TUser } from '../../../types/user'

type TJobPstState = {
    users: TUser[],
    loading: boolean,
    error: string | null,
    page: number,
    totalNumOfPage: number,
    totalUsers: number,
    filter: string,
    filteredUsers: TUser[]
}

type TForGetAllUsers = {
    users: TUser[],
    totalNumOfPage: number,
    totalUsers: number,
}

const initialState: TJobPstState = {
    users: [],
    loading: false,
    error: null,
    page: 1,
    totalNumOfPage: 1,
    totalUsers: 0,
    filter: '',
    filteredUsers: []
}

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, action: PayloadAction<TForGetAllUsers>) => {
            state.loading = false;
            state.users = action.payload.users;
            state.error = null;
        },
        getUsersFail: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setUsersByFilter: (state, action: PayloadAction<TForGetAllUsers>) => {
            state.filteredUsers = action.payload.users;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalUsers = action.payload.totalUsers;
        }

    },
})

export const { getUsersStart, getUsersFail, getUsersSuccess, setUsersByFilter, setFilter, setPage } = userDataSlice.actions

export default userDataSlice.reducer