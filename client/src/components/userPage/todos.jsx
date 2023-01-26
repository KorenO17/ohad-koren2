import { useState, useEffect } from "react";
import { useUser } from "../../userContext";


function Todos() {
   
    console.log("freere");
    let [done, setDone] = useState(false)

    let [sorting, setSorting] = useState("id")
    let { user, userTodos, setUserTodos } = useUser();
    useEffect(() => {
         if (!JSON.parse(localStorage.getItem("user"))) {
            window.history.back()
        }
        async function takeTodos() {
            if (user) {
                let strTodos = await fetch(`http://localhost:8080/todos?userId=${user.id}`);
                let arrTodos = await strTodos.json();
                setUserTodos(arrTodos);
                localStorage.setItem("userTodos", JSON.stringify(arrTodos));
                console.log("ENTERANCE FETCH")
            }
            else if(!JSON.parse(localStorage.getItem("userTodos"))) {
                let strTodos = await fetch(`http://localhost:8080/todos?userId=${JSON.parse(localStorage.getItem("user")).id}`);
                let arrTodos = await strTodos.json();
                setUserTodos(arrTodos);
                localStorage.setItem("userTodos", JSON.stringify(arrTodos));
                console.log("REFRESH FETCH");
            }
            else{
                setUserTodos(JSON.parse(localStorage.getItem("userTodos")));
                console.log("NO FETCH");
            }
        }
        takeTodos();

    }, []);
    useEffect(() => {
       
        setTimeout(() => changeSort(sorting), 0)
    }, [done]);

    function checkDiff(e, i) {
        let o = [...(userTodos.length>0?userTodos:JSON.parse(localStorage.getItem("userTodos")))];
        o[i].completed = !o[i].completed
        setUserTodos(o);
        setDone((prevDone) => !prevDone);
        localStorage.setItem("userTodos", JSON.stringify(o));
    }

    function changeSort(val) {
        let o = [...(userTodos.length>0?userTodos:JSON.parse(localStorage.getItem("userTodos")))];

        if (val ==="id") {
            o.sort((a, b) => {
                return a.id - b.id
            });
        }
        else if (val === "name") {
            o.sort((a, b) => {
                return a.title.localeCompare(b.title)
            });
          
        }
        else if (val === "unchecked") {
            o.sort((a, b) => {
                return a.completed ? 1 : -1;
            });
        }
        else if (val === "checked") {
            o.sort((a, b) => {
                return a.completed ? -1 : 1;
            });
        }
        else if (val === "rand") {
            o.sort((a, b) => {
                return Math.random() - 0.5;
            });
        }
        setSorting(val);
        setUserTodos(o);
        localStorage.setItem("userTodos", JSON.stringify(o));
    }

    return (
        <div className="currentContent">
            <h3>Todos</h3>
            <ol>
                <select id="sorting" value={sorting} onChange={(e) => { changeSort(e.target.value) }}>
                    <option value="id">Sort by ID</option>
                    <option value="unchecked" >Sort by not Done</option>
                    <option value="checked" >Sort by Done</option>
                    <option value="name">Sort by Alphabet</option>
                    <option value="rand">Sort Randomaly</option>
                </select>
                {userTodos.length > 0 ? (userTodos.map((todo, i) => (<li
                    key={todo.id}
                    style={userTodos[i].completed ? { background: "green" } : { background: "red" }}>
                    <input type="checkbox"
                        checked={userTodos[i].completed}
                        onChange={(e) => checkDiff(e, i)} />
                    {
                        todo.title}
                </li>))) : ""}
            </ol>
        </div>)
}

export default Todos;