import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from "../Main"
import React, { Component } from 'react'
import {configureStore} from './redux/ConfigureStore';
const store = configureStore();

const App =()=> {
    return(
       <> 
       
       <Provider store={store}>
       <BrowserRouter>
                    <div>
                    <Main />
                    </div>
                </BrowserRouter>
        </Provider>
        </>
    )
}
export default App;
