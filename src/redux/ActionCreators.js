import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

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


//Logout Actions
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