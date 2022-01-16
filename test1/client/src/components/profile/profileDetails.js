
//import { useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from "react"
const url ="http://localhost:4000"

const ProfileDetails = (props) => {
 //const [loading,  setLoading] = useState(false);
  const [imgNull,setImgNull] = useState(true)
 const [userDetails, setUserDetails] = useState([]);
//-------Local User------
  const [user, setUser] = useState({
    localUser:""
  });
 
 //---Get user details from database------
 const getUserDetails = async ()=>{  
   //---userId from localStorage  
     const id = user._id;
     
 let data = await fetch(`${url}/get_user/`+id,{
      method:"get",
      headers:{
        "Content-Type":" application/json"
      }
    });
   data = await data.json();
    setUserDetails(data);
  }
  console.log("usrr details fr databaee",userDetails)
 
  //-----Submit User Profile Details for updating user profile --
  const [updateImage,setUpdateImage] = useState({ preview: '', data: '' })
   const handleUpdateProfile = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', updateImage.data)
    
    let localUser = JSON.parse(localStorage.getItem("user"));
     console.log(localUser._id);
     const Id = localUser._id;
     formData.append('userId', Id)
     
    let response = await fetch(`${url}/update_profile_details`, {
      method: 'post',
      body: formData ,
    })
    response = await response.json();
    //setStatus("image updated")
    setUpdateImage({preview:"",data:""})
  
  }

 //------ onChange Method--------
  const handleFileChange = (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setUpdateImage(img)
  }
  
  //---localUser--------
  let localUser
  useEffect(()=>{
    localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser)
    getUserDetails();
  },[])
  //console.log("profile---",user.userImage)  
  
  return (
       <div className="profileDetails">
         <div className ="coverImageWrapper">
           <img className="coverImage" src="./images/default_cover.png" alt='cover Image'/>
        </div>
         {
        user.userImage ? <img className="profilePic" src={`./images/${user.userImage}`}alt="profile.." /> 
        
          : <img className="profilePic" src="./images/default_profile2.png" alt="..." /> }
             <label htmlFor="imgInput"> ➕ Update Profile</label>
            
             <div className="profileBio"> 
                <h4 className="userName"> {user.name}</h4>
             </div>
      </div>
  ); 
}

export default ProfileDetails
