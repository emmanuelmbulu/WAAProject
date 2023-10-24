import {Link} from "react-router-dom";

export default function SingleProductForSeller(props) {
    const product = props.item;

    return (
        <div className="card">
            <img src={product.pictureUri} className="card-img-top border-bottom" alt={product.name}/>
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={'/seller/products/' + product.id} className={'text-decoration-none'}>{product.name}</Link>
                </h5>
            </div>
            <div className={'card-body'}>
                <p className={'h4'}><mark>${product.biddingPrice.price}</mark></p>
            </div>
            {!product.savedWithRelease && <div className={'card-body'}>
                <div className={'row ps-2 pe-2'}>
                    <Link to={'/seller/products/' + product.id +'/edit'}
                          className="btn btn-primary">Edit</Link>
                </div>
            </div>}
        </div>
    )
}