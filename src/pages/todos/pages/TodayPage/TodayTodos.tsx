import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {Box} from "@mui/material";

import {RootReducer} from "../../../../app/store";
import TodoList from "../../components/todo-list";
import NoTodayTodos from "./NoTodayTodos";
import {useState} from "react";
import CreateTodoForm from "../../components/createTodoForm";


const TodayTodosPage = () => {
    const todos = useSelector((state: RootReducer)=> state.todosReducer.todos);
    const todayTodos = todos.filter(todo => todo.date === dayjs().format('MMM D'))

    const [isOpenForm, setIsOpenForm] = useState(false)

    const onClose = () => {
        setIsOpenForm(false)
    }

    const onOpenForm = () => {
        setIsOpenForm(true)
    }

    if (isOpenForm) return <CreateTodoForm onClose={onClose}/>

    return (
        <Box paddingTop={'30px'} height={'100%'}>
            {
                todayTodos.length ? <TodoList todos={todayTodos}/>
                    :  <NoTodayTodos onClick={onOpenForm}/>
            }
        </Box>
    )

};

export default TodayTodosPage;
