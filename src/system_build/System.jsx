import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TableRow from "./TableRow";


const TableData = (props) => {

  let price_obj = {
    total_base: [],
    total_discount: [],
    total_tax: []
  };

  let [priceState, setPriceState] = useState(() => price_obj);


  let prodClicked_for_tableRow = (props.prodClicked.length == 0) ?
   (
     (localStorage.getItem("prodChosen") == null)?{}:JSON.parse(localStorage.getItem("prodChosen")) 
    )
   :props.prodClicked;

  function handleClick(val) {

    props.getCompProducts(val);
    // let specific_products_of_val = props.compProducts.compProducts.filter((val_obj) => {
    //   return val_obj.categoryName == val;
    // })[0].products;
    // props.getCompProducts(val);
let specific_products_of_val = props.compProducts.compProducts.products;
    // get component products
    if (props.compProducts.compProducts.length != 0)
      props.getData(specific_products_of_val, val);
    // send value of index here
  }




  // get the total prices 
  let total_base_price = 0;
  let total_discount_price = 0;
  let total_tax_price = 0;




  const chosen_indices = Object.keys(prodClicked_for_tableRow);

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

                  prodClicked_for_tableRow[index].map((prodClicked) => {

                    price_obj["total_base"].push(prodClicked.price);
                    price_obj["total_discount"].push(prodClicked.discount);
                    price_obj["total_tax"].push(prodClicked.tax);

                  });

                  return (
                    <TableRow prodClicked={prodClicked_for_tableRow} index={index} setProdReceived={props.setProdReceived} remove_obj={props.remove_obj}/>

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
              <td colSpan={5}></td>

            </tr>
          </>

        )

      })
      }

      {(() => {
        price_obj.total_base.forEach(val => total_base_price += val)
        price_obj.total_discount.forEach(val => total_discount_price += val)
        price_obj.total_tax.forEach(val => total_tax_price += val)
      })()}
      <tr>
        <td colSpan={4} rowSpan={3}></td>
        <td align='right'>Base Total:</td>
        <td align='right' colSpan={2}>Rs. {total_base_price}</td>
      </tr>
      <tr>

        <td align='right'>Rebates:</td>
        <td align='right' colSpan={2}>- Rs. {total_discount_price}</td>
      </tr>
      <tr>

        <td style={{ fontSize: 20 }} align='right'>Total:</td>
        <td style={{ fontSize: 20 }} align='right' colSpan={2}><b>Rs. {total_base_price + total_tax_price - total_discount_price}</b></td>
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
    history.push('/show_component', {data, index })
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
  }, [history.location.state, localStorage.getItem("prodChosen")]);
  //
const remove_obj = (param, indx) => {
  console.log("param:", param);
  // if (param._id == history.location.state.prodClicked._id){
    // history.location.state["prodClicked"] = {};
    
    // const temp = prodReceived[indx].filter(
    //  (obj) => {
    //    return obj._id != param._id
    //  }
    // );
    
    // setProdReceived(preVal => {
    //    return {
    //      ...preVal,
    //      indx: [...temp]
    //     }
    // })
    
    
  
  
}
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
            <td></td>
          </tr>
        </thead>

        <tbody>
          <TableData indices={indices} cols={cols} getCompProducts={props.getCompProducts} compProducts={props.compProducts} getData={getData} prodClicked={prodReceived} remove_obj={remove_obj} setProdReceived={setProdReceived}/>

        </tbody>
      </Table>

    </div>
  )
}

export default System;
