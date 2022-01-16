//import { useNavigate, Link} from "react-router-dom";
import {useState} from "react"
const url ="http://localhost:4000"

const InputDetails= () => {
 // const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [loading,  setLoading] = useState(false);
  const [image, setImage] = useState({ preview: '', data: '' })
 
  
  //-----Submit User Profile Details --------
   const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    
    let localUser = JSON.parse(localStorage.getItem("user"));
     console.log(localUser._id);
     const Id = localUser._id;
     formData.append('userId', Id)
     
    let response = await fetch(`${url}/upload_profile_details`, {
      method: 'POST',
      body: formData ,
    })
    response = await response.json();
    setStatus("img uploaded. (Please reload to see updated data)")
    setImage({preview:"",data:""})
  
  }

 //------ onChange Method--------
  const handleFileChange = (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  
  return (
    <div className="inputDetailsParent">
       <h2 style={{color:"#fff"}}>Update Profile </h2> 
   
      <div className="updateInputDetails">
          <input type="text" placeholder=" Name" name="name"/>
          <input type="email" placeholder=" Email" name="email"/>
          <input type="password" placeholder=" Password"  name="password"/>
          <label htmlFor="imgInput"> ➕ Add Profile Pic</label>
          <input style={{display:"none"}} id="imgInput" type='file' name='file' onChange={handleFileChange}></input>
      </div>
      {status ? <p style={{fontSize:"9px", color:"green" }}> {status} </p> : <p style={{height:"2em"}}>  </p> }
      
     {image.preview && <img className="previewImg" src={image.preview} width='300' height='200' alt="profile pic Loading..."/>  }
         <br/> <br/><br/>
      <button className="updateButton" onClick={handleSubmit} type='submit'> Update </button>
     
  </div>
  );
}

export default InputDetails
