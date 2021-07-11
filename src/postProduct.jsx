
import react, { useState,Fragment }from "react";

import { Media,DropdownButton,Dropdown, FormControl,Button,InputGroup} from 'react-bootstrap';




function RenderOneCategory  ({category}){
    return(
    <react.Fragment>
        <Media as="li">
            <Media.Body>
                <h5>{category.categoryName}</h5>
            </Media.Body>
        </Media>
    </react.Fragment>
    )
}
function RenderCategories (props){
    const oneUser = props.category.category.map((category) => {

        return (
            <RenderOneCategory category={category} key={category._id}/>
        );
        
    });
    return (
        <div>
            <ul className="list-unstyled" >
                {oneUser}
            </ul>
        </div>);
}
const PostProduct = (props) => {
    const categories = ["Select Categories"]; 
    {props.category.category.map((category)=>(categories.push(category.categoryName)))}
    //const catogories1=categories.toString();
    const [data2] = useState({
        categoryname: ""
    });
    const [data,setData] = useState({
        productname: "",
        description: "",
        price: 0, 
        noofitem:0 ,
        image:"", 
        featured:false,
        
    });
    const InputEvent2 = (event) => {
        
        const { value } = event.target;
        
        data2.categoryname=value
        console.log(value)
    };
    const InputEvent = (event) => {
        
        const { name, value } = event.target;
        
       // console.log(value)
        //console.log(name)
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
                
            };
        });
        //console.log(name)
    };

    const formSubmit = (e) => {
        console.log(data2.categoryname)
        props.postProduct(data2.categoryname,data.productname,data.description,data.price,data.noofitem,data.image,data.featured)
        e.preventDefault();
        alert(`category  ${data2.categoryname}.product name is ${data.productname}.description is ${data.description}. price: ${data.price}`);
    };

    const makeItem =(X)=>{
        return <option>{X}</option>
    }
    return (
        <>
            <div className="my-5">
                <h1 className="text-center">Create a new Product</h1>
            </div>

            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                    <select onChange={InputEvent2}>
                                {categories.map(makeItem)}
                            </select>
                        <form onSubmit={formSubmit}>
                            
                            <div className="mb-3">
                                <label for="exampleFormControlInput2" className="form-label">product name</label>
                                <input
                                    type="string"
                                    className="form-control"
                                    required="true"
                                    id="exampleFormControlInput2"
                                    name="productname"
                                    value={data.productname}
                                    onChange={InputEvent}
                                    placeholder="enter product name" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput3" className="form-label">description</label>
                                <input
                                    type="string"
                                    className="form-control"
                                    id="exampleFormControlInput3"
                                    name="description"
                                    required="true"
                                    value={data.description}
                                    onChange={InputEvent}
                                    placeholder="description" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput4" className="form-label">price</label>
                                <input
                                    type="number"
                                    required="true"
                                    className="form-control"
                                    id="exampleFormControlInput4"
                                    name="price"
                                    value={data.price}
                                    onChange={InputEvent}
                                    placeholder=" " />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput5" className="form-label">noof item</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="exampleFormControlInput5"
                                    name="noofitem"
                                    required="true"
                                    value={data.noofitem}
                                    onChange={InputEvent}
                                    placeholder=" " />
                            </div>

                            <div className="mb-3">
                                <label for="exampleFormControlInput6" className="form-label">featured</label>
                                <input
                                    type={Boolean}
                                    className="form-control"
                                    id="exampleFormControlInput6"
                                    name="featured"
                                    value={data.featured}
                                    onChange={InputEvent}
                                    placeholder="featured" />
                            </div>

                            <div className="mb-3">
                                <label for="exampleFormControlInput7" className="form-label">Images</label>
                                <input 
                                    type="string"
                                    className="form-control"
                                    id="exampleFormControlInput7" 
                                    name="image"
                                    value={data.image}
                                    onChange={InputEvent}
                                    placeholder="image" 
                                />

                            </div>

                            <div className="col-12 py-2">
                                <button className="btn btn-outline-primary" type="submit">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

};


export default PostProduct;