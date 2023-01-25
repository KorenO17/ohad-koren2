import { useState } from "react";

function Login() {
    const [userNameVal, setUserNameVal] = useState('');
    const [passwordVal, setPassword] = useState('');

    function logIn() {
        console.log('hi');
    }

    return (
      <div className="App">
        <label>User Name: <input name="user" type="text" onChange={(e) => setUserNameVal(e.target.value)} value={userNameVal} /></label>
        <label>Password: <input name="password" type="text" onChange={(e) => setPassword(e.target.value)} value={passwordVal}  /></label>
        <button onClick={logIn}>Log In</button>
      </div>
    );
  }
  
  export default Login;