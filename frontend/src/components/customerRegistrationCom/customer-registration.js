import {CustomerService} from "../../service/customer-service";
import CustomerData from "../../data/customer-data";



export default function CustomerRegistrationComponent(){

    const [customerObject, setCustomerObject] = useState({
        firstName: "",
        lastName: "",
        passWord: "",
        email: "",
        licenseNumber: ""
    });


    const signup = (event) => {
        event.preventDefault(true);
        const customer = new CustomerData(
            customerObject.firstName,
            customerObject.lastName,
            customerObject.passWord,
            customerObject.email,
            customerObject.licenseNumber);

        //console.log(customer);
       CustomerService.addCustomer(customer);
    }
    return(
        <div>
            <form>
                <input onChange={(event) => setCustomerObject({...customerObject, firstName: event.target.value})}
                       value={customerObject.firstName} placeholder={"First Name"}/>
                <input onChange={(event) => setCustomerObject({...customerObject, lastName: event.target.value})}
                       value={customerObject.lastName}  placeholder={"Last Name"}/>
                <input type={"password"} onChange={(event) => setCustomerObject({...customerObject, passWord: event.target.value})}
                       value={customerObject.passWord}  placeholder={"Password"}/>
                <input onChange={(event) => setCustomerObject({...customerObject, email: event.target.value})}
                       value={customerObject.email}  placeholder={"E-mail Address"}/>
                <input onChange={(event) => setCustomerObject({...customerObject, licenseNumber: event.target.value})}
                       value={customerObject.licenseNumber}  placeholder={"License Number"}/>
                <button onClick={signup}>SignUp</button>

            </form>
        </div>
    );
}