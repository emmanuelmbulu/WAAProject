import { CustomerService } from "../../services/customer-service";
import CustomerData from "../../data/customer-data";
import { useState } from "react";

export default function CustomerRegistrationComponent() {
  const [customerObject, setCustomerObject] = useState({
    firstName: "",
    lastName: "",
    passWord: "",
    email: "",
    licenseNumber: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState({
    gotError: false,
    errorMessage: "",
  });

  const signup = (event) => {
    (async () => {
      try {
        event.preventDefault(true);
        const customer = new CustomerData(
          customerObject.firstName,
          customerObject.lastName,
          customerObject.passWord,
          customerObject.email,
          customerObject.licenseNumber
        );

        //console.log(customer);
        const response = await CustomerService.addCustomer(customer);
      } catch (err) {
        console.log(err);
        setErrorOccurred({ gotError: true, errorMessage: err.message });
      }
    })();
  };

  const setValue = (event) => {
    const input = event.target;
    setCustomerObject({ ...customerObject, [input.name]: input.value });
  };

  return (
    <div>
      {errorOccurred.gotError && <p>{errorOccurred.errorMessage}</p>}
      <form>
        <input
          name="firstName"
          onChange={setValue}
          value={customerObject.firstName}
          placeholder={"First Name"}
        />
        <input
          name="lastName"
          onChange={setValue}
          value={customerObject.lastName}
          placeholder={"Last Name"}
        />
        <input
          type={"password"}
          name="password"
          onChange={setValue}
          value={customerObject.passWord}
          placeholder={"Password"}
        />
        <input
          name="email"
          onChange={setValue}
          value={customerObject.email}
          placeholder={"E-mail Address"}
        />
        <input
          name="licenseNumber"
          onChange={setValue}
          value={customerObject.licenseNumber}
          placeholder={"License Number"}
        />
        <button onClick={signup}>SignUp</button>
      </form>
    </div>
  );
}
