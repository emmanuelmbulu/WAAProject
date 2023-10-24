import {useEffect, useState} from "react";


export default function SingleBidCustomer(props){
    const bid = props.item;
    const product = bid.product;

    const timeSince = new Date() - new Date(product.createdAt);
    const [sinceBidCreated, setSinceBidCreated] = useState(timeSince);
    const [createdAt, setCreatedAt] = useState(new Date(product.createdAt));

    useEffect(() => {
        setInterval(() => {
            setSinceBidCreated(sinceBidCreated + 1000)
        }, 1000);
    })

    const timeToString = (time) => {
        function formatTime(t) {
            if (t <= 9) return "0" + t;
            return t;
        }

        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

      if(seconds < 60) {
          return `${formatTime(seconds)} ago`;
      } else if (minutes < 60) {
          return `${formatTime(minutes)} ago`;
      } else if(hours < 24) {
          return `${formatTime(hours)} ago`;
      } else if(days < 30) {
          return `${formatTime(days)} ago`;
      }
      return `Since ${createdAt.toDateString()}`;
    };

    return(
        <div>
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{product.name}</h5>
                    <small>{sinceBidCreated}</small>
                    <img src={product.pictureUri} alt={'Picture of ' + product.name} />
                </div>
                <p className="mb-1">{bid.price}</p>
                <small>{timeToString(sinceBidCreated)}</small>
            </a>
        </div>
    )
}