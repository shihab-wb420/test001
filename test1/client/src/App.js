import './App.css';
import {BrowserRouter as Router, 
        Routes, 
        Route} from "react-router-dom"
//import {useState} from "react"
import Nav from "./components/Nav"
import Private from "./components/Private"
import Home from "./pages/home"
import Blog from "./pages/blog/blog"
import Signup from "./pages/signup"
import Login from "./pages/login"
import About from "./pages/about"
import Profile from "./pages/profile"
import Setting from "./pages/settings/setting"
import SinglePost from "./pages/singlePost/singlePost"


function App() {
  
  return (
    <Router>
      <Nav  />
    <div className="App">
      <Routes>
       <Route element={<Private />}>
         <Route exact path="/"  element={ <Home />}/>
         <Route  path="/blog"   element={ <Blog />}/>
         <Route  path="/profile" element={ <Profile />}/>
         <Route path="/setting" element={<Setting />}/>
         <Route path="/single/:id" element={<SinglePost />}/>
       </Route>
         <Route  path="/about"  element={ <About />}/>
         <Route path="/login"  element={ <Login />}/>
         <Route  path="/signup/"  element={ <Signup />}/>
      </Routes>
    </div>
    
    </Router>
  );
}
export default App;
