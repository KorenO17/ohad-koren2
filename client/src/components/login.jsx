
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    async function handleSubmit(e) {
        e.preventDefault()
        let strUser = await fetch(`http://localhost:8080/login`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        })
        let theUser = await strUser.json()
        console.log(theUser);
        if (theUser!='{}') {
            localStorage.setItem('user', theUser)
            navigate('/UserPage')
        }
        else alert("One of the details is wrong")
    }

    const nameChange = (e) => {
        setUsername(e.target.value)
    }

    const passChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <header id="webHeader">
                <div id='logo'>
                    <img src='https://seeklogo.com/images/M/monkey-logo-F30F974B08-seeklogo.com.png' alt="" />
                </div>
                <div id='title'>
                    <h1 >Ofkorinho's</h1>
                </div>
            </header>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3 id='login'>Login</h3>
                <label >Enter Username</label>
                <input className='logInput' value={username} onChange={(e) => nameChange(e)} name='username' />
                <br />
                <label >Enter Password</label>
                <input className='logInput' value={password} type='password' onChange={(e) => passChange(e)} name='password' />
                <br />
                <button id='logButton' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;