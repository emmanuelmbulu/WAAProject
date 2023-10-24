import {Link, useNavigate, useParams} from "react-router-dom";
import Navbar from "../shared/Navbar";
import SideBar from "../shared/SideBar";
import Footer from "../../../components/shared/Footer";
import React, {useEffect, useRef, useState} from "react";
import {ProductService} from "../../../services/product-service";
import JavaDatetimeToDate from "../../../utils/java-datetime-to-date";

export default function ProductDetailsPage(props) {
    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState(null);
    const [hasNewPicture, setHasNewPicture] = useState(false);
    const navigate = useNavigate();
    const imageInput = useRef();
    const tagImage = useRef();

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getProduct(productId);
                const item = response.data;
                setProduct(item);
            } catch (err) {
                navigate('/seller/product-not-found');
            }
        })();
    }, []);

    const saveProductPicture = async () => {
        const selectedImage = imageInput.current.files[0];
        if(selectedImage) {
            try {
                const formData = new FormData();
                formData.append('file', selectedImage);
                const response = await ProductService.uploadImage(formData, productId);
                if(response) {
                    const imageUrl = URL.createObjectURL(selectedImage);
                    tagImage.current.src = imageUrl;
                    setHasNewPicture(true);
                }
            } catch (ex) {
                console.log("Uploading... ", ex);
                alert("Uploading failed. Please try again later. Make sure that you are using .jpg or .png file.");
                setHasNewPicture(false);
            }
        }
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
                            <h1>My products</h1>
                            <hr />
                            <div className={'row mt-5'}>
                                <div className="col-md-6">
                                    {product && product.pictureUri && <img ref={tagImage} className="card-img-top mb-5 mb-md-0 border" src={product.pictureUri} alt={product.name}/>}
                                    {product && !product.pictureUri && <img ref={tagImage} className="card-img-top mb-5 mb-md-0 border" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt={product.name}/>}
                                    <p className={'text-center'}>
                                        <button className={'btn btn-link'}
                                              data-bs-toggle="modal"
                                              data-bs-target={"#modalEditPicture"}>Edit picture</button>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <div className="small mb-1">PRODUCT</div>
                                    <h1 className="display-5 fw-bolder">{product && product.name}</h1>
                                    <p className="lead">{product && product.description}</p>
                                    <div className="fs-5 mt-4 mb-3">
                                        <span className={'h4'}>Bidding starting price: <mark>${product && product.biddingPrice.price}</mark></span>
                                    </div>
                                    <p className={'lead'}>
                                        <span>Bidding ending time:</span>
                                        <br/>
                                        {product && <strong className="text-success">{JavaDatetimeToDate(product.biddingPrice.endingTime).toString()}</strong>}
                                    </p>
                                    <p className={'lead'}>
                                        <span>Deposit amount:</span>
                                        <br/>
                                        {product && <strong className="text-success">${product.depositAmount}</strong>}
                                    </p>
                                    <div className="d-flex">
                                        {product && !product.savedWithRelease && <Link to={'/seller/products/' + productId + '/edit'}
                                            className="btn btn-primary flex-shrink-0"
                                            >EDIT PRODUCT</Link>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>

            <div className="modal fade" id={"modalEditPicture"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit picture for {product && product.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveProductPicture}>Validate</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}