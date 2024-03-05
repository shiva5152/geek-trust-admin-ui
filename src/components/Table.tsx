import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  selectAllUsers,
  selectUser,
  unSelectUser,
  unSelectAllUsers,
  deleteUser,
} from "../redux/features/user/slice";
import type { TUser } from "../types/user";
import EditForm from "./EditForm";

const Table = () => {
  const dispatch = useAppDispatch();
  const { filteredUsers, selectedUsers } = useAppSelector(
    (state) => state.users
  );
  const handleSelectAll = () => {
    dispatch(selectAllUsers(filteredUsers));
  };
  const handleSelect = (user: TUser) => {
    dispatch(selectUser(user));
  };
  const handleUnSelect = (user: TUser) => {
    dispatch(unSelectUser(user));
  };
  const handleUnSelectAll = () => {
    dispatch(unSelectAllUsers());
  };

  const [editableUser, setEditableUser] = useState<TUser | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleEdit = (user: TUser) => {
    setEditableUser(user);
    setIsOpened(true);
  };
  return (
    <div>
      <div className="relative min-h-[75vh] overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  id="col-checkbox"
                  type="checkbox"
                  value="all"
                  checked={filteredUsers.length === selectedUsers.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleSelectAll();
                    } else {
                      handleUnSelectAll();
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>

              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    id="row-checkbox"
                    type="checkbox"
                    value={user.id.toString()}
                    checked={selectedUsers.some((u) => u.id === user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleSelect(user);
                      } else {
                        handleUnSelect(user);
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </th>

                <td className="px-6 py-2">
                  {user.id} {user.name}
                </td>
                <td className="px-6 py-2">{user.email}</td>
                <td className="px-6 py-2">{user.role}</td>
                <td className="px-6 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline me-2"
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="text-red-600 hover:underline"
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpened && editableUser ? (
        <EditForm user={editableUser} setIsOpened={setIsOpened} />
      ) : null}
    </div>
  );
};

export default Table;
