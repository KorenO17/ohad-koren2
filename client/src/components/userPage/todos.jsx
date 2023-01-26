import { useState, useEffect } from "react";
import { useUser } from "../../userContext";


function Todos() {
    let [done, setDone] = useState(false)
    let [deleteTo, setDeleteTo] = useState(false);
    let [sorting, setSorting] = useState("id")
    let { user, userTodos, setUserTodos } = useUser();
    let [inpVal,setInpVal] = useState()
    let [cheVal,setCheVal] = useState()

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
            else {
                let strTodos = await fetch(`http://localhost:8080/todos?userId=${JSON.parse(localStorage.getItem("user")).id}`);
                let arrTodos = await strTodos.json();
                setUserTodos(arrTodos);
                localStorage.setItem("userTodos", JSON.stringify(arrTodos));
                console.log("REFRESH FETCH");
            }
            // else {
            //     setUserTodos(JSON.parse(localStorage.getItem("userTodos")));
            //     console.log("NO FETCH");
            // }
        }
        takeTodos();

    }, []);
    useEffect(() => {

        setTimeout(() => changeSort(sorting), 0)
    }, [done]);

    async function checkDiff(e, i,id) {
        let o = [...(userTodos.length > 0 ? userTodos : JSON.parse(localStorage.getItem("userTodos")))];
        o[i].completed = !o[i].completed
        let bool
        if (o[i].completed){
            bool=1
        }
        else {
            bool=0
        }
        let strUser = await fetch(`http://localhost:8080/todos`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id , completed: bool})
        })
        let theUser = await strUser.json()
        console.log(theUser);
        setUserTodos(o);
        setDone((prevDone) => !prevDone);
        localStorage.setItem("userTodos", JSON.stringify(o));
    }

    function changeSort(val) {
        let o = [...(userTodos.length > 0 ? userTodos : JSON.parse(localStorage.getItem("userTodos")))];

        if (val === "id") {
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

    function deleteTodo() {
        let bool=deleteTo
        if(!bool){
            alert("you can delete now")
        }
        setDeleteTo(!bool)
        console.log(deleteTo);
    }

    async function delOne(e){
        console.log(deleteTo);
        console.log("val ",e.target.value);
        if(deleteTo){
            let strUser = await fetch(`http://localhost:8080/todos`,{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: e.target.value, userId: user.id })
            })
            let theUser = await strUser.json()
            setUserTodos(theUser)
        }
    }

   async function handleSubmit(e){
        e.preventDefault
        let bool
        if (cheVal){
            bool=1
        }
        else{
            bool=0
        }
        let strUser = await fetch(`http://localhost:8080/todos`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: inpVal, completed: bool,userId: user.id })
        })
        let theUser = await strUser.json()
        se
    }

    return (
        <div className="currentContent">
            <h3>Todos</h3>
            <ul>
                <select id="sorting" value={sorting} onChange={(e) => { changeSort(e.target.value) }}>
                    <option value="id">Sort by ID</option>
                    <option value="unchecked" >Sort by not Done</option>
                    <option value="checked" >Sort by Done</option>
                    <option value="name">Sort by Alphabet</option>
                    <option value="rand">Sort Randomaly</option>
                </select>
                {userTodos.length > 0 ? (userTodos.map((todo, i) => (<li value={todo.id} onClick={(e)=>delOne(e)}
                    key={todo.id}
                    style={userTodos[i].completed ? { background: "green" } : { background: "red" }}>
                    <input type="checkbox"
                        checked={userTodos[i].completed}
                        onChange={(e) => checkDiff(e, i,todo.id)} />
                    {
                        todo.title}
                </li>))) : ""}
            </ul>
            <button onClick={deleteTodo}>Delete</button>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h3>title</h3>
                <input type="text" value={inpVal} onChange={(e)=>setInpVal(e.target.value)}/>
                <h3>completed?</h3>
                <input type="checkbox" value={cheVal} onChange={(e)=>setCheVal(e.target.value)}/>
                <button>add todo</button>
            </form>
        </div>)
}

export default Todos;