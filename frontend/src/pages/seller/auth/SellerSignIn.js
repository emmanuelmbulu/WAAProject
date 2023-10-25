import bgImage from '../auth/img/seller-bg.jpg';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {SellerService} from "../../../services/seller-service";
import ErrorNotification from "../../../components/shared/error-notification/ErrorNotification";
import Cookies from "js-cookie";
import {AuthenticationService} from "../../../services/authentication-service";

export default function SellerSignIn() {
    const [userDetails, setUserDetails] = useState({
        username: '', password: ''
    });

    const [error, setError] = useState({
        gotError: false, message:''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const input = e.target;
        setUserDetails({ ...userDetails, [input.name]: input.value });
    };

    const handleSignIn = () => {
        (async () => {
            try {
                const response = await AuthenticationService.login(userDetails);
                const data = response.data;
                Cookies.set("token", data.token, { expires: 7 });
                Cookies.set('user', data.userId, {expires: 7});
                navigate("/seller/products");
            } catch (exception) {
                if(exception.response) {
                    setError({gotError: true, message: exception.response.data.message});
                } else setError({gotError: true, message: exception.message});
            }
        })();
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 col-lg-4 col-sm-10 mt-5 pt-3">
                    <div className="card" >
                        <img src={bgImage} className="card-img-top" alt={'Login image'}/>
                        <div className="card-body p-5 pt-0 pb-4">
                            <h2 className='mb-5 mt-4'>Sign in as a Seller</h2>
                            {error.gotError && <ErrorNotification errorMessage={error.message} />}
                            <div className={'row mt-1 g-2'}>
                                <div className={'col-md'}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="email"
                                               name="username" required={true}
                                               value={userDetails.username}
                                               onChange={handleInputChange}
                                               placeholder="Email address" id={'email'}
                                        />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                </div>
                            </div>
                            <div className={'row mt-1 g-2'}>
                                <div className={'col-md'}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control"
                                               type="password" required={true}
                                               name="password" id={'password'}
                                               value={userDetails.password}
                                               onChange={handleInputChange}
                                               placeholder="Password"
                                        />
                                        <label htmlFor={'password'}>Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-2 mt-1">
                                <button className={'btn btn-lg btn-primary'} onClick={handleSignIn}>Sign In</button>
                                <Link to={'/seller/sign-up'} className={'btn btn-link'}>I am not member</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}