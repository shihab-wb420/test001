// import from " ";
import {useState,useEffect} from "react"
import{ Link, useNavigate} from "react-router-dom"
const url ="http://localhost:4000"

 const Signup = () => {
  const [error,setError]=useState(false);
  const navigate = useNavigate();
  
  /*
  const [signupData, setSignupData] = useState({
    name:"",
    email:"",
    password:""
  });
  
  //------Signup onChange Method---------
  const handleFileChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setSignupData({...signupData, [name]:value});
  }
   
  
  //------Collecting signup form data------
 const handleSubmit = async () =>{
    const {name,email,password} = signupData;
    if(!name || !email || !password){
      setError(true);
       return false;
    }
    let data = await fetch(`${url}/register`,{
      method:"post",
      body: JSON.stringify({name,email,password}),
      headers:{
        "Content-Type":" application/json"
      }
    });
    data = await data.json();
    localStorage.setItem("user", JSON.stringify(data));
     navigate("/");
  }
*/

const [signupData, setSignupData] = useState({
  preview: '', data: '', 
 })
  const [bal, setBal] = useState({
  name:"", email:"", password:""
 })
  
  //-----Submit User Profile Details --------
   const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', signupData.data)
    formData.append('name', bal.name)
    formData.append('email', bal.email)
    formData.append('password', bal.password)
    
    /*let localUser = JSON.parse(localStorage.getItem("user"));
     console.log(localUser._id);
     const Id = localUser._id;
     formData.append('userId', Id)*/
     
    let response = await fetch(`${url}/register`, {
      method: 'POST',
      body: formData ,
    })
    response = await response.json();
     navigate("/login");
   // setStatus("img uploaded. (Please reload to see updated data)")
   // setImage({preview:"",data:""})
  //let data = response.email
  //localStorage.setItem("user", JSON.stringify(response.name));
 
  }

 //------ onChange Method--------
  const handleFileChange = (e) => {
    e.preventDefault();
    const inputData = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
   /*  name: e.target.name,
      email: e.target.email,
      password: e.target.password*/
    }
    setSignupData(inputData)
  }

const balChange=(e)=>{
    e.preventDefault();
     let name = e.target.name;
    let value = e.target.value;
    setBal({...bal, [name]:value})
}

  
  /*useEffect(()=>{
  //const user = localStorage.getItem("user");
  const localUser = JSON.parse(localStorage.getItem("user"))
  if(localUser){
    navigate("/");
  }
 },[])*/

  return (
    <div className="App">
       <h2>Registration</h2> <hr/>
  
       <div className="signupForm commonFormStyle">
           <input type="text" 
               placeholder="   Full-Name"
               name="name"
               value={bal.name}
               onChange={balChange}
            /> 
           { error && !signupData.name && <span className="invalidInput" > Enter Your Name </span>}
           <input type="email"
               placeholder="   E-mail"
               name="email"
               value={bal.email}
               onChange={balChange}
            />
         { error && !signupData.email && <span className="invalidInput"> Enter a valid email </span>}
           <input type="password" 
              placeholder="   Password"
              name="password"
              value={bal.password}
              onChange={balChange}
           />
     { error && !signupData.password && <span className="invalidInput"> Enter a valid password </span>}
     
         <label htmlFor="imgInput"> ➕ Add Profile Pic</label>
          <input id="imgInput" type='file' name='file' onChange={handleFileChange}></input>
   
     
           <button className="commonSubmitButton" type="submit" onClick={handleSubmit}> Create Account </button>
           
       </div>
       <span> Already Have an Account?</span> <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup