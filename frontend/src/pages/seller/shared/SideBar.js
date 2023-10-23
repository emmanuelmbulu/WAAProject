import {Link} from "react-router-dom";

export default function SideBar() {
    return (
        <ul className="nav flex-column nav-underline">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"#"}>Active</Link>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      to={"#"} role="button"
                      aria-expanded="false">My Products</Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to={'/products'}>My products</Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to={'/products/add'}>Add product</Link>
                    </li>
                </ul>
            </li>
        </ul>
    );
}