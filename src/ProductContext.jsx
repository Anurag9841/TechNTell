import React,{createContext,useState} from "react";
import GTA from "./img/GTA.jpg";
import iphone1 from "./img/iphone1.jpeg";
import iphone2 from "./img/iphone2.jpeg";
import Playstation from "./img/Playstation.jpg";
import samsung2 from "./img/samsung2.jpeg";
import samsung4 from "./img/samsung4.jpeg";
import SmartTV3 from "./img/SmartTV3.png";
import Vivo from "./img/Vivo Smart Watch.png";

 export const ProductContext=createContext();
const ProductContextProvider=(props)=>{
    const [products]=useState([
        {id:1,name:'GTA' ,price:1000 ,image:GTA,status:'Hot'},
        {id:2,name:'iphoneX' ,price:100000,image:iphone1,status:'New'},
        {id:3,name:'iphone12' ,price:199999,image:iphone2,status:'New'},
        {id:4,name:'Plastation' ,price:100000 ,image:Playstation,status:'Hot'},
        {id:5,name:'SamsungS10+' ,price:99999 ,image:samsung2,status:'Hot'},
        {id:6,name:'SamsungA50s' ,price:50000 ,image:samsung4,status:'New'},
        {id:7,name:'SmartTV3' ,price:59999 ,image:SmartTV3,status:'Hot'},
        {id:8,name:'Vivo watch' ,price:25000 ,image:Vivo,status:'Hot'},
       
    ])

      return(
       <ProductContext.Provider value={{products:[...products]}}>
         {props.children}
       </ProductContext.Provider>
      )
}
export default ProductContextProvider;