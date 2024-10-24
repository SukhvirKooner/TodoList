import { useEffect, useState } from "react"
import "./todos.css"
const getTodos =()=>{
    const [todolist,setTodo] = useState<any[]>([]);
    useEffect(()=>{
        fetch("http://localhost:4000/gettodo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'auth-token':`${localStorage.getItem('auth-token')}`
            },
            body:"",
            }).then((response)=>response.json())
              .then((data)=>{setTodo(data)});
                    
                })
        return(
            
            <>
                <h1>
                 Todos
                </h1>
                {todolist.map(function(task){
                    return(
                        <div key={task.id} >
                            <input type="checkbox"  />
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            
                        </div>
                    )
                })}
            </>
        )

}
export default getTodos;
