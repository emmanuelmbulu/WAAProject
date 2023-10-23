import {Link} from "react-router-dom";
import {useState} from "react";


export default function SingleProductSeller(props){
    const product = props.item;

    return (
        <div>
            <div className="col">
                <div className="card h-100">
                    <img src={'/images/'+product.id+'.jpg'} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: {product.biddingPrice.price}</p>
                        {!product.isSavedWithRelease && <Link to={'/product/edit'}
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Product-Edit</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}