import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/features/users/usersSlice";

function UserData() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const { users, isLoading, error } = useSelector((state) => state.user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {users.results && users.results.length > 0 ? (
        <ul>
          {users.results.map((user) => (
            <li key={user.id}>{user.name.first}</li>
          ))}
        </ul>
      ) : (
        <div>No users to display</div>
      )}
    </div>
  );
}

export default UserData;
