import React, {memo} from 'react';
import {ITodo, Priority} from '@shared/interfacesAndTypes';
import TodoCard from '@entities/todos/components/todoCard';
import {ProjectContext} from '@pages/project/components/ProjectPage';
import {useAppDispatch} from '@app/store';
import {deleteTask, setPriority} from '@entities/todos/store/todo';
import useTodos from '@entities/todos/hooks/useTodos';

interface Props {
    todo: ITodo,
    showProject?: boolean
}
const ProjectTodo = memo((props: Props) => {
  const {todo, showProject} = props
  const {connectProjectToWebSocket} = React.useContext(ProjectContext)!
  const dispatch = useAppDispatch()
  const todosAPI = useTodos(todo.id, true, connectProjectToWebSocket)

  const onPriorityChange = (priority: Priority) => {
    dispatch(setPriority({id: todo.id, priority}))
    connectProjectToWebSocket({id: todo.id, priority: priority})
  }

  const onDeleteAction = () => {
    dispatch(deleteTask(todo.id))
  }

  return (
  //@ts-ignore
    <TodoCard todo={todo} showProject={showProject}
      onComplete={todosAPI.onComplete}
      setPriorityAction={onPriorityChange}
      onDeleteAction={onDeleteAction}
    />
  );
});

export default ProjectTodo;
