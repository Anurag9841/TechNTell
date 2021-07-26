import React from 'react'

import System from "./System"


const Systembuild = (props) => {
    return(
        <div className="container">

            <System compProducts={props.compProducts}/>
        </div>
    ) 

    
}
export default Systembuild;