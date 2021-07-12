import React, {useState} from "react";
import { Table, Button } from "react-bootstrap";

const TableData = (props) => {
  const sz = props.cols.length;
  const colsChanged = props.cols;
  colsChanged.pop();
  return(
    <>
      {props.indices.map((index) => {
        return (<tr>
          <th>
            {index}
          </th>
          {
            colsChanged.map((col) => {
              return(<td></td>)
            })
          }

        </tr>)

      })}
    </>
  )
}

const System = (props) => {

  // Colulmn names are Here
  const cols = ["Component","Selection","Base","Promo","Shipping","Tax","Price","Where"];

  // Component names are here
  const indices = ["CPU", "CPU Cooler","Motherboard","Memory", "Storage", "Video Card", "Case", "Power Supply", "Operating System", "Monitor" ];


  // variable for storing key for td
  let count = 0;
  return(
    <Table responsive="sm">
      <thead>
      <tr>
        {
          cols.map((col) => {
            count++;
            return(<td key={count}>{col}</td>)
          })
        }
      </tr>
      </thead>
        
      <tbody>
        <TableData indices={indices} cols={cols}/>
      </tbody>
    </Table>
  )
}

export default System;