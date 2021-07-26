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
                        <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Category Name</label>
                                <input
                                    type="string"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="categoryname"
                                    value={data.categoryname}
                                    onChange={InputEvent}
                                    placeholder="enter category name" />
                            </div>
                            
                            <div className="col-12 py-2">
                                <button className="btn btn-outline-primary" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PostCategory;