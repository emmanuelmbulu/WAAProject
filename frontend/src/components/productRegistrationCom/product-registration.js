import {useState} from "react";
import ProductData from "../../data/product-data";
import {ProductService} from "../../service/product-service";

export default function ProductRegistrationComponent(){
    const [productObject, setProductObject] = useState({
        name: "",
        description: "",
        price: "",
        endingTime: "",
        paymentDueDate: "",
        sellerId: ""
    });

    const [isSubmitted, setSubmitted] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false, errorMessage:""
    });

    const registerProduct = (event) => {
        (async () => {
            try{
                event.preventDefault(true);
                const product = new ProductData(
                    productObject.name,
                    productObject.description,
                    productObject.price,
                    productObject.endingTime,
                    productObject.paymentDueDate,
                    true,
                    productObject.sellerId
                )
                console.log(product)
                const response = await ProductService.addProduct(product);

            }catch(err){
                setErrorOccurred({gotError: true, errorMessage: err.message});
            }
        })()

    }

    const setValues = (event) => {
        const input = event.target;
        setProductObject({...productObject, [input.name]: input.value})
    }


    return(
        <div>
            {errorOccurred.gotError && <p>errorOccurred.errorMessage</p>}
            <form>
                <input name='name' onChange={setValues}  value={productObject.name} placeholder={'Product Name'}/>
                <textarea name = 'description' onChange={setValues} placeholder={'Description'}>
                    {productObject.description}
                </textarea>
                <input name = 'price' onChange={setValues} value={productObject.price} placeholder={'Price'}/>
                <input type='datetime-local' name = 'endingTime' onChange={setValues} value={productObject.endingTime} placeholder={'Ending Date'}/>
                <input type='datetime-local' name = 'paymentDueDate' onChange={setValues} value={productObject.paymentDueDate} placeholder={'Payment Due Date'}/>
                <input name = 'sellerId' onChange={setValues} value={productObject.sellerId} placeholder={'Seller ID'}/>
                <input type='file' />
                <button onClick={registerProduct}>Register Product</button>

            </form>
        </div>
    )
}