import {useRef} from "react";
import {CustomerService} from "../../service/customer-service";
import {Customer} from "../../models/customer";


export default function CustomerRegistrationComponent(){

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const signup = (event) => {
        event.preventDefault(true);
        const customer = new Customer(input1.current.value, input2.current.value, input3.current.value, input4.current.value);
        console.log(customer);
        //CustomerService.addCustomer(customer);
    }
    return(
        <div>
            <form>
                <input ref={input1} placeholder={"Name"}/>
                <input ref={input2} type={"password"}  placeholder={"Password"}/>
                <input ref={input3} placeholder={"E-mail Address"}/>
                <input ref={input4} placeholder={"License Number"}/>
                <button onClick={signup}>SignUp</button>

            </form>
        </div>
    );
}