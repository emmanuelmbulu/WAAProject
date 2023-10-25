import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import JavaDatetimeToDate from "../../utils/java-datetime-to-date";

export default function SingleBidCustomerSide(props) {
    const bid = props.item;
    const product = bid.product;

    const timeSince = new Date() - JavaDatetimeToDate(bid.createdAt);
    const [sinceBidCreated, setSinceBidCreated] = useState(timeSince);
    const [createdAt, setCreatedAt] = useState(new Date(bid.createdAt));

    useEffect(() => {
        setInterval(() => {
            setSinceBidCreated(sinceBidCreated + 1000)
        }, 1000);
    })

    const timeToString = (time) => {
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if(seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if(hours < 24) {
            return `${hours} hours ago`;
        } else if(days < 30) {
            return `${days} days ago`;
        }
        return `Since ${createdAt.toDateString()}`;
    };

    return(
        <Link to={"#"} className="list-group-item list-group-item-action" >
            <div className="d-flex w-100 justify-content-between">
                <h1>&nbsp;</h1>
                <small>{timeToString(sinceBidCreated)}</small>
            </div>
            <div className={'row'}>
                <div className={'col-md-1 col-sm-2'}>
                    {product.pictureUri && <img style={{width: '120px'}} src={product.pictureUri} alt={'Picture of ' + product.name} className={'img-thumbnail'} />}
                    {!product.pictureUri && <img style={{width: '120px'}} src={'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'} alt={'Picture of ' + product.name} className={'img-thumbnail'} />}

                </div>
                <div className={'col-md'}>
                    <p className={'align-top'}>
                        <span className="h5">{product.name}</span>
                        <br></br>
                        <small>{product.description}</small>
                    </p>
                    <p>Starting price: <mark>${product.biddingPrice.price}</mark></p>
                </div>
                <div className={'col-md'}>
                    <p className={'align-top text-success'}>
                        Your bid:
                    </p>
                    <p className={'h2'}><mark>${bid.price}</mark></p>
                </div>
            </div>
        </Link>
    )
}