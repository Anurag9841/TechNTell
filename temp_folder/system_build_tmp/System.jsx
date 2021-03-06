import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TableRow from "./TableRow";


const TableData = (props) => {

  let price_obj = {
    total_base: new Set(),
    total_discount: new Set(),
    total_tax: new Set()
  };

  let [priceState, setPriceState] = useState(() => price_obj);



  function handleClick(val) {

    // get component products
    props.getCompProducts(val);

    if (props.compProducts.compProducts.length != 0)
      props.getData(props.compProducts.compProducts, val);
    // send value of index here
  }

  const getPriceInfo = (received_obj) => {
    useEffect(() => {
      setPriceState((preVal) => {
        return {
          ...preVal,
          total_base: [...new Set([...preVal.total_base, received_obj.base])],
          total_discount: [...new Set([...preVal.total_discount, received_obj.discount])],
          total_tax: [...new Set([...preVal.total_tax, received_obj.tax])]
        }
      });
    }, [received_obj])
  }

  console.log("priceState Total: ", priceState)
  
  // get the total prices 
  let total_base_price = 0;
  let total_discount_price = 0;
  let total_tax_price = 0;
  
  priceState.total_base.forEach(val => total_base_price+=val)
  priceState.total_discount.forEach(val => total_discount_price+=val)
  priceState.total_tax.forEach(val => total_tax_price+=val)
  
  
  const chosen_indices = Object.keys(props.prodClicked);

  let counta = 0;

  return (
    <>
      {props.indices.map((index) => {

        const checkChosen = chosen_indices.includes(index);
        counta++;
        return (
          // only one index go here which is in the chosen prop
          // the whole of the index goes here
          <>
            {
              (() => {
                if (checkChosen) {
                  return (
                    <TableRow prodClicked={props.prodClicked[index]} index={index} getPriceInfo={getPriceInfo} />
                  );
                }

              })()
            }


            <tr>
              <th>
                {(() => {
                  if (checkChosen)
                    return (<></>)
                  else
                    return (<>{index}</>)
                })()}
              </th>

              <td>
                <Button size="sm" onClick={() => handleClick(index)}>+ Click to add {index}</Button>
              </td>
              <td colSpan={4}></td>

            </tr>
          </>

        )

      })
      }
      <tr>
        <td colSpan={4} rowSpan={3}></td>
        <td align='right'>Base Total:</td>
        <td align='right'>Rs. {total_base_price}</td>
      </tr>
      <tr>

        <td align='right'>Rebates:</td>
        <td align='right'>- Rs. {total_discount_price}</td>
      </tr>
      <tr>

        <td style={{ fontSize: 20 }} align='right'>Total:</td>
        <td style={{ fontSize: 20 }} align='right'><b>Rs. {total_base_price + total_tax_price - total_discount_price}</b></td>
      </tr>
    </>

  )

}


const System = (props) => {
  const history = useHistory();

  // Colulmn names are Here
  const cols = ["Component", "Selection", "Base", "Promo", "Tax", "Price"];

  // Component names are here
  const indices = ["CPU", "CPU Cooler", "Motherboard", "Memory", "Storage", "Video Card", "Case", "Power Supply", "Operating System", "Monitor"];


  const getData = (data, index) => {
    history.push('/show_component', { data, index: index })
  }

  // State config
  var [prodReceived, setProdReceived] = useState(() => []);

  const prodChosen = localStorage.getItem("prodChosen");
  let init_obj = {};

  const state_configure_for_change = (prodChosen_again) => {

    // -- start of making arrays of each componenet in state unique 
    const array_of_indices1 = Object.keys(prodChosen_again);

    array_of_indices1.map((indx) => {

      prodChosen_again[indx] = prodChosen_again[indx].filter(
        (val) => {
          const curr_index = prodChosen_again[indx].indexOf(val);
          if (curr_index > 0) {
            return !(val._id.toString() == prodChosen_again[indx][curr_index - 1]._id.toString())
          }
          else {
            return true;
          }
        }
      )
    })
    // -- end of making array of each component unique

    //-- start of storing in local Storage
    localStorage.setItem(
      "prodChosen",
      JSON.stringify(
        prodChosen_again
      )
    );
    //-- end of storing in local Storage

    // update state
    setProdReceived(JSON.parse(localStorage.getItem("prodChosen")));

  }

  useEffect(() => {

    if (history.location.state != null) {
      if (
        (prodChosen == [] || prodChosen == null)
      ) {
        init_obj[history.location.state.indexClicked.toString()] = [history.location.state.prodClicked];
        localStorage.setItem(
          "prodChosen",
          JSON.stringify(
            init_obj
          )
        );
        setProdReceived(JSON.parse(localStorage.getItem("prodChosen")));
      }
      else {
        // localStorage.setItem("prodChosen", JSON.stringify(history.location.state));
        const prodChosen_again = JSON.parse(prodChosen);
        const array_of_indices = Object.keys(prodChosen_again);

        if (array_of_indices.includes(history.location.state.indexClicked.toString())) {


          prodChosen_again[history.location.state.indexClicked.toString()].push(history.location.state.prodClicked);

          state_configure_for_change(prodChosen_again);

        }
        else {
          prodChosen_again[history.location.state.indexClicked.toString()] = [history.location.state.prodClicked];

          state_configure_for_change(prodChosen_again);
        }

      }
    }
  }, [history.location.state]);
  //


  // variable for storing key for td
  let count = 0;
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            {
              cols.map((col) => {
                count++;
                return (<td key={count}>{col}</td>)
              })
            }
          </tr>
        </thead>

        <tbody>
          <TableData indices={indices} cols={cols} getCompProducts={props.getCompProducts} compProducts={props.compProducts} getData={getData} prodClicked={prodReceived} />

        </tbody>
      </Table>

    </div>
  )
}

export default System;
