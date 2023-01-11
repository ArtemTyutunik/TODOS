import {useSelector} from "react-redux";
import {RootReducer} from "../../../app/store";
import Todo, {ITodo} from "../../../entities/todos/ui/todo";
import {Box} from "@mui/material";
import {useState} from "react";
import NoTodos from "./noTodos";
import CreateTodoForm from "./createTodoForm";


const TodoList = () => {
    const todos = useSelector((state: RootReducer) => state.todosReducer);
    const [isOpenForm, setIsOpenForm] = useState(false)

    if (isOpenForm){
        return <CreateTodoForm/>
    }


    if (!todos.length){
        return <NoTodos onClick={() => setIsOpenForm(true)}/>
    }


    return (
        <Box mt={'20px'}>
            {
                todos.map((todo: ITodo) => <Todo label={todo.label} key={todo.label}/>)
            }
        </Box>
    )


}

export default TodoList;