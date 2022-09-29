import React, {useState} from 'react'
import {Card,Button} from 'react-bootstrap'
import './Card.css'
import Models from '../Model/Models'

function Cards({item}) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
        <Card style={{ width: "20rem" }} className='mx-auto mt-3 card text-center'>
            <Card.Body className='card-body'>
                <Card.Img variant="top" src={item.image} onClick={()=>setModalShow(true)} className='card-img'/>
                <Card.Title className='mt-3 card-title h1'>{item.title}</Card.Title>
                <Card.Text className='mt-2'>{item.description}</Card.Text>
            </Card.Body>
        </Card>

        <Models
          item={item}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
    </div>
  )
}

export default Cards