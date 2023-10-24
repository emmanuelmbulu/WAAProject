import {Link} from "react-router-dom";

export default function SideBar() {
    return (
        <div className="card" style={{width: "15rem"}}>
            <div className="card-header">
                Quick Actions
            </div>
            <ul className="nav flex-column list-group list-group-flush">
                <li className="nav-item list-group-item">
                    <Link className="nav-link" aria-current="page" to={"/seller/products"}>My products</Link>
                </li>
                <li className="nav-item list-group-item">
                    <Link className="nav-link" aria-current="page" to={"/seller/products/add-product"}>Add product</Link>
                </li>
            </ul>
        </div>

    );
}