import React, { useState, useEffect, useContext, useRef } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import TableRow from "./TableRow";
import { CartContext } from "../CartContext"


const TableData = (props) => {

  let price_obj = {
    total_base: [],
    total_discount: [],
    total_tax: []
  };



  let [priceState, setPriceState] = useState(() => price_obj);
  let prodClicked_for_tableRow = (props.prodClicked.length == 0) ?
    (
      (localStorage.getItem("prodChosen") == null) ? {} : JSON.parse(localStorage.getItem("prodChosen"))
    )
    : props.prodClicked;

  function handleClick(val) {
    let specific_products_of_val = null;
    if (props.compCols.includes(val)) {
      props.getCompProducts(val);
      specific_products_of_val = props.compProducts.compProducts.products;
    } else {
      specific_products_of_val = props.categories.filter((categDoc) => categDoc.categoryName == val)[0].products;
      props.getData(specific_products_of_val, val);
    }
    // let specific_products_of_val = props.compProducts.compProducts.filter((val_obj) => {
    //   return val_obj.categoryName == val;
    // })[0].products;
    // props.getCompProducts(val);

    // get component products
    if (props.compProducts.compProducts.length != 0)
      props.getData(specific_products_of_val, val);
    // send value of index here
  }




  // get the total prices 
  var total_base_price = 0;
  var total_discount_price = 0;
  var total_tax_price = 0;




  const chosen_indices = Object.keys(prodClicked_for_tableRow);

  let counta = 0;
  let count = 0;
  return (
    <div className="tables_div">
      <Table responsive="sm">
        <thead>
          <tr>
            {
              props.cols.map((col) => {
                count++;
                return (<td key={count}>{col}</td>)
              })
            }
            <td></td>
          </tr>
        </thead>

        <tbody>

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
                          <TableRow prodClicked={prodClicked_for_tableRow} index={index} setProdReceived={props.setProdReceived} />

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
          </>
        </tbody>
      </Table>



      <Table responsive="sm" className="sticky-top total_tables">
        <tbody>
          <tr>
            <td align='center' colSpan={3} style={{ borderTop: "0" }}>
              <Button onClick={() => props.showModal()}>Start New</Button>
            </td>
          </tr>
          <tr>
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

          <tr>
            <td align='center' colSpan={3}>
              <Button onClick={props.addAllToCart}>Save and Order</Button>
            </td>
          </tr>

        </tbody>
      </Table>
    </div >
  )

}


const System = (props) => {
  const { dispatch } = useContext(CartContext);

  const history = useHistory();
  // Colulmn names are Here
  const cols = ["Component", "Selection", "Base", "Promo", "Tax", "Price"];

  // Component names are here
  var indices = ["CPU", "CPU Cooler", "Motherboard", "Memory", "Storage", "Video Card", "Case", "Power Supply", "Operating System", "Monitor"];
  let compCols = ["CPU", "CPU Cooler", "Motherboard", "Memory", "Storage", "Video Card", "Case", "Power Supply", "Operating System", "Monitor"];


  let editableOrNew = null;
  let collection = null;


  if (typeof history.location.state.colsChosen != "undefined") {

    sessionStorage.setItem("colType", history.location.state.collectionType);
    sessionStorage.setItem("colsChosen", history.location.state.colsChosen);
    sessionStorage.setItem("collection", JSON.stringify(history.location.state.collection));
    sessionStorage.setItem("columnsComboName", history.location.state.columnsComboName);
    sessionStorage.setItem("editableOrNew", history.location.state.editableOrNew);

    editableOrNew = sessionStorage.getItem("editableOrNew");

    collection = (editableOrNew != "new") ? JSON.parse(sessionStorage.getItem("collection")) : null;

  }

  if (typeof history.location.state.collectionType != "undefined") {
    if (history.location.state.collectionType == "PC_collections") {
      sessionStorage.setItem("editableOrNew", history.location.state.editableOrNew);
      
        if(typeof history.location.state.collection != "undefined"){
      sessionStorage.setItem("collection", JSON.stringify(history.location.state.collection));
        }
      
    }
  }


  if (typeof history.location.state.indexClicked == "undefined") { sessionStorage.setItem("colType", history.location.state.collectionType); }


  if (sessionStorage.getItem("colType") == "customCollections") {
    indices = sessionStorage.getItem("colsChosen").split(",");

  }


  if (sessionStorage.getItem("editableOrNew") == "editable") {
    let col_temp = JSON.parse(sessionStorage.getItem("collection"))
    localStorage.setItem("prodChosen", JSON.stringify(col_temp.prodChosen))
  }


  const getData = (data, index) => {
    history.push('/show_component', { data, index })
  }

  // State config
  var [prodReceived, setProdReceived] = useState(() => []);
  let [modalState, setModalState] = useState(() => false);
  function showModal() { setModalState(true) }
  function handleClose() { setModalState(false) }
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

    if (history.location.state != null && typeof history.location.state.indexClicked != "undefined") {
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


  // variable for storing key for td
  let count = 0;

  const startNew = () => {

    history.replace(window.URL, null);
    localStorage.removeItem('prodChosen');
    setProdReceived([]);
  }
  let [modalState_saveOrder, setModalstate_saveOrder] = useState(() => false);
  const showModalState_saveOrder = () => { setModalstate_saveOrder(true) }
  const handleClose_saveOrder = () => { setModalstate_saveOrder(false) }

  const collectionName = useRef();
  const collectionDescription = useRef();

  const addAllToCart = () => {

    const prodChosen = JSON.parse(localStorage.getItem('prodChosen'));
    if (prodChosen != null)
      Object.values(prodChosen).map(prodGroup => prodGroup.map(product => dispatch({ type: 'ADD_TO_CART', id: product._id, product })))
  }


  const handleFormSubmit = () => {
    console.log(collectionName.current.value, collectionDescription.current.value);

    const prodChosenFromLS = JSON.parse(localStorage.getItem("prodChosen"));

    if (sessionStorage.getItem("colType") == "customCollections") {
      props.postCollection(
        (sessionStorage.getItem("editableOrNew") == "new") ? collectionName.current.value : JSON.parse(sessionStorage.getItem("collection")).collectionName,
        (sessionStorage.getItem("editableOrNew") == "new") ? collectionDescription.current.value : JSON.parse(sessionStorage.getItem("collection")).collectionDescription,
        prodChosenFromLS,
        sessionStorage.getItem("colType"),

        sessionStorage.getItem("columnsComboName"),
        sessionStorage.getItem("columnsComboDescription"),
        sessionStorage.getItem("colsChosen").split(",")
      );
    }
    else {
      props.postCollection(
        (sessionStorage.getItem("editableOrNew") == "new") ? collectionName.current.value : collection.collectionName,

        (sessionStorage.getItem("editableOrNew") == "new") ? collectionDescription.current.value : collection.collectionDescription,

        prodChosenFromLS,

        sessionStorage.getItem("colType"),

        null,
        null,
        null
      );
    }

    addAllToCart();

    sessionStorage.removeItem("colType");

    sessionStorage.removeItem("columnsComboName");
    sessionStorage.removeItem("columnsComboDescription");
    sessionStorage.removeItem("colsChosen");
    sessionStorage.removeItem("collection");

    history.push("/systembuilt");
  }
  if(sessionStorage.getItem('colType') == "PC_collections" && sessionStorage.getItem('editableOrNew') == "editable"){
    collection =JSON.parse( sessionStorage.getItem("collection"))
  }
  return (
    <div className="container">
      <TableData indices={indices} cols={cols} getCompProducts={props.getCompProducts} compProducts={props.compProducts} getData={getData} prodClicked={prodReceived} setProdReceived={setProdReceived} showModal={showModal} addAllToCart={showModalState_saveOrder} compCols={compCols} categories={props.categorys.category} />

      <Modal show={modalState} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete all the Chosen products</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" style={{ background: "#e03e22" }} onClick={() => { startNew() }} className="modal-yes-button">
            yes, go on
          </Button>
          <Button variant="primary" onClick={handleClose}>
            cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState_saveOrder} onHide={handleClose_saveOrder} centered>
        <Modal.Header closeButton>
          <Modal.Title>Save the Chosen Products and Combo</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Name for the Collection</Form.Label>
              
              {(sessionStorage.getItem("editableOrNew") == "editable") ? <Form.Control type="text" ref={collectionName} placeholder={JSON.parse(sessionStorage.getItem("collection")).collectionName} disabled /> : <Form.Control type="text" ref={collectionName} />}

            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Description</Form.Label>

              {(sessionStorage.getItem("editableOrNew") == "editable") ? <Form.Control as="textarea" rows={2} ref={collectionDescription} placeholder={JSON.parse(sessionStorage.getItem("collection")).collectionDescription} disabled /> : <Form.Control as="textarea" rows={2} ref={collectionDescription} />}

            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" style={{ background: "#e03e22" }} onClick={handleFormSubmit}>
            yes, save
          </Button>
          <Button variant="primary" onClick={handleClose_saveOrder}>
            cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default System;
