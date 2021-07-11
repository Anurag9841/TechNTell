import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const usersRequest = () => (
  {
    type: ActionTypes.USERS_REQUEST
  }
);

export const usersSuccess = (users) => (
  {
    type: ActionTypes.USERS_SUCCESS,
    payload: users
  }
);

export const usersFailure = (errMess) => (
  {
    type: ActionTypes.USERS_FAILURE,
    errMess
  }
);

//////////////GetUser Thunk//////////////////////////
export const getUser = () => (dispatch) =>{
  return fetch(baseUrl+"users/currentuser", {
    headers:{
      "Authorization": localStorage.getItem('token'), 
    }, 
  })
  .then((response) => {
    if (response.ok) {
      return response;
    } else {
    
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  }, 
  (error) => {
      
      throw error;
  })
  .then(response => response.json())
  .then((response) => {
        console.log("This is from action creators: " + response);
        dispatch(usersSuccess(response));
  })
  .catch((error)=> dispatch(usersFailure(error.message)))
  
};

///////////////////////LOGOUT Thunk/////////////////////////
export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(logoutSuccess());
}

//////////////////////////LOGIN Thunk/////////////////////////////
export const authUser = (creds) => (dispatch) => {
  console.log('here are the creds \n', creds);
  dispatch(loginRequest(creds));

  return fetch(baseUrl+"users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
  .then((response) => {
    console.log('here is the response \n', response);
    if (response.ok) {
      return response;
    } else {
    
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  }, 
  (error) => {
      
      throw error;
  })
  .then(response => response.json())
  .then((response) => {
    console.log('respone after json\n', response);
      //check the login response
      if (response.token){
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        console.log('response is working')
        //dispatch login success
        dispatch(loginSuccess(response));
    }
    else{
      console.log('third error')
        var error = new Error('Error '+ response.status);
        error.response = response;
        throw error;
    }
  })
  .catch((error)=> dispatch(loginFailure(error.message)))
  
};

export const loginRequest = (creds) => (
  {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
);

export const loginSuccess = (respone) => (
    {
        type: ActionTypes.LOGIN_SUCCESS,
        token: respone.token
    }
);

export const loginFailure = (errMess) => (
    {
        type: ActionTypes.LOGIN_FAILURE,
        errMess
    }
);
//////////////////////SIGNUPTHUNK/////////////////////////////////
export const signUp = (fname,lname,username,email,password)=>(dispatch)=>{
  const newUser = {
    fname: fname,
	  lname: lname,
	  username: username,
	  email: email,
    password:password
  }
  
  return fetch(baseUrl+ 'users/signup',{
    method: 'POST',
    body:JSON.stringify(newUser),
    headers:{
      'Content-Type': 'application/json',
      },
    credentials: 'same-origin'
  })
  .then(response =>{
    if (response.ok){
      return response;
    }
    else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
    }
  },error =>{
    var errmsg = new Error(error.message);
    throw errmsg
  })
  .then(response => response.json())
  .then(user=>dispatch(usersSuccess(user)))
  .catch(error => { console.log('User SIGNUP', error.message);
        alert('Sign up \nError: '+ error.message); })

}
export const signUpsucess = (user)=>({
  type : ActionTypes.USER_SIGNUP,
  payload: user
})

//////////////////////Logout Actions/////////////////////////////
export const logoutRequest = () => (
  {
      type: ActionTypes.LOGOUT_REQUEST
      
  }
);

export const logoutSuccess = () => (
  {
      type: ActionTypes.LOGOUT_SUCCESS
    
  }
);

export const logoutFailure = (errMessage) => (
  {
      type: ActionTypes.LOGOUT_FAILURE,
      errMess: errMessage
      
  }
);

///////////////POST PRODUCT THUNK//////////////////////////////////////
export const postProduct = (categId,productName,description,unitPrice,unitsInStock,image,featured)=>(dispatch)=>{
  
  const newProduct = {
    featured:featured,
    noofitem:unitsInStock,
    name:productName,
    description:description,
    image: image,
    price:unitPrice
  }
  console.log('Product',newProduct);
  const bearer =  localStorage.getItem('token');
  return fetch(baseUrl + "categories/" +categId+"/products",{
    method: 'POST',
    body:JSON.stringify(newProduct),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response =>{
    if (response.ok){
      return response;
    }
    else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
  },error =>{
      throw error
  })
  .then(response => response.json())
  .then(product=>dispatch(addProducts(product)))
  .catch(error => { console.log('Post product ', error.message);
        alert('Your product could not be posted\nError: '+ error.message); })
};

/////////////////////////getPRODUCTS THUNK//////////////////////


export const getProduct = (productId) => (dispatch) => {
  return fetch(baseUrl+'products/' + productId)
  .then(response => {
    if(response.ok){
      return response;
    }else {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  }, 
  (error) => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(respone => respone.json())
  .then(products => {
  dispatch(addProduct(products))
  })
  .catch((error) => dispatch(productsFailure(error.message)));
}

export const updateProduct = (productId,productName,description,unitPrice,unitsInStock,image,featured)=>(dispatch)=>{
  
  const updatedProduct = {
    name: productName,
    description: description,
    price: unitPrice,
    noofitem: unitsInStock,
    image: image,
    featured: featured
  }
  
  console.log('Product',updatedProduct);
  const bearer =  localStorage.getItem('token');
  return fetch(baseUrl+ 'products/'+productId,{
    method: 'PUT',
    body:JSON.stringify(updatedProduct),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response =>{
    if (response.ok){
      return response;
    }
    else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
    }
  },error =>{
      throw error
  })
  .then(response => response.json())
  .then(product=>addProducts(product))
  .catch(error => { console.log('PUT product ', error.message);
        alert('Your product could not be posted\nError: '+ error.message); })
};
export const deleteProduct = (categId,productId)=>(dispatch)=>{
  const bearer =  localStorage.getItem('token');
  
  return fetch(baseUrl+ 'categories/'+categId+'/products/'+productId,{
    method: 'Delete',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response =>{
    if (response.ok){
      return response;
    }
    else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
    }
  },error =>{
      throw error
  })
  .then(response => response.json())
  .catch(error => { console.log('Delete product ', error.message);
        alert('Your product could not be DELETED\nError: '+ error.message); })
};

export const getProducts = () => (dispatch) => {
  dispatch(productsLoading());
  return fetch(baseUrl+'products')
  .then(response => {
    if(response.ok){
      return response;
    }else {
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  }, 
  (error) => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(respone => respone.json())
  .then(products => {
    dispatch(addProducts(products))
  })
  .catch((error) => dispatch(productsFailure(error.message)));
}

export const addProducts=(products)=>({
  type:ActionTypes.ADD_PRODUCTS,
  payload:products
});

export const addProduct=(products)=>({
  type:ActionTypes.ADD_PRODUCT,
  payload:products
});

export const productsLoading = () => (
  {
    type: ActionTypes.PRODUCTS_LOADING
  }
)

export const productsFailure = (errMess) => ({
  type: ActionTypes.PRODUCTS_FAILURE,
  payload:errMess
})

/////////////////////////CATEGORY//////////////////////////////////

export const getCategories = ()=>(dispatch)=>{
  return fetch(baseUrl+"categories")
  .then(response=>{
    if(response.ok){
      return response;
    }
    else{
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  },(error) => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response=>response.json())
  .then(category=>dispatch(addCategory(category)))
  .catch((error)=>dispatch(categoryFailure(error.message)))
}
export const postCategory = (categoryName)=>(dispatch)=>{
  const newCategory = {
    categoryName:categoryName, 
  }
  const bearer = localStorage.getItem('token');
  return fetch(baseUrl + "categories",{
    method:"POST",
    body:JSON.stringify(newCategory),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var err = new Error('Error ' + response.status + ': ' + response.statusText);
      err.response=response;
      throw err;
    }
  },error =>{
    throw error
  })
  .then(response=>response.json())
  .then(category=>dispatch(addCategory(category)))
  .catch(err => { console.log('Post category ', err.message);
  alert('category could not be posted\nError: '+ err.message); })
};


export const getcategory = (categId)=>(dispatch)=>{
  return fetch(baseUrl+"categories/"+categId)
  .then(response=>{
    if(response.ok){
      return response;
    }
    else{
      var err = new Error("Error" + response.status + ":" + response.statusText)
      err.response = response
      throw err
    }
  },err =>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .then(category=>dispatch(addCategorys(category)))
  .catch(err=>dispatch(categoryFailure(err.message)))
}
export const delCategory = (categId)=>(dispatch)=>{
  const bearer = localStorage.getItem('token');

  return fetch(baseUrl+"categories/"+categId,{
    method:'DEL',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },credentials: "same-origin"
  })
  .then(respone=>{
    if(respone.ok)  {return respone;}
    else{
      var err = new Error("Error" + respone.status + ":" + respone.statusText)
      err.respone = respone
      throw err
    }
  },err =>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .catch(err => { console.log('Delete category ', err.message);
  alert('Category could not be deleted\nError: '+ err.message); })
}


export const getproductsFromCategory = (categId)=>(dispatch)=>{
  return fetch(baseUrl+"categories/"+categId+"/products")
  .then(respone=>{
    if(respone.ok){
      return respone;
    }
    else{
      var err = new Error("Error" + respone.status + ":" + respone.statusText)
      err.respone = respone
      throw err
    }
  },err =>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .then(product=>addProducts(product))
  .catch(err=>dispatch(categoryFailure(err.message)))
}
export const deleteproductsFromCategory = (categId)=>(dispatch)=>{
  const bearer = localStorage.getItem('token');

  return fetch(baseUrl+"categories/"+categId+"/products",{
    method:'DEL',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },credentials: "same-origin"
  })
  .then(respone=>{
    if(respone.ok){
      return respone;
    }
    else{
      var err = new Error("Error" + respone.status + ":" + respone.statusText)
      err.respone = respone
      throw err
    }
  },err =>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .catch(err => { console.log('Delete category ', err.message);
  alert('Category could not be deleted\nError: '+ err.message); })
}



export const addCategory=(category)=>({
  type:ActionTypes.ADD_CATEGORY,
  payload:category
})
export const addCategorys=(category)=>({
  type:ActionTypes.ADD_CATEGORYS,
  payload:category
})
export const categoryFailure = (errmsg)=>({
  type:ActionTypes.CATEGORY_FAILURE,
  payload:errmsg
})
/////////////////////////ORDER////////////////////////////////\

export const addOrder = (order)=>({
  type:ActionTypes.ADD_ORDER,
  payload:order
})

export const orderFailure = (errmsg)=>({
  type:ActionTypes.ORDER_FALURE,
  payload:errmsg
})

export const getOrders=()=>(dispatch)=>{
  const bearer = localStorage.getItem("token")
  return fetch(baseUrl+"orders",{
    headers:{
      "content-type":"app;ication/json",
      "Authorization":bearer
    },credentials:"same-origin"
  })
  .then(response=>{
    if(response.ok){
      return response;
    }
    else{
      var err = new Error ("ERROR" + response.status + ":" + response.statusText)
      err.respone = response
      throw err;
    }
  },err=>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .then(order=>dispatch(addOrder(order)))
  .catch(err=>dispatch(orderFailure(err.errmsg)))
}

export const postOrder = (productId,quantity,totalPrice) => (dispatch) =>{
  const newOrder = {
    quantity:quantity,
    totalPrice:totalPrice
  }

  const bearer = localStorage.getItem('token');

  return fetch(baseUrl + "products/"+productId,{
    method:'POST',
    body:JSON.stringify(newOrder),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var err = new Error("ERROR" + response.status + ":" + response.statusText)
      err.respone=response;
      throw err
    }
  },error =>{
    throw error
  })
  .then(respone=>respone.json())
  .then(order=>dispatch(addOrder(order)))
  .catch(err => { console.log('Post Order', err.message);
  alert('Order could not be posted\nError: '+ err.message); })
}

export const deleteOrder = (orderId,orderDetailsId) => (dispatch) =>{
  const bearer = localStorage.getItem('token');

  return fetch(baseUrl + "orders/"+orderId+"/"+orderDetailsId,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var err = new Error("ERROR" + response.status + ":" + response.statusText)
      err.respone=response;
      throw err
    }
  },error =>{
    throw error
  })
  .then(respone=>respone.json())
  .catch(err => { console.log('Delete Order ', err.message);})
}

export const updateOrder = (orderId,orderDetailsId,quantity, to_be_suppliedDate,shippedDate)=> (dispatch)=>{
  const updatedOrder = {
    quantity:quantity,
    to_be_suppliedDate:to_be_suppliedDate,
    shippedDate:shippedDate
  }
  const bearer = localStorage.getItem('token')
  return fetch(baseUrl + "orders/"+orderId+orderDetailsId,{
    method:"PUT",
    body:JSON.stringify(updatedOrder),
    headers:{
      "Content-Type":"application/json",
      "Authorization":bearer
    },
    credentials: "same-origin"
  })
  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var err = new Error("ERROR" + response.status + ":" + response.statusText)
      err.respone=response;
      throw err
    }
  },error =>{
    throw error
  })
  .then(respone=>respone.json())
  .then(order=>dispatch(addOrder(order)))
  .catch(err => { console.log('Put Order', err.message);
  alert('Order could not be updated\nError: '+ err.message); })
}
//////////////////////////ORDERDETAILS///////////////////////////////////////////////////

export const getOrderDetails = (Id)=>(dispatch)=>{
  const bearer = localStorage.getItem('token');
  return fetch(baseUrl+"orderdetails/"+Id,{
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials:'same-origin'
  })
  .then(respone=>{
    if(respone.ok){
      return respone;
    }
    else{
      var err = new Error("Error" + respone.status + ":" + respone.statusText)
      err.respone = respone
      throw err
    }
  },err =>{
    var errmsg = new Error(err.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .then(category=>addOrderDetails(category))
  .catch(errmsg=>dispatch(OrderdetailsFailure(errmsg.message)))
}
// export const getOrderDetails = ()=>(dispatch)=>{
//   return fetch(baseUrl+"orderdetails/:orderDetId")
//   .then(respone=>{
//     if(respone.ok){
//       return respone;
//     }
//     else{
//       var err = new Error("Error" + respone.status + ":" + respone.statusText)
//       err.respone = respone
//       throw err
//     }
//   },err =>{
//     var errmsg = new Error(err.message);
//     throw errmsg;
//   })
//   .then(response=>response.json())
//   .then(orderDet=>addOrderDetails(orderDet))
//   .catch(dispatch(OrderdetailsFailure(errmsg.message)))
// }

export const addOrderDetails = (orderDet)=>({
  type:ActionTypes.ADD_ORDERDETAILS,
  payload:orderDet
})

export const OrderdetailsFailure = (errmsg) =>({
  type:ActionTypes.ORDERDETAILS_FALURE,
  payload:errmsg
})

///////////////////////////COMMENT////////////////////////////////////
export const getComments = ()=>(dispatch)=>{
  return fetch(baseUrl+"comments")
  .then(response=>{
    if(response.ok){
      return response;
    }
    else{
      var error = new Error(
        "Error " + response.status + ": " + response.statusText
      );
      error.response = response;
      throw error;
    }
  },(error) => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response=>response.json())
  .then(comment=>dispatch(addComment(comment)))
  .catch((error)=>dispatch(commentFailure(error.message)))
}
export const postComment = (comment,rating,productId)=>(dispatch)=>{
  const newComment = {
    comment:comment,
    rating:rating
  }
  const bearer = localStorage.getItem('token');
  return fetch(baseUrl + "products/"+ productId +"/comments" ,{
    method:"POST",
    body:JSON.stringify(newComment),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var err = new Error('Error ' + response.status + ': ' + response.statusText);
      err.response=response;
      throw err;
    }
  },error =>{
    throw error
  })
  .then(response=>response.json())
  .then(comment=>dispatch(addComment(comment)))
  .catch(err => { console.log('Post comment ', err.message);
  alert('comment could not be posted\nError: '+ err.message); })
};

// export const delCategory = (categId)=>(dispatch)=>{
//   const bearer = localStorage.getItem('token');

//   return fetch(baseUrl+"categories/"+categId,{
//     method:'DEL',
//     headers:{
//       'Content-Type': 'application/json',
//       'Authorization': bearer
//     },credentials: "same-origin"
//   })
//   .then(respone=>{
//     if(respone.ok)  {return respone;}
//     else{
//       var err = new Error("Error" + respone.status + ":" + respone.statusText)
//       err.respone = respone
//       throw err
//     }
//   },err =>{
//     var errmsg = new Error(err.message);
//     throw errmsg;
//   })
//   .then(response=>response.json())
//   .catch(err => { console.log('Delete category ', err.message);
//   alert('Category could not be deleted\nError: '+ err.message); })
// }

// export const getproductsFromCategory = (categId)=>(dispatch)=>{
//   return fetch(baseUrl+"categories/"+categId+"/products")
//   .then(respone=>{
//     if(respone.ok){
//       return respone;
//     }
//     else{
//       var err = new Error("Error" + respone.status + ":" + respone.statusText)
//       err.respone = respone
//       throw err
//     }
//   },err =>{
//     var errmsg = new Error(err.message);
//     throw errmsg;
//   })
//   .then(response=>response.json())
//   .then(product=>addProducts(product))
//   .catch(err=>dispatch(categoryFailure(err.message)))
// }

// export const deleteproductsFromCategory = (categId)=>(dispatch)=>{
//   const bearer = localStorage.getItem('token');

//   return fetch(baseUrl+"categories/"+categId+"/products",{
//     method:'DEL',
//     headers:{
//       'Content-Type': 'application/json',
//       'Authorization': bearer
//     },credentials: "same-origin"
//   })
//   .then(respone=>{
//     if(respone.ok){
//       return respone;
//     }
//     else{
//       var err = new Error("Error" + respone.status + ":" + respone.statusText)
//       err.respone = respone
//       throw err
//     }
//   },err =>{
//     var errmsg = new Error(err.message);
//     throw errmsg;
//   })
//   .then(response=>response.json())
//   .catch(err => { console.log('Delete category ', err.message);
//   alert('Category could not be deleted\nError: '+ err.message); })
// }

export const addComment=(comment)=>({
  type:ActionTypes.ADD_COMMENT,
  payload:comment
})

export const commentFailure = (errmsg)=>({
  type:ActionTypes.COMMENT_FAILURE,
  payload:errmsg
})