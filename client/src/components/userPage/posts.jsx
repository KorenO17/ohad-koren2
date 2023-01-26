import { useUser } from "../../userContext";
import { useEffect, useRef, useState } from "react";

function Info() {
  const { user, userPosts, setUserPosts } = useUser();
  const [showInput, toggleShowInput] = useState(false);
  const header = useRef(null);
  const content = useRef(null);
  const [toRender, toggleToRender] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      window.history.back();
      console.log(userPosts);
    }
    async function takePosts() {
      if (user && !JSON.parse(localStorage.getItem("userPosts"))) {
        let strPosts = await fetch(
          `http://localhost:8080/posts?userId=${user.id}`
        );
        let arrPosts = await strPosts.json();
        setUserPosts(arrPosts);
        localStorage.setItem("userPosts", JSON.stringify(arrPosts));
        console.log("ENTERANCE FETCH");
      } else if (!JSON.parse(localStorage.getItem("userPosts"))) {
        let strPosts = await fetch(
          `http://localhost:8080/posts?userId=${
            JSON.parse(localStorage.getItem("user")).id
          }`
        );
        let arrPosts = await strPosts.json();
        setUserPosts(arrPosts);
        localStorage.setItem("userPosts", JSON.stringify(arrPosts));
        console.log("ENTERANCE FETCH");
      } else {
        setUserPosts(JSON.parse(localStorage.getItem("userPosts")));
        console.log("NO FETCH");
      }
    }
    if (userPosts.length < 1) takePosts();
    console.log("im here");
  }, [toRender]);

  async function makePost(header, content) {
    let useri = JSON.parse(localStorage.getItem("user")).id;
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: useri, title: header, body: content }),
    };
    await fetch(`http://localhost:8080/posts`, req).then((res) => res.json());
    let posts = await fetch(
      `http://localhost:8080/posts?userId=${
        JSON.parse(localStorage.getItem("user")).id
      }`
    );
    let final = await posts.json();
    setUserPosts(final);
  }

  async function ShowComments(i) {
    let o = [...userPosts];
    if (!o[i].comments || o[i].comments.length < 1) {
      let strComments = await fetch(
        `http://localhost:8080/comments?postId=${userPosts[i].id}`
      );
      let arrComments = await strComments.json();
      o[i].comments = arrComments;
    } else {
      o[i].comments = [];
    }
    console.log(o);
    setUserPosts(o);
  }

  function markUnmark(i) {
    console.log(userPosts[i].marked);
    let o = [
      ...(userPosts.length > 0
        ? userPosts
        : JSON.parse(localStorage.getItem("userPosts"))),
    ];
    if (o[i].marked) {
      o[i].marked = false;
    } else {
      o[i].marked = true;
    }
    setUserPosts(o);
    localStorage.setItem("userPosts", JSON.stringify(o));
  }

  return (
    <div className="currentContent">
      <h3>My Posts</h3>
      {userPosts.map((post, i) => (
        <div
          className="post"
          key={i}
          style={post.marked ? { background: "rgb(137, 190, 233)" } : null}
        >
          <h4>{post.title}</h4>
          <div className="postButtons">
            <button onClick={() => markUnmark(i)}>Mark</button>
            <button>Delete Post</button>
            <button onClick={() => ShowComments(i)}>Comments</button>
          </div>
          {post.comments
            ? post.comments.map((comment, i) => (
                <p key={i}>
                  <b>{comment.name}</b>
                  <br />
                  {comment.body}
                </p>
              ))
            : null}
        </div>
      ))}
      {showInput && <input ref={header} type="text" placeholder={"Header"} />}
      {showInput && <input ref={content} type="text" placeholder={"Content"} />}
      {showInput && (
        <button
          onClick={() => makePost(header.current.value, content.current.value)}
        >
          ADD
        </button>
      )}

      <button onClick={() => toggleShowInput(!showInput)}>Add New Post</button>
    </div>
  );
}

export default Info;
