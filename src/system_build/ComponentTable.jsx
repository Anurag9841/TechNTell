import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import System from './System';
import { useHistory } from 'react-router-dom';


const ComponentTable = (props) => {
console.log("props is: ", props.compProducts.compProducts);

    const colsToRemove = ["comments",
        "createdAt",
        "discount",
        "featured",
        "updatedAt",
        "__v",
        "_id",
    "noofitem"];

    let history = useHistory();
    const index = history.location.state.index;
    const [prodList, setProd] = useState(() => {
        return history.location.state.data;
    });
    // To change the cols we got to cols we show
    const filterOutCol = (eachCol) => {
        return (!colsToRemove.includes(eachCol));
    }

    // After clicking the 'add' button execute: 
    const getProductClicked = (prodClicked, index) => {
        
        history.push('/systembuilt', {prodClicked, indexClicked: index});
    }

    if (prodList.length != 0) {
        let colsRaw = Object.keys(prodList[0]);
        let cols = colsRaw.filter(filterOutCol);


        let count = 0;
        return (
            <div className="container">
                <h2><i style={{color:"GrayText"}}>{index}</i></h2>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            {
                                cols.map((col) => {
                                    count++;
                                    return (<th key={count}>{col}</th>)
                                })
                                
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* get all the values printed in the table */}
                        {prodList.map((prod) => { // iterate through each product
                            return (<tr>
                                {
                                    cols.map((col) => { // iterate through each head 
                                        return (
                                            <td>{prod[col]}</td>) // print the val of json
                                    })
                                }
                                <td>
                                    <Button size="sm" onClick={() => getProductClicked(prod, index)}>Add</Button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
    else {
        history.push('/systembuilt');
        return (<></>);
    }
}

export default ComponentTable;


