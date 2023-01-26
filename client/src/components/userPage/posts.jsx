import { useUser } from "../../userContext";
import { useEffect } from "react";

function Info() {
    const { user, userPosts, setUserPosts } = useUser();
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            window.history.back()
            console.log(userPosts);
        }
        async function takePosts() {
            if (user&&!JSON.parse(localStorage.getItem("userPosts"))) {
                let strPosts = await fetch(`http://localhost:8080/posts?userId=${user.id}`);
                let arrPosts = await strPosts.json();
                setUserPosts(arrPosts);
                localStorage.setItem("userPosts", JSON.stringify(arrPosts));
                console.log("ENTERANCE FETCH")
            }
            else if(!JSON.parse(localStorage.getItem("userPosts"))){
                let strPosts = await fetch(`http://localhost:8080/posts?userId=${JSON.parse(localStorage.getItem("user")).id}`);
                let arrPosts = await strPosts.json();
                setUserPosts(arrPosts);
                localStorage.setItem("userPosts", JSON.stringify(arrPosts));
                console.log("ENTERANCE FETCH")
            }
            else{
                setUserPosts(JSON.parse(localStorage.getItem("userPosts")));
                console.log("NO FETCH");
            }
        }
        if (userPosts.length < 1)
            takePosts();
    }, []);

    async function ShowComments(i) {
        let o = [...userPosts]
        if (!o[i].comments || o[i].comments.length < 1) {
            let strComments = await fetch(`http://localhost:8080/comments?postId=${userPosts[i].id}`);
            let arrComments = await strComments.json();
            o[i].comments = arrComments;
        }
        else {
            o[i].comments = [];
        }
        console.log(o);
        setUserPosts(o);
    }

    function markUnmark(i) {
        console.log(userPosts[i].marked);
        let o = [...(userPosts.length>0?userPosts:JSON.parse(localStorage.getItem("userPosts")))]
        if (o[i].marked) {
            o[i].marked = false
        }
        else {
            o[i].marked = true
        }
        setUserPosts(o);
        localStorage.setItem("userPosts", JSON.stringify(o));
    }

    
    return (<div className="currentContent">
        <h3>My Posts</h3>
        {userPosts.map((post, i) => <div className="post" key={i} style={post.marked ? { background: 'rgb(137, 190, 233)' } : null}>
            <h4>{post.title}</h4>
            <div className="postButtons">
            <button onClick={() => markUnmark(i)}>mark</button>
            <button onClick={() => ShowComments(i)}>comments</button></div>
            {post.comments ? post.comments.map((comment, i) => <p key={i}><b>{comment.name}</b><br />{comment.body}</p>) : null}
        </div>)}
    </div>)

}

export default Info;
