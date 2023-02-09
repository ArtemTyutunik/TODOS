import {useState} from "react";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";

import NoInboxTodos from "./NoInboxTodos";
import TodoList from "../../components/todo-list";
import {RootReducer} from "../../../../app/store";
import CreateTodoForm from "../../components/createTodoForm";


const InboxTodosPage = () => {
    const todos = useSelector((state: RootReducer) => state.todosReducer.todos)
    const [isOpenForm, setIsOpenForm] = useState(false)

    const onClose = () => {
        setIsOpenForm(false)
    }

    const onOpenForm = () => {
        setIsOpenForm(true)
    }

    if (isOpenForm) {
        return <Box mt={'20px'}>
            <CreateTodoForm onClose={onClose}/>
        </Box>
    }

    return (
        <Box paddingTop={'30px'} height={'100%'}>
            {
                todos.length ? (
                    <TodoList todos={todos}/>
                ) : (
                    <NoInboxTodos onClick={onOpenForm}/>
                )
            }

        </Box>
    )
}
export default InboxTodosPage;