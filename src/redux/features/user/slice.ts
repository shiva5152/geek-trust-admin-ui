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
    filteredUsers: TUser[],
    selectedUsers: TUser[],
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
    filteredUsers: [],
    selectedUsers: [],
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
        },
        selectUser: (state, action: PayloadAction<TUser>) => {
            state.selectedUsers.push(action.payload);
        },
        selectAllUsers: (state, action: PayloadAction<TUser[]>) => {
            state.selectedUsers = action.payload;
        },
        unSelectUser: (state, action: PayloadAction<TUser>) => {
            state.selectedUsers = state.selectedUsers.filter(
                (user) => user.id !== action.payload.id
            );
        },
        unSelectAllUsers: (state) => {
            state.selectedUsers = [];
        },
        deleteSelectedUsers: (state) => {
            state.users = state.users.filter(
                (user) => !state.selectedUsers.find((selectedUser) => selectedUser.id === user.id)
            );
            state.selectedUsers = [];
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
})

export const {
    getUsersStart,
    getUsersFail,
    getUsersSuccess,
    setUsersByFilter,
    setFilter,
    setPage,
    selectUser,
    selectAllUsers,
    unSelectUser,
    unSelectAllUsers,
    deleteSelectedUsers,
    deleteUser,
} = userDataSlice.actions

export default userDataSlice.reducer