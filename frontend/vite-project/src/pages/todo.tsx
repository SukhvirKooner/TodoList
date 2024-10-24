import CreateTodo from "../Components/createTodo";
import GetTodos from "../Components/Todos";
 function todos(){
    return(
    <div>
        <GetTodos/>
        <CreateTodo/>
    </div>
    )
}
export default todos;