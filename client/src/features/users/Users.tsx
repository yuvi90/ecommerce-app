import { useGetUsersQuery } from "./userAPI";
import { Link } from "react-router-dom";

const Users = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>
          {data?.users.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
        <Link to="/">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default Users;
