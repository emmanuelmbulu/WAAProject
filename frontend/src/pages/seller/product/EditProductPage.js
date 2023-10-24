import Navbar from "../shared/Navbar";
import SideBar from "../shared/SideBar";
import Footer from "../../../components/shared/Footer";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ProductService} from "../../../services/product-service";
import ProductData from "../../../data/product-data";
import ErrorNotification from "../../../components/shared/error-notification/ErrorNotification";
import JavaDatetimeToString from "../../../utils/java-datetime-to-string";

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0.0,
        endingTime: new Date().toDateString(),
        paymentDueDate: new Date().toDateString(),
        depositAmount: 0.0
    });

    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false,
        errorMessage: "",
    });


    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getProduct(productId);
                const item = response.data;
                const p = {
                    name: item.name,
                    description: item.description,
                    price: item.biddingPrice.price,
                    endingTime: JavaDatetimeToString(item.biddingPrice.endingTime),
                    paymentDueDate: JavaDatetimeToString(item.biddingPrice.paymentDueDate),
                    depositAmount: item.depositAmount
                };
                setProduct(p);
            } catch (err) {
                navigate('/seller/product-not-found');
            }
        })();
    }, []);

    const saveWithRelease = (event) => {
        event.preventDefault(true);
        saveUpdate(true);
    }

    const saveWithoutRelease = (event) => {
        event.preventDefault(true);
        saveUpdate(false);
    };

    const saveUpdate = (isSavedWithRelease) => {
        (async () => {
            try {
                const productData = new ProductData(
                    product.name,
                    product.description,
                    product.price,
                    product.endingTime,
                    product.paymentDueDate,
                    isSavedWithRelease,
                    product.depositAmount
                )

                const response = await ProductService.updateProduct(productId, productData);
                navigate('/seller/products/' + productId);
            } catch (exception) {
                if(exception.response) {
                    setErrorOccurred({gotError: true, errorMessage: exception.response.data.message});
                } else setErrorOccurred({gotError: true, errorMessage: exception.message});
            }
        })();
    }

    const setValues = (event) => {
        const input = event.target;
        setProduct({...product, [input.name]: input.value})
    }

    return (
        <>
            <Navbar />
            <section className="py-3">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className={'row'}>
                        <div className={'col-md-3 col-sm-5'}>
                            <SideBar />
                        </div>
                        <div className={'col-md-9 col-sm-7'}>
                            <h1>Edit {product.name}</h1>
                            <hr />
                            <div className={'row'}>
                                <div className="col-md-6 col-sm-9 mt-3">
                                    {errorOccurred.gotError && <ErrorNotification errorMessage={errorOccurred.errorMessage} />}
                                    <div className="row g-2 mt-1">
                                        <div className="col-md">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="text"
                                                       name='name' id={'name'}
                                                       onChange={setValues} required={true}
                                                       value={product.name}
                                                       placeholder={'Product Name'} />
                                                <label htmlFor="name">Product name</label>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="text"
                                                       name = 'price' id={'price'}
                                                       onChange={setValues}
                                                       value={product.price}
                                                       placeholder={'Price'} />
                                                <label htmlFor="price">Price</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row mt-1 g-2'}>
                                        <div className={'col-md'}>
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control"
                                                          name ='description' id={'description'}
                                                          onChange={setValues}
                                                          placeholder={'Description'}
                                                          value={product.description}></textarea>
                                                <label htmlFor={'description'}>Product description</label>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={'form-text'}>Bidding information</p>
                                    <div className="row g-2 mt-1">
                                        <div className="col-6">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type='datetime-local'
                                                       name = 'endingTime' id={'ending'}
                                                       onChange={setValues} required={true}
                                                       value={product.endingTime}
                                                       placeholder={'Ending Date'} />
                                                <label htmlFor="ending">Bidding ending time</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type='datetime-local'
                                                       name ='paymentDueDate' id={'due-date'}
                                                       onChange={setValues} required={true}
                                                       value={product.paymentDueDate}
                                                       placeholder={'Payment Due Date'} />
                                                <label htmlFor="due-date">Payment due date</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row mt-1 g-2'}>
                                        <div className={'col-md'}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type={'text'}
                                                       name='deposit' id={'deposit'}
                                                       onChange={setValues}
                                                       value={product.depositAmount}
                                                       placeholder='Deposit amount' />
                                                <label htmlFor={'deposit'}>Deposit amount (10% of the price, by default)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row mt-1'}>
                                        <div className={'col'}>
                                            <button className={'btn btn-success'} onClick={saveWithRelease}>Save with release</button>
                                        </div>
                                        <div className={'col-md'}>
                                            <button className={'btn btn-secondary'} onClick={saveWithoutRelease}>Save without release</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}