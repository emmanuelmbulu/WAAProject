
export default function(name, description, price, endingTime, paymentDueDate, isSavedWithRelease, deposit, sellerId){

    this.name = name;
    this.description = description;
    this.biddingPrice = {
        price, endingTime, paymentDueDate
    };
    this.savedWithRelease = isSavedWithRelease;
    this.depositAmount = deposit;
    this.sellerId = sellerId;

    this.toString = () => {
        return `{"name":"${this.name}",
            "description":"${this.description}",
            "biddingPrice":{
            "price":${this.biddingPrice.price},
            "endingTime":"${this.biddingPrice.endingTime}",
            "paymentDueDate":"${this.biddingPrice.paymentDueDate}"
            },
            "savedWithRelease":${this.savedWithRelease},
            "depositAmount":"${this.depositAmount}",
            "sellerId":${this.sellerId} 
            }`;
    }
}