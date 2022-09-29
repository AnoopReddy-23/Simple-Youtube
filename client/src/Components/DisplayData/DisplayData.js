import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function DisplayData() {

  const navigate=useNavigate()

  let [data,setData]=useState([])

  useEffect(async ()=>{
    let response=await axios.get('/user-api/getdata')
    //console.log(response.data)
    setData(response.data.payload)
  },[])

  return (
    <div className='m-3'>
      <div className='row'>
        <h1 className=''>
          <span>Click on the Thumbnail or Title to play the video</span>
        </h1>
        {
          data.map((item)=>
            <div className='mx-auto col-10 col-md-5 col-lg-4'>
              <Card key={item._id} item={item} />
            </div>
        )}
      </div>

      <div className="m-4 p-4">Want to upload a Video ?  
        {/* Navigate to data */}
        <Button variant="success" onClick={()=>navigate('/add')}>Click Here</Button>
      </div>
    </div>
  )
}

export default DisplayData