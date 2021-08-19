import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import System from './System';

const CardBuild = (props) => {
    
    let collectionAndColumnsCombo = {
    }
    const history = useHistory();
    const handleClick = (parameter) => {
        
        if (parameter != "customCollections" && parameter != "PC_collections") {
            // prodChosen, colsChosen, columnsComboName
            collectionAndColumnsCombo.collection = parameter;
            collectionAndColumnsCombo.collectionType = parameter.collectionType;
            collectionAndColumnsCombo.editableOrNew = "editable";
            collectionAndColumnsCombo.colsChosen = props.completeColumnInfo.columnsChosen;

            collectionAndColumnsCombo.columnsComboName = props.completeColumnInfo.columnsComboName;

        }
        else if (parameter == "customCollections") {
            
            collectionAndColumnsCombo.collectionType = parameter;
            collectionAndColumnsCombo.editableOrNew = "new";

            collectionAndColumnsCombo.colsChosen = props.completeColumnInfo.columnsChosen;

            collectionAndColumnsCombo.columnsComboName = props.completeColumnInfo.columnsComboName;
        }
        else if (parameter == "PC_collections") {

            collectionAndColumnsCombo.collectionType = parameter;
            collectionAndColumnsCombo.editableOrNew = "new";

            collectionAndColumnsCombo.collection = props.completeColumnInfo[0];

        }



        history.push("/systembuilt/components", collectionAndColumnsCombo);


    }
    const customCollection = "customCollections";
    
    if (typeof props.completeColumnInfo != "undefined") {
        

        if (props.colType=="customCollections") {

            if (props.completeColumnInfo.collectionsForColumnsChosen.length != 0) {
                return (
                    <div className="cards-collection">
                        {props.completeColumnInfo.collectionsForColumnsChosen.map((collection) => {
                            return (

                                <Card style={{ width: '18rem' }} className="desktop-card">

                                    <Card.Img variant="top" src={baseUrl + '/images/bg2.jpg'} />
                                    <Card.Body>
                                        <Card.Title>{collection.collectionName}</Card.Title>
                                        <Card.Text>
                                            <p>{collection.collectionDescription}</p>

                                            <p>Columns Chosen: {collection.columnsChosen}</p>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleClick(collection)}>Edit the products chosen</Button>
                                    </Card.Body>

                                </Card>

                            )
                        })}

                        <Card style={{ width: '18rem' }} className="desktop-card">

                            <Card.Img variant="top" src={baseUrl + '/images/bg2.jpg'} />
                            <Card.Body>
                                <Card.Title>ADD NEW COLLECTION</Card.Title>
                                <Card.Text>
                                    <p>By clicking on the button below you can add your own customized collection</p>

                                </Card.Text>
                                <Button variant="primary" onClick={() => handleClick(customCollection)}>Start Customizing!!</Button>
                            </Card.Body>

                        </Card>
                    </div>

                );
            } else { //no collections Inside
                return (
                    <div>
                        <Card style={{ width: '18rem' }} className="desktop-card">

                            <Card.Img variant="top" src={baseUrl + '/images/bg2.jpg'} />
                            <Card.Body>
                                <Card.Title>ADD NEW COLLECTION</Card.Title>
                                <Card.Text>
                                    <p>By clicking on the button below you can add your own customized collection</p>

                                </Card.Text>
                                <Button variant="primary" onClick={() => handleClick("customCollections")}>Start Customizing!!</Button>
                            </Card.Body>

                        </Card>

                    </div>
                )
            }
        } else if(props.colType == "PC_collections") { //For PC_collections
            return (
                <div className="cards-collection">
                    {props.completeColumnInfo.map((collection) => {
                        return (

                            <Card style={{ width: '18rem' }} className="desktop-card">

                                <Card.Img variant="top" src={baseUrl + '/images/bg2.jpg'} />
                                <Card.Body>
                                    <Card.Title>{collection.collectionName}</Card.Title>
                                    <Card.Text>
                                        <p>{collection.collectionDescription}</p>

                                        <p>Columns Chosen: {collection.columnsChosen}</p>
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleClick(collection)}>Edit the products chosen</Button>
                                </Card.Body>

                            </Card>

                        )
                    })}

                    <Card style={{ width: '18rem' }} className="desktop-card">

                        <Card.Img variant="top" src={baseUrl + '/images/bg2.jpg'} />
                        <Card.Body>
                            <Card.Title>ADD NEW COLLECTION</Card.Title>
                            <Card.Text>
                                <p>By clicking on the button below you can add your own customized collection</p>

                            </Card.Text>
                            <Button variant="primary" onClick={() => handleClick("PC_collections")}>Start Customizing!!</Button>
                        </Card.Body>

                    </Card>
                </div>

            );

        }
    }

    return (
        <div>


        </div>
    )

}

export default CardBuild;