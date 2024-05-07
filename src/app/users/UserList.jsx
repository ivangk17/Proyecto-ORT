import "./users.css";
import User from "./User";

export default function UserList(props) {
  return (
    <ul className="users-list">
      {props.Users.map((user) => {
        return (
          <User
            Id={user["Object Id"]}
            UserName={user["Display name"]}
            Title={user.Title}
            Picture={user.Picture}
          />
        );
      })}
    </ul>
  );
}
