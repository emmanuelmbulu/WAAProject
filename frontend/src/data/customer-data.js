
export default function(firstName, lastName, password, email, licenseNumber){
    this.name = {
        firstName, lastName
    };
    this.password = password;
    this.emailAddress = email;
    this.licenseNumber = licenseNumber;
}