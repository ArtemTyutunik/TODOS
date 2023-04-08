import React from 'react';
import {ITodo} from '@shared/interfaces';
import Todo from '@entities/todos/components/todo';


interface Props {
  todos: ITodo[]
}
const RenderedList = ({todos}: Props) => {
  const sortedByPriority = todos.sort((first, second) => +first.priority - +second.priority)
  return (
    <>
      {
        sortedByPriority.map((todo: ITodo) => <Todo todo={todo} key={todo.id}/>)
      }
    </>
  );
};

export default RenderedList;
