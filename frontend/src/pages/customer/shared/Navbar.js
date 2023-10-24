import {Link} from "react-router-dom";

export default function Navbar () {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link to={'/'} className={'navbar-brand'}>Bidding!</Link>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/winners'} className="nav-link" >Winners</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/bids'} className="nav-link" >Bids</Link>
                        </li>
                    </ul>
                    <ul className="d-flex">
                        <li className="nav-item dropdown">
                            <Link to={'#'} className="nav-link dropdown-toggle"
                                  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Emmanuel Mbulu
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to={'#'} className="dropdown-item" >Log out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}