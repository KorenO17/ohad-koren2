import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../userContext";

function Albums() {
    let { user, userAlbums, setUserAlbums, setUserAlbum } = useUser();



    async function takeAlbums() {
        if (user && !JSON.parse(localStorage.getItem("userAlbums"))) {
            let strAlbums = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);

            let arrAlbums = await strAlbums.json();
            await arrAlbums.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            setUserAlbums(arrAlbums);
            localStorage.setItem("userAlbums", JSON.stringify(arrAlbums));
            console.log("ENTERANCE FETCH")
        }
        else if (!JSON.parse(localStorage.getItem("userAlbums"))) {
            let strAlbums = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${JSON.parse(localStorage.getItem("user")).id}`);

            let arrAlbums = await strAlbums.json();
            await arrAlbums.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            setUserAlbums(arrAlbums);
            localStorage.setItem("userAlbums", JSON.stringify(arrAlbums));
            console.log("REFRESH FETCH");
        }
        else {
            setUserAlbums(JSON.parse(localStorage.getItem("userAlbums")));
            console.log("NO FETCH");
        }
    }
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            window.history.back()
        }
        takeAlbums();
    }, [])

    return (
        <div className="currentContent">
            <h3>My Albums</h3>
            <div id="Albums">{
                userAlbums.map((album, i) =>
                    <div className="album"> <Link to={`/UserPage/Albums/${i}`}
                        onClick={() => {
                            setUserAlbum(album)
                            localStorage.setItem("userAlbum", JSON.stringify(album))
                        }}
                        className="link"
                        key={album.id}>
                        {album.title}
                    </Link></div>)
            }</div>
        </div>
    )
}

export default Albums;