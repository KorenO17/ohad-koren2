import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUser } from '../userContext';

function UserPage() {
    const { user, setUser } = useUser();


    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            window.history.back()
            console.log("hi")
        }
        else{setUser(JSON.parse(localStorage.getItem("user")))}
        
    }, [])

    return (<div>
        <header id="webHeader">
        <div id='logo'>
        <img src='https://seeklogo.com/images/M/monkey-logo-F30F974B08-seeklogo.com.png' alt=""/> 
        </div>  
        <div id='title'>
        <h1 >Koren=Sansa & Ohad=Hara</h1>
        </div>
        </header>
        <nav>
            <div><Link to="/UserPage/Albums">My Albums</Link></div>
            <div><Link to="/UserPage/posts">My Posts</Link></div>
            <div><Link to="/UserPage/todos">My Todos</Link></div>
            <div><Link to="/UserPage/info">My Info</Link></div>
            <div id='logOut'><Link to="/" onClick={() => localStorage.clear()}>Log Out</Link></div>
        </nav>
        <h2 id='hi'>Hi {user.username}!</h2>
            <Outlet/>
    
    </div>)
}

export default UserPage