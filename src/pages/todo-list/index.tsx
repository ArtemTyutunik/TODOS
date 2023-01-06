import {useSelector} from "react-redux";
import {RootReducer} from "../../app/store";
import Todo, {ITodo} from "../../entities/todos/ui/todo";
import {Box} from "@mui/material";


const TodoList = () => {

    const todos = useSelector((state: RootReducer) => state.todosReducer);

    return (
        <Box mt={'20px'}>
            {
                todos.map((todo: ITodo) => <Todo label={todo.label} key={todo.label}/>)
            }
        </Box>
    )


}

export default TodoList;