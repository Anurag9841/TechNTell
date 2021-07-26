import React,{createContext,useState} from "react";
import console1 from "../img/console1.PNG";
import console2  from "../img/Console2.PNG";
import console3 from "../img/Console3.PNG";
import controller1 from "../img/controller1.jpg";
import controller2 from "../img/controller2.jpg";
import controller3 from "../img/controller3.jpg";
import conroller4 from "../img/conroller4.jpg";
import GTA from "../img/GTA.jpg";
import cricket from "../img/cricket.jpg";
import fifa from "../img/fifa.jpg";
import cod from "../img/cod.jpg";
export const ProductContext2=createContext();
const ProductContext2Provider=(props)=>{
    const [products]=useState([
        {id:1,name:' CONSOLE1' ,price:10000 ,image:console1,status:'Hot'},
        {id:2,name:'CONSOLE2 ' ,price:19999,image:console2,status:'New'},
        {id:3,name:'CONSOLE3' ,price:14999,image:console3,status:'New'},
        {id:4,name:'CONTROLLER1' ,price:25000 ,image:controller1,status:'Hot'},
        {id:5,name:'CONTROLLER2' ,price:30000 ,image:controller2,status:'Hot'},
        {id:6,name:'CONTROLLER3' ,price:50000 ,image:controller3,status:'New'},
        {id:7,name:'CONTROLLER4' ,price:99999 ,image:conroller4,status:'Hot'},
        {id:8,name:'GTA 5' ,price:5000 ,image:GTA,status:'Hot'},
        {id:9,name:'CRICKET 2019' ,price:1999 ,image:cricket,status:'Hot'},
        {id:10,name:'FIFA21' ,price:3000 ,image:fifa,status:'Hot'},
        {id:11,name:'COD' ,price:40000,image:cod,status:'Hot'},
       
       
    ])

      return(
       <ProductContext2.Provider value={{products:[...products]}}>
         {props.children}
       </ProductContext2.Provider>
      )
}
export default ProductContext2Provider;