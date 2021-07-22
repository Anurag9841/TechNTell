import React, { useState } from 'react';
import { useEffect } from 'react';

const TableRow = (props) => {

    let counta = 0;
    let index_config = {
        index: props.index,
        count: 0
    };



    let price_obj = {
        base: 0,
        discount: 0,
        tax: 0
    };

    let [priceState, setPriceState] = useState(() => price_obj);
    


    return (
        <>
            {
                props.prodClicked.map((prodClicked) => {
                    counta++;
                    useEffect(() => {
                        setPriceState((preVal) => {
                            return {
                                ...preVal,
                                base: preVal.base + prodClicked.price,
                                discount: preVal.discount + prodClicked.discount,
                                tax: preVal.tax + prodClicked.tax
                            }
                        })
                    }, [prodClicked]);


                    props.getPriceInfo(priceState);
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
                            <td>{prodClicked.tax}</td>
                            <td>{prodClicked.price +
                                prodClicked.tax -
                                prodClicked.discount}</td>
                        </tr>
                    )
                })
            }

        </>
    );

}

export default TableRow;