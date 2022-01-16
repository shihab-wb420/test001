import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//------Components Styles-----
import "./styles/comps/nav.css"
import "./styles/comps/post/addPost.css"
import "./styles/comps/post/showPost.css"
import "./styles/comps/post/comment.css"
import "./styles/comps/profile/profileDetails.css"
import "./styles/comps/profile/inputDetails.css"
import "./components/loader/loader.css"

//------Pages Styles----------
import "./styles/pages/signup.css"
import "./styles/pages/blog/blog.css"
import "./styles/pages/profile.css"


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
