import instance from "../../../lib/axios";
import { getUsersFail, getUsersStart, getUsersSuccess } from "./slice";
import { AxiosError } from "axios";
import type { AppDispatch } from "../../store";

export const getUsers = async (dispatch: AppDispatch) => {

    dispatch(getUsersStart());
    try {

        const { data } = await instance("/members.json");
        const totalUsers = data.length;
        const usersPerPage = 10;
        dispatch(getUsersSuccess({ users: data, totalNumOfPage: Math.ceil(totalUsers / usersPerPage), totalUsers: totalUsers }));


    } catch (error) {
        const e = error as AxiosError;
        const res = e.response as any;
        dispatch(getUsersFail(res.message));

    }
}