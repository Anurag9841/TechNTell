import React from "react"; 
import { NavLink } from "react-router-dom"; 
import rujan from "../images/customise.jpg";
import luitel from "../images/safe.jpg";
import returns from "../images/return.jpg";
import open from "../images/open.jpg"; 
import hi from "../images/refund.png";

const OurService = () => {
    return (
     <>
<div className="service py-5">
<div className="container-fluid">
<div className="row">
<div className="col-md-10 col-11 mx-auto">
<div className="mt-2 mb-4 text-center">
    <h1 className="service_heading"><b>Our Services</b></h1>
</div> 
<div className="row"> 
{/* left side data  */}
<div className="col-md-6 mt-md-2 m-0">
<span className="badge-info badge rounded-pill px-3 py-1 my-2 font-weight-light">
What's New 
</span> 
<h4><b>Experience the best shopping website</b></h4>
<h6 className="font-weight-light subtitle">We provide you the best product at cheapest price. You can 
customise your PC according to your Budget.
</h6> 
{/* one more grid for services  */} 
<div className="row mt-md-5">
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium"> <b>Return and Refund </b></h6> 
<p>You can Return your product within 2 days of shopping</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium"><b>24/7 Customer Service</b></h6> 
<p>You can buy products at any time from Nepal</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium"><b>Safe Online Shopping</b></h6> 
<p>Experience Safe Online Shopping</p>
</div>
<div className="col-md-6 mt-3">
<h6 className="font-weight-medium"><b>Customise your PC</b></h6> 
<p>Get your desired PC at Cheapest Price</p>
</div>
<div className="col-lg-12 my-4">
{/* <NavLink to="#" className="btn btn-sm btn-info">
Shop Now
</NavLink> */}
</div>
</div>



</div> 
{/* right side data  */}
<div className="col-md-6 mt-md-5 m-0">
<div className="row wrap-service"> 
{/* left side image */}
<div className="col-md-6">
<div className="row">
<div className="col-md-12 img-hover mb-4">
<img src={hi} className="rounded img-shadow img-fluid" alt="comp1"/>
</div> 
<div className="col-md-12 img-hover mb-4">
<img src={rujan} className="rounded img-shadow img-fluid" alt="img"/>
</div>
</div>
</div> 

{/* right side image */} 
{/* uneven-box  == use after col-md-6 for uneven order of pictures   */}
<div className="col-md-6 ">
<div className="row">
<div className="col-md-12 img-hover mb-4">
<img src={luitel} className="rounded img-shadow img-fluid" alt="img"/>
</div> 
<div className="col-md-12 img-hover mb-4">
<img src={open} className="rounded img-shadow img-fluid" alt="img"/>
</div>
</div>
</div>
</div> 

</div>
</div>
</div>
</div>
</div>
</div>



     </>
    );
};

export default OurService;