import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import { UserProvider } from './userContext';
import UserPage from './components/userPage';
import Posts from './components/userPage/posts';
import Todos from './components/userPage/todos';
import Albums from './components/userPage/album';
import Photos from './components/userPage/photos/photos';
import Error from './components/error';
import Info from './components/userPage/info';
import './ofkorApp.css';



function App() {
    return (

        <BrowserRouter>

            <UserProvider>
                <Routes >
                    <Route index element={<Navigate replace to={'/Login'}/>}/>
                    <Route path='/Login' element={<Login />} />
                    <Route path="/UserPage" element={<UserPage />} >
                        <Route path="Albums" element={<Albums />} />
                        <Route path="Albums/:id" element={<Photos />} />
                        <Route path="info" index element={<Info />} />
                        <Route path="todos" element={<Todos />} />
                        <Route path="posts" element={<Posts />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>)
}

export default App;