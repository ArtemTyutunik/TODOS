import {Box} from "@mui/material";
import { useSelector} from "react-redux";
import {useState} from "react";

import {RootReducer} from "../../../app/store";
import Todo from "../../../entities/todos/ui/todo";
import NoTodos from "./noTodos";
import CreateTodoForm from "./createTodoForm";
import {ITodo} from "../../../shared/interfaces";


const TodoList = () => {
    const {todos} = useSelector((state: RootReducer) => state.todosReducer);
    const [isOpenForm, setIsOpenForm] = useState(false)

    const onClose = () => {
        setIsOpenForm(false)
    }

    const onOpenForm = () => {
        setIsOpenForm(true)
    }

    if (isOpenForm) return <CreateTodoForm onClose={onClose}/>

    if (!todos.length) return <NoTodos onClick={onOpenForm}/>

    return (
        <Box mt={'20px'}>
            {
                todos.map((todo: ITodo) => <Todo todo = {todo} key={todo.label}/>)
            }
        </Box>
    )


}

export default TodoList;