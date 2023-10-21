
export class Product{
    constructor(id, name, description, biddingPrice, isSavedWithRelease) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.biddingPrice = {
            price, ending
        };
        this.isSavedWithRelease = isSavedWithRelease;
    }

    static creatProduct(item){
        return new Product(
          item.id, item.name, item.description,
          item.biddingPrice, this.isSavedWithRelease
        )
    }
}