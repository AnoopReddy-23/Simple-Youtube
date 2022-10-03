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


userApp.post("/upload-video",expressAsyncHandler( async (req, res) => {
    // Get the file name and extension with multer
    const storage = multer.diskStorage({
      filename: (req, file, cb) => {
        const fileExt = file.originalname.split(".").pop();
        const filename = `${new Date().getTime()}.${fileExt}`;
        cb(null, filename);
      },
    });
  
    // Filter the file to validate if it meets the required video extension
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === "video/mp4") {
        cb(null, true);
      } else {
        cb(
          {
            message: "Unsupported File Format",
          },
          false
        );
      }
    };
  
    // Set the storage, file filter and file size with multer
    const upload = multer({
      storage,
      limits: {
        fieldNameSize: 200,
        fileSize: 30 * 1024 * 1024,
      },
      fileFilter,
    }).single("video");
  
    upload(req, res, (err) => {
      if (err) {
        res.send(err);
      }
  
      // SEND FILE TO CLOUDINARY
      cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });
      const { path } = req.file; // file becomes available in req at this point
  
      const fName = req.file.originalname.split(".")[0];
      cloudinary.uploader.upload(
        path,
        {
          resource_type: "video",
          public_id: `AskMentor/${fName}`,
          chunk_size: 6000000,
          eager: [
            {
              width: 300,
              height: 300,
              crop: "pad",
              audio_codec: "none",
            },
            {
              width: 160,
              height: 100,
              crop: "crop",
              gravity: "south",
              audio_codec: "none",
            },
          ],
        },
  
        // Send cloudinary response or catch error
        async (err, video) => {
          if (err)  res.send(err);
  
          //fs.unlinkSync(path);
            //console.log(video)
            let userCollectionObject=req.app.get("userCollectionObject");
            //get userObj as string from client and convert into object
            let newUserObj = JSON.parse(req.body.obj);
            let userOfDB=await userCollectionObject.findOne({title:newUserObj.title});
            //console.log(userOfDB)
            await userCollectionObject.deleteOne({title:userOfDB.title})
            delete userOfDB._id
            userOfDB.video=video.url
            //console.log(userOfDB)
            await userCollectionObject.insertOne(userOfDB)
          res.send({message:"Successfully Uploaded!!"});
        }
      );
    });
  }));
  
//create route to handle '/getusers' path   //middleware2 --> to execute for a specific request
userApp.get('/getdata',expressAsyncHandler(async (request,response)=>{    
  //get userCollectionObject from app.js
  let userCollectionObject=request.app.get("userCollectionObject");
  //read all users
  let data=await userCollectionObject.find().toArray()  //converts the cursors to array
  //sending response
  response.send({message:'All data',payload:data})
}))

module.exports=userApp;