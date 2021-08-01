import React,{createContext,useState} from "react";
import inteli2 from "./img/intel i2.jpg";
import inteli3  from "./img/intel i3.jpg";
import inteli7 from "./img/intel i7.jpg";
import core2quad from "./img/core 2 quad.jpg";
import cvn570M from "./img/cvn570 M.jpg";
import asusmotherboard from "./img/asus motherboard.jpg";
import eg41M from "./img/eg41M.jpg";
import eh61M from "./img/eh61M.jpg";
import igame from "./img/igame graphicCard.jpg";
import msi from "./img/msi graphicCard.jpg";
import nvidia from "./img/nvidia graphicCard.jpg";
import amd from "./img/amd ryzen7.jpg";
import cooler1 from "./img/laptop cooler.jpg";
import cooler2 from "./img/notebook cooler.jpg";
import casing1 from "./img/reddragon casing.jpg";
import casing2 from "./img/thermal take casing.jpg";
export const ProductContext5=createContext();
const ProductContext5Provider=(props)=>{
    const [products]=useState([
        {id:1,name:'intel i2 Processor' ,price:19999 ,image:inteli2,status:'Hot'},
        {id:2,name:'intel i3 Processor ' ,price:25000,image:inteli3,status:'New'},
        {id:3,name:'intel i7 Processor' ,price:35000,image:inteli7,status:'New'},
        {id:4,name:'Core2 Quadprocessor' ,price:14999 ,image:core2quad,status:'Hot'},
        {id:5,name:'cvn 570 Motheboard' ,price:30000 ,image:cvn570M,status:'Hot'},
        {id:6,name:'ASUS 5 Motherboard' ,price:50000 ,image:asusmotherboard,status:'New'},
        {id:7,name:'Eg 41 Motherboard' ,price:99999 ,image:eg41M,status:'Hot'},
        {id:8,name:'Eh 61 Motherboard' ,price:50000 ,image:eh61M,status:'New'},
        {id:9,name:'i game GraphicCard' ,price:6999 ,image:igame,status:'Hot'},
        {id:10,name:'MSI GraphicCard' ,price:12999,image:msi,status:'Hot'},
        {id:11,name:'NVIDIA GraphicCard' ,price:19999,image:nvidia,status:'New'},
        {id:12,name:'amd Ryzene 7 3700x' ,price:44999 ,image:amd,status:'Hot'},
        {id:13,name:'Laptop pro Cooler' ,price:30000 ,image:cooler1,status:'Hot'},
        {id:14,name:'Notebook Cooler' ,price:5000 ,image:cooler2,status:'New'},
        {id:15,name:'RedDragon Casing' ,price:27000 ,image:casing1,status:'Hot'},
        {id:16,name:'Thermal Take Casing' ,price:17000,image:casing2,status:'New'},
    ])

      return(
       <ProductContext5.Provider value={{products:[...products]}}>
         {props.children}
       </ProductContext5.Provider>
      )
}
export default ProductContext5Provider;