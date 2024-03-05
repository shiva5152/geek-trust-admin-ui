import React, { useState } from "react";
import { TUser } from "../types/user";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUsersByFilter } from "../redux/features/user/slice";

type TProps = {
  user: TUser;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditForm = ({ user, setIsOpened }: TProps) => {
  const dispatch = useAppDispatch();
  const [userForm, setUserForm] = useState<TUser>(user);
  const { filteredUsers, totalNumOfPage, totalUsers } = useAppSelector(
    (state) => state.users
  );

  const handleForm = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    setUserForm({ ...userForm, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userIndex = filteredUsers.findIndex(
      (user) => user.id === userForm.id
    );
    if (userIndex !== -1) {
      const newFilteredUsers = [
        ...filteredUsers.slice(0, userIndex),
        userForm,
        ...filteredUsers.slice(userIndex + 1),
      ];

      dispatch(
        setUsersByFilter({
          users: newFilteredUsers,
          totalNumOfPage,
          totalUsers,
        })
      );
    }
    setIsOpened(false);
  };

  return (
    <div
      onClick={() => setIsOpened(false)}
      className="fixed z-10 w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-sm  inset-0 overflow-y-auto"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className=" bg-blue-50 p-[2rem]  w-[30%] rounded-lg"
      >
        <div
          onClick={() => setIsOpened(false)}
          className="w-fit flex cursor-pointer justify-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center w-full gap-6 mb-6 ">
          <div className="w-[60%]">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              value={userForm.name}
              onChange={handleForm}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="w-[60%]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userForm.email}
              onChange={handleForm}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="xyz@gmail.com"
              required
            />
          </div>
          <div className="w-[60%]">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              value={userForm.role}
              onChange={handleForm}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="member"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 mx-auto flex justify-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditForm;
