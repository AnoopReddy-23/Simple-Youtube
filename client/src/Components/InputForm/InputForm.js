import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button,Card} from 'react-bootstrap'
import {GoSignIn} from 'react-icons/go'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function InputForm() {

  const {register,handleSubmit,formState:{errors}}=useForm();
  
  const navigate=useNavigate()

  //state for image
  let [thumbnail,setThumbnail]=useState(null)
   //state for video
   let [video,setVideo]=useState(null)

  //on image select
  const onImageSelect=(event)=>{
    setThumbnail(event.target.files[0]);
  }
  //on video select
  const onVideoSelect=(event)=>{
    setVideo(event.target.files[0]);
  }

  //submit form
  const onFormSubmit=(userObj)=>{
    //console.log(userObj)
    //create Formdata object
    let formData=new FormData()
    //append values to it
    formData.append("userObj", JSON.stringify(userObj))
    formData.append("thumbnail", thumbnail)
    //formData.append("video", video)
    //HTTP POST request
    axios.post('http://localhost:4000/user-api/create-user', formData)
    .then(response=>{
      //console.log(response.data.payload)
      alert(response.data.message)
      //if user created
      if(response.data.message==="New user craeted successfully!"){
              navigate('/displaydata')
      }
    })
    .catch(error=>{
      console.log(error)
      alert("Something went wrong!! Please try again after sometime..")
    })
  }

  return (
    <>
      <div className="mt-5 col-10 col-sm-8 col-md-7 mx-auto border border-2">
        {/* form */}
        <Form onSubmit={handleSubmit(onFormSubmit)} className='p-5'>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" {...register('title',{required:true})} />
             {/* validation error message for Titlt */}
             {errors.title && <p className='text-danger'>*Title is required</p>}
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
              <Form.Label >Description</Form.Label>
              <Form.Control as="textarea" placeholder='Enter description'  {...register("description",{required:true})} />
              {/* validation error message for username */}
              {errors.description && <p className='text-danger ms-4'>*Description is required</p>}
          </Form.Group>

          {/* Thumbnail image */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Thumbnail Image</Form.Label>
            <Form.Control 
              type="file" 
              {...register("thumbnail",{required:true})} 
              onChange={(event)=>onImageSelect(event)}
            />
            {/* validation error message for Thumbnail */}
            {errors.thumbnail && <p className='text-danger'>*Thumbnail is required</p>}
          </Form.Group>

          {/* Video */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Video</Form.Label>
            <Form.Control 
              type="file" 
              {...register("video",{required:true})} 
              onChange={(event)=>onVideoSelect(event)}
            />
            {/* validation error message for Thumbnail */}
            {errors.video && <p className='text-danger'>*Video is required</p>}
          </Form.Group>

          {/* Button */}
          <Button variant="primary" type="submit">
            Submit <GoSignIn />
          </Button>
        </Form>

        </div>
    </>
  )
}

export default InputForm