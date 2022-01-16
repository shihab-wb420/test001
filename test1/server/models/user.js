const mongoose = require('mongoose');

// user schema
const userScheama = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      default:""
    },
    password: {
      type: String,
      trim:true
    }, 
    userImage:{
       type:String,
       default:""
    }, 
    date:{
      type: Date,
      default: Date.now
    }
  }, {timestamps:true}
  
);


module.exports = mongoose.model('User', userScheama);
