import ErrorNotification from "../../../components/shared/error-notification/ErrorNotification";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {AuthenticationService} from "../../../services/authentication-service";
import Cookies from "js-cookie";

export default function CustomerSignIn() {
    const [userDetails, setUserDetails] = useState({
        password: "",
        username: ""
    });

    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false,
        errorMessage: "",
    });

    const navigate = useNavigate();

    const handleSignIn = () => {
        (async () => {
            try {
                const response = await AuthenticationService.login(userDetails);
                const data = response.data;

                Cookies.set("token", data.token, { expires: 7 });
                Cookies.set('user', data.userId, {expires: 7});
                navigate("/bidding");
            } catch (exception) {
                if(exception.response) {
                    setErrorOccurred({gotError: true, errorMessage: exception.response.data.message});
                } else setErrorOccurred({gotError: true, errorMessage: exception.message});
            }
        })();
    };

    const setValue = (event) => {
        const input = event.target;
        setUserDetails({ ...userDetails, [input.name]: input.value });
    };

    return (
        <div className={'container pt-4'}>
            <div className={'card bg-light ms-auto me-auto mt-5'} style={{maxWidth: '500px'}}>
                <article className={'card-body mx-auto'}>
                    <h4 className="card-title mt-3 text-center">Connexion</h4>
                    <p className="text-center mb-3">A lot of products are waiting for your bids!</p>
                    {errorOccurred.gotError && <ErrorNotification errorMessage={errorOccurred.errorMessage} />}

                    <div className={'row mt-1 g-2'}>
                        <div className={'col-md'}>
                            <div className="form-floating mb-3">
                                <input className="form-control" type="email"
                                       name="username" required={true}
                                       onChange={setValue}
                                       value={userDetails.username}
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
                                       onChange={setValue}
                                       value={userDetails.password}
                                       placeholder="Password"
                                />
                                <label htmlFor={'password'}>Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-1">
                        <button className={'btn btn-lg btn-primary'} onClick={handleSignIn}>Sign in</button>
                    </div>
                    <p className={'text-center mt-3'}>
                        Don't have an account ? <Link to={'/sign-up'} >Sign up.</Link>
                    </p>
                    <p className={'text-center mt-3'}>
                        A seller ? <Link to={'/seller/sign-in'} >Go to Bidding! for Seller.</Link>
                    </p>
                </article>
            </div>
        </div>
    );
}