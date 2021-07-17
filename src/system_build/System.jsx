import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TableRow from "./TableRow";


const TableData = (props) => {

  // history
  const handleClick = (val) => {

    // get component products
    props.getCompProducts(val);

    if (props.compProducts.compProducts.length != 0)
      props.getData(props.compProducts.compProducts, val);
    // send value of index here
  }
  if (props.prodClicked != null) {
    console.log("prodClicked: ", props.prodClicked.prodClicked);
  }

  const colsChanged = props.cols;
  colsChanged.pop();
  colsChanged.pop();

  let counta = 0;

  return (
    <>
      {props.indices.map((index) => {
        counta++;
        return (
          <>
            {
              (() => {
                if (props.prodClicked != null) {
                  return (
                    <TableRow prodClicked={props.prodClicked} index={index} handleClick={handleClick} colsChanged={colsChanged} />);
                }
                else {
                  return (

                    <tr>
                      <th>
                        {index}
                      </th>

                      <td>
                        <Button size="sm" onClick={() => handleClick(index)}>+ Click to add {index}</Button>
                      </td>
                      {
                        colsChanged.map((col) => {
                          counta++;
                          return (<td key={counta}></td>)
                        })
                      }
                    </tr>
                  )
                }
              })()
            }
          </>
        )

      })
      }
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

          const array_of_indices1 = Object.keys(prodChosen_again);

          array_of_indices1.map((indx) => {

            prodChosen_again[indx] = prodChosen_again[indx].filter(
              (val) => {
                const curr_index = prodChosen_again[indx].indexOf(val);
                if (curr_index > 0) {
                  console.log("id comparison is: ", val._id.toString() == prodChosen_again[indx][curr_index - 1]._id.toString(), val._id.toString(), prodChosen_again[indx][curr_index - 1]._id.toString());
                  return !(val._id.toString() == prodChosen_again[indx][curr_index - 1]._id.toString())
                }
                else {
                  return true;
                }
              }
            )
          })

          localStorage.setItem(
            "prodChosen",
            JSON.stringify(
              prodChosen_again
            )
          );

          setProdReceived(JSON.parse(localStorage.getItem("prodChosen")));

          // unique values are left to be set
        }
        else {
          prodChosen_again[history.location.state.indexClicked.toString()] = [history.location.state.prodClicked];
          const array_of_indices1 = Object.keys(prodChosen_again);

          array_of_indices1.map((indx) => {

            prodChosen_again[indx] = prodChosen_again[indx].filter(
              (val) => {
                const curr_index = prodChosen_again[indx].indexOf(val);
                if (curr_index > 0) {
                  console.log("id comparison is: ", val._id.toString() == prodChosen_again[indx][curr_index - 1]._id.toString(), val._id.toString(), prodChosen_again[indx][curr_index - 1]._id.toString());
                  return !(val._id.toString() == prodChosen_again[indx][curr_index - 1]._id.toString())
                }
                else {
                  return true;
                }
              }
            )
          })

          localStorage.setItem(
            "prodChosen",
            JSON.stringify(
              prodChosen_again
            )
          );
          setProdReceived(JSON.parse(localStorage.getItem("prodChosen")));


        }

      }
    }
  }, [history.location.state]);
  console.log("prodReceived [state] is: ", prodReceived);
  //


  // variable for storing key for td
  let count = 0;
  return (
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
        <TableData indices={indices} cols={cols} getCompProducts={props.getCompProducts} compProducts={props.compProducts} getData={getData} prodClicked={history.location.state} />
      </tbody>
    </Table>
  )
}

export default System;
