import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const ComponentTable = (props) => {
    
    const config_head = (val) => {

        let temp = val.replace(/_/g, " ");


        val = temp[0].toUpperCase();
        let final_res = val.concat(temp.substr(1));

        return final_res;
    };

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

    


    let [prodList, setProd] = useState(() => {
        return history.location.state.data;
    });

    // setProd(compProducts.compProducts.products);



    // To change the cols we got to cols we show
    const filterOutCol = (eachCol) => {
        return (!colsToRemove.includes(eachCol));
    }

    // After clicking the 'add' button execute: 
    const getProductClicked = (prodClicked, index) => {

        history.push('/systembuilt', { prodClicked, indexClicked: index });
    }
    let index_count = 0;

    const sort_from = (e, str_val) => {
        index_count++;
        e.preventDefault();

        let newProd = prodList.sort(
            (a, b) => {
                return a[str_val] - b[str_val]
            }
        );

        setProd([...newProd]);
    }
    
    if (prodList.length != 0) {
        let colsRaw = Object.keys(prodList[0]);
        let cols = colsRaw.filter(filterOutCol);


        let count = 0;
        let counta = 0;
        return (
            <div className="container">
                <h2><i style={{ color: "GrayText" }}>{index}</i></h2>
                <Table responsive="sm" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            {
                                cols.map((col) => {
                                    count++;
                                    return (
                                        <th key={count}>
                                            <a href={""} onClick={(e) => sort_from(e, col)}>{config_head(col)} </a>
                                        </th>
                                    )
                                })

                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* get all the values printed in the table */}
                        {
                            prodList.map((prod) => { // iterate through each product
                                cols = colsRaw.filter(filterOutCol);
                                counta++;
                                counta = counta % 5;

                                return (
                                    <tr>
                                        <td>
                                            {/* in case images are necessary */}
                                            {/* <img src={baseUrl + '/images/components/' + index+'/CPU'+counta+'.jpg'} style={{width:40}} alt="pic" /> */}
                                            {prod[cols.shift()]}
                                        </td>
                                        {
                                            cols.map((col) => { // iterate through each head 

                                                return (
                                                    <td>
                                                        {prod[col]}
                                                    </td>) // print the val of json
                                            })
                                        }
                                        <td>
                                            <Button size="sm" onClick={() => getProductClicked(prod, index, counta)}>Add</Button>
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


