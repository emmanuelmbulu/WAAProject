import {useState} from "react";
import CustomerData from "../../../data/customer-data";
import {CustomerService} from "../../../services/customer-service";
import ErrorNotification from "../../../components/shared/error-notification/ErrorNotification";
import {Link, useNavigate} from "react-router-dom";

export default function CustomerSignUp() {
    const [customerObject, setCustomerObject] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        licenseNumber: "",
    });

    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false,
        errorMessage: "",
    });

    const navigate = useNavigate();

    const signup = (event) => {
        (async () => {
            try {
                event.preventDefault(true);
                const customer = new CustomerData(
                    customerObject.firstName,
                    customerObject.lastName,
                    customerObject.password,
                    customerObject.email,
                    customerObject.licenseNumber
                );
                const response = await CustomerService.addCustomer(customer);
                navigate('/sign-in');
            } catch (exception) {
                if(exception.response) {
                    setErrorOccurred({gotError: true, errorMessage: exception.response.data.message});
                } else setErrorOccurred({gotError: true, errorMessage: exception.message});
            }
        })();
    };

    const setValue = (event) => {
        const input = event.target;
        setCustomerObject({ ...customerObject, [input.name]: input.value });
    };

    return (
        <div className={'container pt-4'}>
            <div className={'card bg-light ms-auto me-auto mt-5'} style={{maxWidth: '500px'}}>
                <article className={'card-body mx-auto'}>
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <p className="text-center mb-3">Get started with your free account.</p>
                    {errorOccurred.gotError && <ErrorNotification errorMessage={errorOccurred.errorMessage} />}
                    <div className="row g-2 mt-1">
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="firstName" id="first-name"
                                       value={customerObject.firstName}
                                       onChange={setValue} required={true}
                                       placeholder="Firstname" />
                                <label htmlFor="first-name">Firstname</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text"
                                       name="lastName" id="last-name"
                                       value={customerObject.lastName}
                                       onChange={setValue} required={true}
                                       placeholder="Lastname" />
                                <label htmlFor="last-name">Lastname</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-1 g-2'}>
                        <div className={'col-md'}>
                            <div className="form-floating mb-3">
                                <input className="form-control" type="email"
                                       name="email" required={true}
                                       onChange={setValue}
                                       value={customerObject.email}
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
                                       value={customerObject.password}
                                       placeholder="Password"
                                />
                                <label htmlFor={'password'}>Password</label>
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-1 g-2'}>
                        <div className={'col-md'}>
                            <div className="form-floating mb-3">
                                <input className="form-control"
                                       type="text" required={true}
                                       name="licenseNumber"
                                       onChange={setValue}
                                       value={customerObject.licenseNumber}
                                       placeholder="License number"
                                />
                                <label htmlFor={'license'}>License number</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mt-1">
                        <button className={'btn btn-lg btn-primary'} onClick={signup}>Sign Up</button>
                    </div>
                    <p className={'text-center mt-3'}>
                        Have an account ? <Link to={'/sign-in'} >Sign in.</Link>
                    </p>
                    <p className={'text-center mt-3'}>
                        A seller ? <Link to={'/sign-in'} >Go to Bidding! for Seller.</Link>
                    </p>
                </article>
            </div>
        </div>
    );
}