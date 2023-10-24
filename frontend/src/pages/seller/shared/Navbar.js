import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {SellerService} from "../../../services/seller-service";

export default function Navbar () {

    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        (async () => {
            try {
                const response = await SellerService.getCurrentSeller();
                setSeller(response.data);
            } catch (exception) {
                console.log(exception);
                //navigate('/seller/sign-in');
            }
        })();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-body">
            <div className="container px-4 px-lg-5">
                <Link to={'/seller/products'} className={'navbar-brand'}>Bidding! for Sellers</Link>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li key={1} className="nav-item">
                            <Link to={'/seller/products'} className="nav-link" aria-current="page">Home</Link>
                        </li>
                        <li key={2} className="nav-item">
                            <Link to={'#'} className="nav-link" aria-current="page">Bids History</Link>
                        </li>
                    </ul>
                    <ul className="d-flex">
                        <li key={1} className="nav-item dropdown">
                            <Link to='#' className="nav-link dropdown-toggle"
                                  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {!seller && "Emmanuel Mbulu"}
                                {seller && `${seller.name.firstName} ${seller.name.lastName}`}
                            </Link>
                            <ul className="dropdown-menu">
                                <li key={1}><Link to={'#'} className="dropdown-item" >Profile</Link></li>
                                <li key={2}><Link to={'#'} className="dropdown-item" >Log out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}