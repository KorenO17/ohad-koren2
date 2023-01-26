import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [userTodos, setUserTodos] = useState([]);
    const [userAlbum, setUserAlbum] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [userPhotos, setUserPhotos] = useState([])
    return <UserContext.Provider value={{ user, setUser ,userPosts, setUserPosts,userTodos, setUserTodos,userAlbum, setUserAlbum,userPhotos, setUserPhotos,userAlbums, setUserAlbums}}>
        {children}
    </UserContext.Provider>;
}