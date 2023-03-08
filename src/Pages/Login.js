import React from 'react';
import {Link} from 'react-router-dom';

const Login=()=>{
  return(
    <div style={{ display: 'flex', justifyContent: 'space-between' ,padding:'2em'}}>
        <h3 style={{ paddingLeft:'4em'}}>
            Login Demp Page
        </h3>
        <h3 style={{ paddingRight:'6em'}}>
        <Link to="/">
            Back to Homepage</Link>
        </h3>
    </div>
  )
}
export default Login