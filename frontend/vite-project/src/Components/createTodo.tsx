import { useState } from "react";

const createTodo= () =>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    return(
        <div>
            <h1></h1>
            {/* add value here */}
            <input type="text" value={title} id="title" onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" />
            <input type="text" value={description} id="description" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description" />
            <button onClick={()=>{
                fetch("http://localhost:4000/new",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        'auth-token':`${localStorage.getItem('auth-token')}`
                    },
                    body: JSON.stringify({
                        title:title,
                        description:description
                    })
                }).then(async function(response){ 
                         await response.json();
                         setTitle("");
                         setDescription("");
                    alert("Todo Created")

                  })
            }}>+</button>
        </div>
        
    )
}
export default createTodo;
