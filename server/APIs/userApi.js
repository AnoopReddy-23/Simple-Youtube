//create router to handle user API reqs
const exp=require('express')
const userApp=exp.Router()

//import express-async-handler to handler async errors
const expressAsyncHandler=require('express-async-handler')

//import dotenv which gives "process.env"
require('dotenv').config()

//to extract body of request object
userApp.use(exp.json());  //inbuit middleware ----> this middleware executes for each and every request

//import cloudinary, multer, multer-storage-cloudinary
var cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

//configure cloudinary storage
const cloudinaryStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async (req,file)=>{
        return{
            folder:"AskMentor",
            public_id:file.fieldname + "-" + Date.now(),
        }
    }
})

//configure multer
var upload=multer({storage:cloudinaryStorage})


//create route to handle '/create-user' path
userApp.post('/create-user',upload.single("thumbnail"),expressAsyncHandler(async (request,response)=>{
    //get link from cloudinary
    //console.log(request.file.path)
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    //get userObj as string from client and convert into object
    let newUserObj = JSON.parse(request.body.userObj);
    if(request.file.mimetype=='image/jpeg' || request.file.mimetype=='image/png'){
        //add profile image link to newUserObj
        newUserObj.image=request.file.path
        //remove photo property
        delete newUserObj.thumbnail
        delete newUserObj.video
        //insert new user obj
        await userCollectionObject.insertOne(newUserObj)
        //send response
        response.send({message:"New user craeted successfully!",payload:newUserObj})
    }
    else{
        cloudinary.uploader.destroy(request.file.filename)
        response.send({message:"Wrong format"})
    }
}))




module.exports=userApp;