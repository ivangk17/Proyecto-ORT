import "./users.css";
import Link from "next/link";

export default function User(props) {
  return (
    <li className="user-item">
      <div className="card user-item__content">
        <Link href="#">
          <div className="user-item__image avatar">
            <img src={props.Picture} alt="{props.UserName}" />
          </div>
          <div className="user-item__info">
            <h2>{props.UserName}</h2>
            <h2>{props.Title}</h2>
          </div>
        </Link>
      </div>
    </li>
  );
}
