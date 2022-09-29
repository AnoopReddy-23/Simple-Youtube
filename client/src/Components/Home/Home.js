import React from 'react'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate=useNavigate()

  return (
    <div>
        <div className="row mt-5 text-center">
            <div className="col-12 col-md-6">
                Want to UPLOAD a VIDEO ?<br/>
                 {/* Navigate to data */}
                <Button variant="success" onClick={()=>navigate('/add')}>Click Here</Button>
            </div>
            <div className="col-12 col-md-6">
                To watch VIDEO's<br/>
                 {/* Navigate to data */}
                <Button variant="success" onClick={()=>navigate('/displaydata')}>Click Here</Button>
            </div>
        </div>
    </div>
  )
}

export default Home