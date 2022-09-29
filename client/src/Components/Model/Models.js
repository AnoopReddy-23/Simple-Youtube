import React from 'react'
import {Modal,Button,Ratio} from 'react-bootstrap'

function Models(props) {
  return (
    <div>
        <Modal className='text-center'
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.item.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="row">
                    <Ratio aspectRatio="16x9">
                        <video autoPlay loop controls className="col-10 d-block mx-auto" aspectRatio="16x9">
                            <source src={props.item.video} type='video/mp4' />
                        </video> 
                    </Ratio>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Models