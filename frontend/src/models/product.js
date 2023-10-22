<<<<<<< HEAD

export class Product{
    constructor(id, name, description, price, endingTime, paymentDueDate, isSavedWithRelease, deposit) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.biddingPrice = {
            price, endingTime, paymentDueDate
        };
        this.isSavedWithRelease = isSavedWithRelease;
        this.deposit = deposit;
    }

    static creatProduct(item){
        return new Product(
          item.id, item.name, item.description, item.biddingPrice.price,
          item.biddingPrice.endingTime, item.biddingPrice.paymentDueDate,
          item.biddingPrice, this.isSavedWithRelease
        )
    }
}
=======
export default class Product {
  constructor(name, description, biddingPrice, isSavedWithRelease) {
    this.name = name;
    this.description = description;
    this.biddingPrice = biddingPrice;
    this.isSavedWithRelease = isSavedWithRelease;
  }
}
>>>>>>> origin/kaliebranch
