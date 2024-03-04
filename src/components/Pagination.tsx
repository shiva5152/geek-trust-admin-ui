import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setPage,
  deleteSelectedUsers,
  deleteUser,
} from "../redux/features/user/slice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { users, filter, page, totalNumOfPage, totalUsers } = useAppSelector(
    (state) => state.users
  );
  const handlePageChange = (page: number) => {
    console.log("page", page);
    dispatch(setPage(page));
  };

  return (
    <div>
      <div aria-label="Page navigation" className="mx-auto">
        <button
          type="button"
          onClick={() => dispatch(deleteSelectedUsers())}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete Selected
        </button>
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(1)}
              className="flex items-center justify-center px-4 h-10 me-2 leading-tight text-gray-500 bg-white border rounded-e-lg border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              First
            </button>
          </li>
          <li>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Prev
            </button>
          </li>
          {Array.from({ length: totalNumOfPage }, (_, i) => i + 1).map((p) => (
            <li key={p}>
              <button
                onClick={() => handlePageChange(p)}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {p}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={page === totalNumOfPage}
              onClick={() => handlePageChange(page + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
          <li>
            <button
              disabled={page === totalNumOfPage}
              onClick={() => handlePageChange(totalNumOfPage)}
              className="flex items-center justify-center ms-2 px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Last
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
