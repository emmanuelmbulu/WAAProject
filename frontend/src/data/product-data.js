
export default function(name, description, price, endingTime, paymentDueDate, isSavedWithRelease, deposit, sellerId){

    this.name = name;
    this.description = description;
    this.biddingPrice = {
        price, endingTime, paymentDueDate
    };
    this.isSavedWithRelease = isSavedWithRelease;
    this.deposit = deposit;
    this.sellerId = sellerId;
}