import {useRef, useState} from "react";
import ProductData from "../../data/product-data";
import {ProductService} from "../../service/product-service";

export default function ProductRegistrationComponent(){
    const [productObject, setProductObject] = useState({
        name: "",
        description: "",
        price: "",
        endingTime: "",
        paymentDueDate: "",
        deposit: "",
        sellerId: ""
    });

    const [isSubmitted, setSubmitted] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState({
        gotError: false, errorMessage:""
    });

    const imageInput = useRef();

    const saveWithRelease = (event) => {
        event.preventDefault(true);
        registerProduct(true);
    }

    const saveWithoutRelease = (event) => {
        event.preventDefault(true);
        registerProduct(false);
    }

    const registerProduct = (isSavedWithRelease) => {
        (async () => {
            try{
                const product = new ProductData(
                    productObject.name,
                    productObject.description,
                    productObject.price,
                    productObject.endingTime,
                    productObject.paymentDueDate,
                    isSavedWithRelease,
                    productObject.deposit,
                    productObject.sellerId
                )
                console.log(product)
                const response = await ProductService.addProduct(product);
                const formData = new FormData();
                formData.append('file', imageInput.current.files[0]);

                await ProductService.uploadImage(formData, response.data.id);
                alert('Product saved successfully');

            }catch(err){
                setErrorOccurred({gotError: true, errorMessage: err.message});
            }
        })();

    }

    const setValues = (event) => {
        const input = event.target;
        setProductObject({...productObject, [input.name]: input.value})
    }


    return(
        <div>
            {errorOccurred.gotError && <p>errorOccurred.errorMessage</p>}
            <form>
                <input
                    name='name'
                    onChange={setValues}
                    value={productObject.name}
                    placeholder={'Product Name'}/>
                <textarea
                    name = 'description'
                    onChange={setValues}
                    placeholder={'Description'}>
                    {productObject.description}
                </textarea>
                <input
                    name = 'price'
                    onChange={setValues}
                    value={productObject.price}
                    placeholder={'Price'}/>
                <input
                    type='datetime-local'
                    name = 'endingTime'
                    onChange={setValues}
                    value={productObject.endingTime}
                    placeholder={'Ending Date'}/>
                <input
                    type='datetime-local'
                    name = 'paymentDueDate'
                    onChange={setValues}
                    value={productObject.paymentDueDate}
                    placeholder={'Payment Due Date'}/>
                <input
                    name='deposit'
                    onChange={setValues}
                    value={productObject.deposit}
                    placeholder='deposit'/>
                <input
                    name = 'sellerId'
                    onChange={setValues}
                    value={productObject.sellerId}
                    placeholder={'Seller ID'}/>
                <input
                    type='file'
                    id='imageFile'
                    ref={imageInput}
                    />

                <button onClick={saveWithRelease}>Save with release</button>
                <button onClick={saveWithoutRelease}>Save without release</button>

            </form>
        </div>
    )
}