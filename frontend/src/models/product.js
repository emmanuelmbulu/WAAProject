
export class Product{
    constructor(id, name, description, price, endingTime, paymentDueDate, isSavedWithRelease) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.biddingPrice = {
            price, endingTime, paymentDueDate
        };
        this.isSavedWithRelease = isSavedWithRelease;
    }

    static creatProduct(item){
        return new Product(
          item.id, item.name, item.description, item.biddingPrice.price,
          item.biddingPrice.endingTime, item.biddingPrice.paymentDueDate,
          item.biddingPrice, this.isSavedWithRelease
        )
    }
}