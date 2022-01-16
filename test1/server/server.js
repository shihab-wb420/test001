const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const User = require("./models/user")
const Post = require("./models/post")
const Comment = require("./models/postComment")
const userProfile = require("./models/profile")
const multer = require('multer')
const mongoose = require("mongoose")

app.use(express.json());
app.use(express.static(__dirname+"./images/"))
app.use(cors());

//----multer file storage setup-------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.././client/public/images/',)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

// Connect to database
const connectDB = require("./db")
connectDB();

//-----Register ApI-----
app.post('/register', upload.single("file"), async (req, res,next) => {
  //console.log(userImg);
  let newUser; 
  if(req.file){
   let userImg = req.file.filename;
    newUser = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    userImage:userImg,
    }
  }
   else{
   newUser = {
      name:req.body.name,
    email:req.body.email,
    password:req.body.password
      
    }
   }
   
  let user = new User(newUser);
   let result = await user.save();
   result= result.toObject();
   delete result.password;
   res.send(result);
  // console.log("New User Regestration", result);
})

//-----Login Api -------
app.post("/login", async (req,res)=>{
  
   if(req.body.email && req.body.password){
   let user = await User.findOne(req.body).select("-password");
      //console.log(user);
    if(user){
      res.send(user);
      
    } else{
      res.send({error:"user not found"});
      console.log("user not found");
     }
   }else{
     res.send({error:"user not found"});
     console.log("user not found");
   }

})

//-----Get All Users----
app.get("/all-users", async (req,res)=>{
  let allUser = await User.find({});
  //console.log(await allUser.toObject());
  res.send(await allUser)
})

//-----Find User By user_Id---
app.get("/get_user/:id", async (req,res)=>{
  let _id = req.params.id;
  let allUser = await User.findOne({_id:_id});
   //allUser =  allUser.toObject()
   //delete allUser.password
  res.send( allUser)
})

//----Create Post Api------
app.post("/create_post", async (req,res)=>{
  try{
  let newPost = new Post(req.body);
   let result = await newPost.save();
   res.send(result);
  }catch(err){
    res.status(401).json("couldn’t post")
  }
})

//-----Fetch all Post ------
app.get("/all_post", async (req,res)=>{

//if( !mongoose.Types.ObjectId.isValid(id) ) return false;
try{
  let posts = await Post.find({});
  res.send( posts);
}catch(err){
  res.send("database error")
  console.log("database errror", err)
}
});

//-----Fetch Post by user iD----
app.get("/posts/:userId", async (req,res)=>{
  try{
  let id = req.params.userId;
  //console.log(id);
  let posts = await Post.find({userId:id});
  res.send( posts);
  }catch(err){
    res.status(401).json("server error post not found")
    console.log("server error pkst not add...")
  }
});


//-----Fetch public Single Post by postId 
app.get("/all_post/:postId", async (req,res)=>{
  let id = req.params.postId;
  //console.log(id);
  try{
  let posts = await Post.find({_id:id});
  res.send( posts);
 }catch(err){
   console.log(err)
   res.send(err)
 }
});

//-------User Post Comment Api------
app.post("/publish", async (req,res)=>{
  try{

  let newComment = new Comment(req.body)
   let result = await newComment.save();
   res.send(result);
   console.log("comment added")
  }catch(err){
    res.status(401).json("comment not added")
    console.log("error", err)
  }
})

//-----fetch Post Comment By Post_Id --------
app.get("/get_comments/:postId", async (req,res)=>{
  try{
  let id = req.params.postId;
  let comments = await Comment.find({postId:id});
  res.send(comments);
  }catch(err){
    res.status(401).json("comment not found")
    console.log("comment not found")
  }
});


//-----Upload Profile Details-----
app.post("/upload_profile_details",upload.single("file"), async (req,res,next)=>{
   let userId=req.body.userId;
   let profileImage,result;
   if(req.file){
   profileImage=req.file.filename;
   let newProfile = new userProfile({
     userId,
     profileImage
  });
    result = await newProfile.save();
  } else{ console.log("no image found error") }
          res.send(result)
})

 
 //------update Profile Details
app.post("/update_profile_details",upload.single("file"), async (req,res,next)=>{
   let userId = req.body.userId;
   let  profileImage = req.file.filename;
   console.log(req.file)
  
  // let oldProfile =  new userProfile.find();
   //if(req.file){
        /*oldProfile.profileImage = profileImage || oldProfile.profileImage*/
        var newData = {
          profileImage: profileImage
        }
        /*
   }else{
     console.log("no usrr profile")
   }
   */ 
   let updateData = new userProfile.findByIdAndUpdate({userId},{newData});
 let result = await updateData.save();
   res.send(result);
   console.log( "updated data:- ", updateData);
})

 //------Fetch profile details------
 app.get("/get_profile_details/:userId", async (req,res)=>{
  let userId = req.params.userId;
  let data = await userProfile.findOne({userId:userId}).sort({date:-1});
  res.send( data);
})



 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
