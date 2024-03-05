import type { TUser } from "../types/user"
import type { AppDispatch } from "../redux/store";
import { setUsersByFilter, setPage } from "../redux/features/user/slice";

export const filterUsers = (users: TUser[], filter: string, page: number, dispatch: AppDispatch) => {

    const usersPerPage = 10;

    let filteredUsers = users;
    if (filter !== '') {
        filteredUsers = users.filter((user) => {
            return user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.role.toLowerCase().includes(filter.toLowerCase());
        });
    }

    const totalNumOfPage = Math.ceil(filteredUsers.length / usersPerPage);
    dispatch(setUsersByFilter({ users: filteredUsers.length > 10 ? filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage) : filteredUsers, totalNumOfPage, totalUsers: filteredUsers.length }));
    if (page > totalNumOfPage) {
        dispatch(setPage(totalNumOfPage));
    }
}
