import React from 'react';
import { Button } from 'react-bootstrap';

const TableRow = (props) => {

    let counta = 0;
    const index = props.index;
    const handleClick = props.handleClick;
    const colsChanged = props.colsChanged;

    return (
        <tr key={counta}>

            <th>
                {index}
            </th>
            {
                (() => {
                    if (index == props.prodClicked.indexClicked) {
                        return (
                            <>
                                <td>{props.prodClicked.prodClicked.name}</td>
                                <td>{props.prodClicked.prodClicked.price}</td>
                                <td>{props.prodClicked.prodClicked.discount}</td>
                                <td>{props.prodClicked.prodClicked.tax}</td>
                                <td>{props.prodClicked.prodClicked.price +
                                    props.prodClicked.prodClicked.tax -
                                    props.prodClicked.prodClicked.discount}</td>
                            </>
                        )
                    }
                    else{
                        return (
                            <>
                                <td>
                                    <Button size="sm" onClick={() => handleClick(index)}>+ Click to add {index}</Button>
                                </td>
                                {
                                    colsChanged.map((col) => {
                                        counta++;
                                        return (<td key={counta}></td>)
                                    })
                                }
                            </>
                        )
                    }
                })()
            }
        </tr>
    );

}

export default TableRow;