import React, { useState } from 'react';
import { useEffect } from 'react';

const TableRow = (props) => {

    let counta = 0;
    let index_config = {
        index: props.index,
        count: 0
    };
let prodClicked_received = props.prodClicked;
const remove_prod = (e, prod) => {
    
    e.preventDefault();
    props.remove_obj(prod, props.index);
    // console.log(prodClicked_received[props.index])

    prodClicked_received[props.index]= prodClicked_received[props.index].filter((param) => {
        return prod._id != param._id;
    })

    if (prodClicked_received[props.index].length==0)
        delete prodClicked_received[props.index]
         
    localStorage.setItem("prodChosen", JSON.stringify(prodClicked_received));
    props.setProdReceived(JSON.parse(localStorage.getItem("prodChosen")));
}
    

    return (
        <>
            {
                props.prodClicked[props.index].map((prodClicked) => {
                    counta++;
                    
                    return (
                        <tr key={counta}>

                            <th>
                                {(() => {
                                    if (index_config.count == 0) {
                                        index_config.count++;
                                        return (<>{index_config.index}</>)
                                    }
                                    else {
                                        return (<></>);
                                    }
                                })()}
                            </th>
                            <td>{prodClicked.name}</td>
                            <td>{prodClicked.price}</td>
                            <td>{prodClicked.discount}</td>
                            <td style={{width:"5%"}}>{prodClicked.tax}</td>
                            <td style={{width:"5%"}}>{prodClicked.price +
                                prodClicked.tax -
                                prodClicked.discount}</td>
                            
                            <td><a href={""} onClick={(e) => remove_prod(e,prodClicked)}>X</a></td>
                        </tr>
                    )
                })
            }

        </>
    );

}

export default TableRow;