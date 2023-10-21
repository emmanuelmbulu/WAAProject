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
        isSavedWithRelease: "",
        sellerId: ""
    });

    const [isSubmitted, setSubmitted] = useState(false);
    const [errorOccured, setErrorOccured] = useState({
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
                    productObject.isSavedWithRelease,
                    productObject.sellerId
                )
                console.log(product)
                const response = await ProductService.addProduct(product);

            }catch(err){
                setErrorOccured({gotError: true, errorMessage: err.message});
            }
        })()

    }

    const setValues = (event) => {
        const input = event.target;
        setProductObject({...productObject, [input.name]: input.value})
    }


    return(
        <div>
            {errorOccured.gotError && <p>errorOccured.errorMessage</p>}
            <form>
                <input name='name' onChange={setValues}  value={productObject.name} placeholder={'Product Name'}/>
                <input name = 'description' onChange={setValues} value={productObject.description} placeholder={'Description'}/>
                <input name = 'price' onChange={setValues} value={productObject.price} placeholder={'Price'}/>
                <input name = 'endingTime' onChange={setValues} value={productObject.endingTime} placeholder={'Ending Date'}/>
                <input name = 'paymentDueDate' onChange={setValues} value={productObject.paymentDueDate} placeholder={'Payment Due Date'}/>
                <input name = 'isSavedWithRelease' onChange={setValues} value={productObject.isSavedWithRelease}  placeholder={'Saved with Release'}/>
                <input name = 'sellerId' onChange={setValues} value={productObject.sellerId} placeholder={'Seller ID'}/>
                <button onClick={registerProduct}>Register Product</button>
            </form>
        </div>
    )
}