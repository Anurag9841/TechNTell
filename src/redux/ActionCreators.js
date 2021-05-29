import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { response } from "express";

/////////////////LOGIN ACTIONS////////////////////////////////////////
export const usersRequest = () => (
  {
    type: ActionTypes.USERS_REQUEST
  }
);

export const usersRequest = (users) => (
  {
    type: ActionTypes.USERS_REQUEST,
    payload: users
  }
);

export const getUser = () => (dispatch) =>{
  dispatch(dispatch(usersRequest()));
  
}


export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(logoutSuccess());
}

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


/////////////////////Logout Actions////////////////////////////////
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
////////////////////PRODUCT ACTIONS//////////////////////////////////////////////
export const viewProduct=()=>(dispatch)=>{
  
  return fetch(baseUrl+"products")
  .then(response=>{
    if(response.ok){
      return response;
    }
    else{
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },error =>{
    var errmsg = new Error(error.message);
    throw errmsg
  })
  .then(response=> response.json())
  .then(product=>addPRODUCT(product))
  .catch(error => dispatch(ProductFailed(error.message)));
}

export const addPRODUCT = (product)=>({
  type:ActionTypes.ADD_PRODUCT,
  payload:product
})
export const ProductFailed = (errmsg)=>({
  type:ActionTypes.PRODUCT_FAILED,
  payload: errmsg,
})
export const postProduct = (productName,description,unitPrice,unitsInStock,unitInOnOrder,Discount,image,featured)=>(dispatch)=>{
  
  const newProduct = {
    product_Name=productName,
    description=description,
    unitPrice=unitPrice,
    unitsInStock=unitsInStock,
    unitInOnOrder=unitInOnOrder,
    discount=Discount,
    image=image,
    featured=featured
  }
  
  console.log('Product',newProduct);
  
  const bearer = 'Bearer' + localStorage.getItem('token');
  
  return fetch(baseUrl+ 'comments',{
    method: 'POST',
    body:JSON.stringify(newProduct),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(respone=>{
    if (respone.ok){
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
  .catch(error => { console.log('Post product ', error.message);
        alert('Your product could not be posted\nError: '+ error.message); })
}