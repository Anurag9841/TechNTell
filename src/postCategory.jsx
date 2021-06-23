import { updateProduct } from "./redux/ActionCreators"
import react,{useState} from "react"

const PostCategory = (props) =>{
    const [data, setData] = useState({
        categoryname:"",
        // productname: " ",
        // description: " ",
        // price: " ", 
        // noofitem: " ", 
        // featured: " ",
    });
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
        props.postCategory(data.categoryname)
        e.preventDefault();
        alert(`Category  ${data.categoryname} is added `);
    };
    return(
        <>
            <div className="my-5">
                <h1 className="text-center">Create A New Category</h1>
            </div>
            <div className="container customise_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                        <form onSubmit={formSubmit}>
                        <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Category Name</label>
                                <input
                                    type="string"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    name="categoryname"
                                    value={data.categoryname}
                                    onChange={InputEvent}
                                    placeholder="Enter category name" />
                            </div>
                            
                            <div class="col-12 py-2">
                               <center> <button class="btn btn-outline-primary" type="submit">Submi</button></center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PostCategory;