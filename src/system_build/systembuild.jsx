import React from 'react'
import { Route, Switch, withRouter, Link, useRouteMatch } from 'react-router-dom'
import CardBuild from './CardBuild';
import { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


const Systembuild = (props) => {
    let { path, url } = useRouteMatch();
    const categoryNames = sessionStorage.getItem("categories").split(",");

    const customCollections = props.pcAndCustomCollections.user_collections_info.customCollections;
    const PC_collections = props.pcAndCustomCollections.user_collections_info.PC_collections;

    const initState = {
        customCollections: props.pcAndCustomCollections.user_collections_info.customCollections,
        PC_collections: props.pcAndCustomCollections.user_collections_info.PC_collections
    }

    const [collections, setCollections] = useState(() => initState)
    const [completeCollectionAndColumnsInfo, setCompleteCollectionAndColumnsInfo] = useState(() => { })

    const [modalState, setModalState] = useState(() => false);
    const handleModalClose = () => {
        setModalState(false);
    }
    const handleModalOpen = () => {
        setModalState(true);
    }



    let [colType, setColType] = useState(() => "");
    const handleColumnNameClick = (columnsComboName) => {
        const finalCollections = collections.customCollections.filter((dat) => {
            return (dat.columnsComboName == columnsComboName)
        })
        setCompleteCollectionAndColumnsInfo(finalCollections[0]);
        setColType("customCollections");

    }
    const handlePC_collectionsClick = () => {
        setCompleteCollectionAndColumnsInfo(collections.PC_collections);
        setColType("PC_collections");

    }
    let columnsComboName = useRef();
    let columnsComboDescription = useRef();
    let count = 0;
    const checkedCategs = [];
    const handleChangeCheckbox = (e) => {
        (e.target.checked) ? checkedCategs.push(e.target.labels[0].innerText) : null;

    }
    const getCheckedCategs = () => {
        console.log("checkedCategs", checkedCategs);
        props.postCollection(
            null, null, null, "customCollections", columnsComboName.current.value, columnsComboDescription.current.value, checkedCategs
        );
        handleModalClose();
    }

    return (
        <div className="container-systembuild">

            {/* <Link to={`${url}/components`}>fdsa</Link> */}
            <div className="container-of-components">
                <section className="fixed-collections">
                    <p>
                        Fixed columns
                        <ul>
                            <li>
                                <span className="columns-combo-name" onClick={() => handlePC_collectionsClick(collections.PC_collections)}>PC_Collections</span>
                            </li>

                        </ul>
                    </p>
                </section>

                <section className="custom-collections">


                    Custom Columns
                    <ul>
                        {
                            collections.customCollections.map((completeCustomCollection) => {
                                return (
                                    <li>
                                        <span className="columns-combo-name" onClick={() => handleColumnNameClick(completeCustomCollection.columnsComboName)}>{completeCustomCollection.columnsComboName}</span>
                                    </li>
                                )
                            })
                        }
                        <li><span className="columns-combo-name" onClick={handleModalOpen} >Add New Columns Combo</span></li>

                    </ul>
                </section>

            </div>

            <div className="container-of-collections">
                <section className="custom-builds">

                    <CardBuild completeColumnInfo={completeCollectionAndColumnsInfo} colType={colType} />

                </section>
            </div>

            <div>
                <Modal show={modalState} onHide={handleModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Configure New Columns Combo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name for the Columns Combo</Form.Label>

                                <Form.Control type="text" ref={columnsComboName} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Columns Combo Description</Form.Label>
                                <Form.Control as="textarea" rows={2} ref={columnsComboDescription} />
                            </Form.Group>

                            <Form.Label>Choose Categories:</Form.Label>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">

                                    {categoryNames.map((categ) => {
                                        count++;
                                        return (
                                            <Form.Check
                                                type={type}
                                                id={`default-${type}-${count}`}
                                                label={categ}
                                                onChange={handleChangeCheckbox}

                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" style={{ background: "#e03e22" }} onClick={getCheckedCategs}>
                            yes, save
                        </Button>
                        <Button variant="primary" onClick={handleModalClose}>
                            cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )


}
export default Systembuild;