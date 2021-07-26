import react,{useState} from "react";
const UpdateProduct = (props) =>{
    const Products=["Select Product"]
    {props.products.product.map((product)=>{Products.push(product)})}
    
    const [data2] = useState({
        productId: 0
    });

    const [data, setData] = useState({
        productname:null,
        description: null,
        price: null, 
        noofitem: null, 
        featured: null,
    });
    const InputEvent2 = (event) => {
        
        const { value } = event.target;
        var product= 0
        for(var i=0;i<Products.length;i++){
            if(value===Products[i].name){product=Products[i]._id}
        }
        data2.productId=product
    };
    const InputEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            };
        });

    };

    const formSubmit = (e) => {
        props.updateProduct(data2.productId,data.productname, data.description,data.price,data.noofitem,data.image,data.featured)
        e.preventDefault();
        alert(`Product Name is ${data2.productname}.product name is ${data.productname}.description is ${data.description}. price: ${data.price}`);
    };
    const makeItem=(X)=>{
        return <option key={X._id}>{X.name}</option>
    }
    return(
        <>
            <div className="my-5">
                <h1 className="text-center">Updating the Product</h1>
            </div>
            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                    <select onChange={InputEvent2}>
                        <option>select product</option>
                                {Products.map(makeItem)}
                            </select>
                        <form onSubmit={formSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">description</label>
                                <input
                                    type="string"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="description"
                                    value={data.description}
                                    onChange={InputEvent}
                                    placeholder="description" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="price"
                                    value={data.price}
                                    onChange={InputEvent}
                                    placeholder=" " />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">noof item</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="noofitem"
                                    value={data.noofitem}
                                    onChange={InputEvent}
                                    placeholder=" " />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">featured</label>
                                <input
                                    type="bool"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="featured"
                                    value={data.featured}
                                    onChange={InputEvent}
                                    placeholder="featured" />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label px-2">Images</label>
                            <input 
                            type="string" 
                            id="exampleFormControlInput1" 
                            value={data.image}
                            onChange={InputEvent}
                            placeholder="image"
                             />
                        {/* <label for="file">
                        choose a photo
                        </label> */}
                            </div>

                            <div className="col-12 py-2">
                                <button className="btn btn-outline-primary" type="submit">Update product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UpdateProduct;