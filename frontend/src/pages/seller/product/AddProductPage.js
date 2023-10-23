import Navbar from "../shared/Navbar";
import Footer from "../../customer/shared/Footer";
import SideBar from "../shared/SideBar";
import {useRef, useState} from "react";
import ProductData from "../../../data/product-data";
import {ProductService} from "../../../services/product-service";
import ErrorNotification from "../../../components/error-notification/ErrorNotification";
import {useNavigate} from "react-router-dom";

export default function AddProductPage() {
    const [productObject, setProductObject] = useState({
        name: "",
        description: "",
        price: 0.0,
        endingTime: "",
        paymentDueDate: "",
        deposit: 0.0,
        sellerId: 1,
    });

    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false,
        errorMessage: "",
    });

    const imageInput = useRef();

    const navigate = useNavigate();

    const saveWithRelease = (event) => {
        event.preventDefault(true);
        registerProduct(true);
    }

    const saveWithoutRelease = (event) => {
        event.preventDefault(true);
        registerProduct(false);
    };

    const registerProduct = (isSavedWithRelease) => {
        (async () => {
            try {
                const productData = new ProductData(
                    productObject.name,
                    productObject.description,
                    productObject.price,
                    productObject.endingTime,
                    productObject.paymentDueDate,
                    isSavedWithRelease,
                    productObject.deposit,
                    productObject.sellerId
                )

                const response = await ProductService.addProduct(productData);
                console.log(response.data);
                console.log(imageInput.current.files[0]);

                if(imageInput.current.files.length > 0) {
                    saveProductPicture(response.data.id);
                }
                //navigate('/seller/products');
            } catch (exception) {
                console.log("err is ", exception);
                if(exception.response) {
                    setErrorOccurred({gotError: true, errorMessage: exception.response.data.message});
                } else setErrorOccurred({gotError: true, errorMessage: exception.message});
            }
        })();

        const saveProductPicture = async (productId) => {
            try {
                const formData = new FormData();
                formData.append('file', imageInput.current.files[0]);
                const response = await ProductService.uploadImage(formData, productId);
                console.log("upload response is ", response);
            } catch (ex) {
                console.log("Uploading... ", ex);
            }
        }
    }

    const setValues = (event) => {
        const input = event.target;
        setProductObject({...productObject, [input.name]: input.value})
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
                            <h1>Create a product</h1>
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
                                                       value={productObject.name}
                                                       placeholder={'Product Name'} />
                                                <label htmlFor="name">Product name</label>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="text"
                                                       name = 'price' id={'price'}
                                                       onChange={setValues}
                                                       value={productObject.price}
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
                                                      value={productObject.description}></textarea>
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
                                                       value={productObject.endingTime}
                                                       placeholder={'Ending Date'} />
                                                <label htmlFor="ending">Bidding ending time</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type='datetime-local'
                                                       name ='paymentDueDate' id={'due-date'}
                                                       onChange={setValues} required={true}
                                                       value={productObject.paymentDueDate}
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
                                                       value={productObject.deposit}
                                                       placeholder='Deposit amount' />
                                                <label htmlFor={'deposit'}>Deposit amount (10% of the price, by default)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row mt-1 g-2'}>
                                        <div className={'col-md'}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="file" id="formFile"
                                                       ref={imageInput} required={true}
                                                       placeholder='Product picture'
                                                />
                                                <label htmlFor="formFile" className="form-label">Product picture</label>
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