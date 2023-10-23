import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {SellerService} from "../../../services/seller-service";
import ErrorNotification from "../../../components/error-notification/ErrorNotification";
import signupImage from '../auth/img/seller-signup.jpeg';

export default function SellerSignUp() {
    const [seller, setSeller] = useState({
        name: { firstName: "", lastName: "" },
        emailAddress: "",
        password: "",
        address: { street: "", city: "", state: "", zipCode: "" },
    });

    const [error, setError] = useState({
        gotError: false, message:''
    });

    const navigate = useNavigate();

    const handleName = (e) => {
        const input = e.target;
        setSeller({
            ...seller,
            name: { ...seller.name, [input.name]: input.value },
        });
    };
    const handleAddress = (e) => {
        const input = e.target;
        setSeller({
            ...seller,
            address: { ...seller.address, [input.name]: input.value },
        });
    };

    const handleSignup = () => {
        try {
            SellerService.addSeller(seller);
            navigate("/seller/sign-in");
        } catch (exception) {
            if(exception.response) {
                setError({gotError: true, message: exception.response.data.message});
            } else setError({gotError: true, message: exception.message});
        }
    };

    const handleInputChange = (e) => {
        const input = e.target;
        setSeller({ ...seller, [input.name]: input.value });
    };

    return (
        <div className={'row'}>
            <div className={'col-md-7 col-sm-6'}>
                <img className={'img-fluid'} src={signupImage}  alt={'Sign up image.'}/>
            </div>
            <div className={'col-md-4 col-sm-6 p-5'}>
                <div className={'container'}>
                    <h2 className='mb-3'>Sign up as a Seller</h2>
                    {error.gotError && <ErrorNotification errorMessage={error.message} />}
                    <div className="row g-2 mt-1">
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="firstName" id="first-name"
                                       value={seller.name.firstName}
                                       onChange={handleName} required={true}
                                       placeholder="Firstname" />
                                <label htmlFor="first-name">Firstname</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="lastName" id="last-name"
                                       value={seller.name.lastName}
                                       onChange={handleName} required={true}
                                       placeholder="Lastname" />
                                <label htmlFor="last-name">Lastname</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-1 g-2'}>
                        <div className={'col-md'}>
                            <div className="form-floating mb-3">
                                <input className="form-control" type="email"
                                       name="emailAddress" required={true}
                                       value={seller.emailAddress}
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
                                    value={seller.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                />
                                <label htmlFor={'password'}>Password</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-1 g-2'}>
                        <div className={'col-md'}>
                            <div className="form-floating mb-3">
                                <textarea className="form-control"
                                       required={true}
                                       name="street" id={'street'}
                                       onChange={handleAddress}
                                       placeholder="Street"
                                >{seller.address.street}</textarea>
                                <label htmlFor={'street'}>Address street</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-1">
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="city" id={'city'}
                                       value={seller.address.city}
                                       onChange={handleAddress} required={true}
                                       placeholder="city" />
                                <label htmlFor="city">City</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="state" id={'state'}
                                       value={seller.address.state}
                                       onChange={handleAddress} required={true}
                                       placeholder="State" />
                                <label htmlFor={'state'}>State</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="zipCode" id={'zip-code'}
                                       value={seller.address.zipCode}
                                       onChange={handleAddress} required={true}
                                       placeholder="Zip code" />
                                <label htmlFor={'zip-code'}>Zip code</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-1">
                        <button className={'btn btn-lg btn-primary'} onClick={handleSignup}>Sign Up</button>
                        <Link to={'/seller/sign-in'} className={'btn btn-link'}>I am already a member.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}