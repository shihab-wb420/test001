//import {useEffect} from "react";
import { useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from "react"
const url ="http://localhost:4000" 

const Nav = () => {
  const navigate = useNavigate();
  const [error,setError] =useState(true)
  //-----LocalStorage User------
  const [user, setUser] = useState({
    localUser:""
  });
 

const Logout =()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }
  
  //----Open DropDown Menue----
  const OpenMenue = () =>{
     let menue = document.querySelector(".dropMenue");
     menue.classList.add("active")
  }
  //----Open DropDown Menue----
  const CloseMenue = () =>{
     let menue = document.querySelector(".dropMenue");
     menue.classList.remove("active")
  }
  
  //------Fething user Profile picture -------
  
/*  const getData= async ()=>{
     const userId = user_Id;
     
    let data = await fetch(`${url}/get_profile_Details/`+userId,{
      method:"get",
      headers:{
        "Content-Type":" application/json"
      }
    });
   data = await data.json();
    setProfilePic(data);
    setError(false)
   // console.log("data",data)
   }*/
   let localUser;
   useEffect(()=>{
    //localData()
    localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser)
   },[user])

  
  return (
  <div className="NavBar">
    <Link id="logo" to="/"> Unity.IT</Link>
   <div class="linkBox">
  {user ?  
  <>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/blog">Blog</Link>
    </li>
    <li>
       <div onClick={OpenMenue} className="dropdownButton">
          {!user.userImage ?  <img src="./images/default_profile2.png" alt="Loading.."/>
          : 
         <img src={`./images/${user.userImage}`} alt="profile.."/>}
       </div>
    
        <div onClick={CloseMenue} className="dropMenue"> 
           <div className="menueItem">
              <Link to="/profile">Profile</Link> 
           </div>
           <div className="menueItem"> <Link to="/setting"> Settings</Link></div>
            {/*
            <div className="menueItem">Pricing</div>
           <div className="menueItem">Dashboard</div>
            
            */}
           <div onClick={Logout} className="menueItem">Logout</div>
            <div onClick={CloseMenue} className="closeMenue"> 
              ❌
           </div>
        </div>
    </li>
    
  </>
  :
  <>
  { /* <li>
      <Link to="/about">About</Link>
    </li> */}
    <li className="common">
      <Link to="/signup">Signup</Link>
    </li>
    
    <li className="common">
      <Link to="/login">Login</Link>
    </li>
  </>
   
  }
   </div>
  </div>
  );
}

export default Nav ;
