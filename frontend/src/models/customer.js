export class Customer{

    constructor(id, firstName, lastName, email, licenseNumber){
        this.id = id;
        this.name = {
            firstName, lastName
        };
        this.emailAddress = email;
        this.licenseNumber = licenseNumber;
    }
    static createCustomer(item) {
        return new Customer(
            item.id, item.name.firstName, item.name.lastName,
            item.emailAddress, item.licenseNumber
        );
    }

}