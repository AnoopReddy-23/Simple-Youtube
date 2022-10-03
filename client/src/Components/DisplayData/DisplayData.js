import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cards from '../Card/Cards'

function DisplayData() {

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
              <Cards key={item._id} item={item} />
            </div>
        )}
      </div>
    </div>
  )
}

export default DisplayData