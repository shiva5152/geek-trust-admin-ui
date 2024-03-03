import { useEffect } from "react";
import { getUsers } from "./redux/features/user/api";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Table, Filter, Pagination } from "./components";
import { filterUsers } from "./helper/filter";

function App() {
  const dispatch = useAppDispatch();
  const { users, filter, page } = useAppSelector((state) => state.users);

  useEffect(() => {
    getUsers(dispatch);
  }, []);

  useEffect(() => {
    if (users.length) filterUsers(users, filter, page, dispatch);
  }, [users, filter, page]);

  return (
    <main className=" min-h-screen flex flex-col px-4">
      <Filter />
      <Table />
      <Pagination />
    </main>
  );
}

export default App;
