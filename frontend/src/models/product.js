export class Product {
  constructor(
    id,
    name,
    description,
    price,
    endingTime,
    paymentDueDate,
    isSavedWithRelease
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.biddingPrice = {
      price,
      endingTime,
      paymentDueDate,
    };
    this.isSavedWithRelease = isSavedWithRelease;
  }
}
