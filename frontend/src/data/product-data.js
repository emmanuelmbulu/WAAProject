
export default function(id, name, description, price, endingTime, paymentDueDate, isSavedWithRelease, sellerId){
    this.id = id;
    this.name = name;
    this.description = description;
    this.biddingPrice = {
        price, endingTime, paymentDueDate
    };
    this.isSavedWithRelease = isSavedWithRelease;
    this.sellerId = sellerId;
}