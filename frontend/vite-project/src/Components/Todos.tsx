import { useEffect, useState } from "react";
import "./todos.css";

const getTodos = () => {
  const [todolist, setTodo] = useState<any[]>([]);

  useEffect(() => {
    // Fetch tasks from the backend
    fetch("http://localhost:4000/gettodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: "",
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter out tasks that are marked as done
        setTodo(data.filter((task:any) => !task.done));
      });
  }, [todolist]);

  const markasdone = (id: number) => {
    fetch("http://localhost:4000/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
      body: JSON.stringify({ id: id }), // Send request to mark the task as done
    })
      .then(() => {
        // alert("Task marked as done");
        // After marking as done, filter out the task from the displayed list
        setTodo(todolist.filter((task:any) => !task.done));
      });
  };

  return (
    <>
      <h1>Todos</h1>
      {todolist.map(function (task) {
        return (
            <div key={task.id} className="todo-container">
            
                <div key={task.id} className="todo-item">
                  <input
                    type="checkbox"
                    onChange={() => markasdone(task.id)} // Call markasdone when the checkbox is changed
                  />
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                </div>
            
          </div>          
        );
      })}
    </>
  );
};

export default getTodos;
