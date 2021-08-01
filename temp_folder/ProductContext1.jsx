import React,{createContext,useState} from "react";
import LEDTV1 from "./img/LEDTV1.png";
import LEDTV2  from "./img/LEDTV2.png";
import  LEDTV3 from "./img/LEDTV3.png";
import OLEDTV1 from "./img/OLEDTV1.png";
import OLEDTV2 from "./img/OLEDTV2.png";
import OLEDTV3 from "./img/OLEDTV3.png";
import SmartTV1 from "./img/SmartTV1.png";
import SmartTV2 from "./img/SmartTV2.png";
import SmartTV3 from "./img/SmartTV3.png";
import vivo from "./img/Vivo Smart Watch.png";
import samsung from "./img/Samsung Smart Watch.png";
import mi from "./img/MI Smart Watch.png";
export const ProductContext1=createContext();
const ProductContext1Provider=(props)=>{
    const [products]=useState([
        {id:1,name:' LEDTV1' ,price:1000 ,image:LEDTV1,status:'Hot'},
        {id:2,name:'LEDTV2 ' ,price:100000,image:LEDTV2,status:'New'},
        {id:3,name:'LEDTV3' ,price:199999,image:LEDTV3,status:'New'},
        {id:4,name:'OLEDTV1' ,price:100000 ,image:OLEDTV1,status:'Hot'},
        {id:5,name:' OLEDTV2' ,price:99999 ,image:OLEDTV2,status:'Hot'},
        {id:6,name:' OLEDTV3' ,price:50000 ,image: OLEDTV3,status:'New'},
        {id:7,name:'SmartTV1' ,price:59999 ,image:SmartTV1,status:'Hot'},
        {id:8,name:'SmartTV2' ,price:59999 ,image:SmartTV2,status:'Hot'},
        {id:9,name:'SmartTV3' ,price:59999 ,image:SmartTV3,status:'Hot'},
        {id:10,name:'VivoWAtch' ,price:59999 ,image:vivo,status:'Hot'},
        {id:11,name:'SamsungWAtch' ,price:59999 ,image:samsung,status:'Hot'},
        {id:12,name:'MIWAtch' ,price:59999 ,image:mi,status:'Hot'},
    ])

      return(
       <ProductContext1.Provider value={{products:[...products]}}>
         {props.children}
       </ProductContext1.Provider>
      )
}
export default ProductContext1Provider;