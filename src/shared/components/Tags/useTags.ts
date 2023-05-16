import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {addNewTodoTag, deleteTodoTag} from '@entities/todos/store/todo';
import {RootReducer} from '@app/store';
import {ITodo} from '@shared/interfaces';


export const useTags = (formState: ITodo, firstCreation: boolean):
    [string[], (newTag: string) => void] => {
  const allTodos = useSelector((state: RootReducer) => state.todosReducer.todos)
  const dispatch = useDispatch()
  const existingTodoTags: string[] = allTodos.find((todo) => todo.id === formState.id)?.tags || []
  const [todoWithoutIdTags, setTodoWithoutIdTags] = useState<string[]>([])

  const todoTags = firstCreation ? existingTodoTags: todoWithoutIdTags

  const onSelectTag = (newTag: string) => {
    const payload = {tag: newTag, id: formState.id}
    if (!todoTags.includes(newTag)) {
            firstCreation ? dispatch(addNewTodoTag(payload)) :
                setTodoWithoutIdTags((prev) => [...prev, newTag])
    } else {
            firstCreation ? dispatch(deleteTodoTag(payload)):
                setTodoWithoutIdTags((prev) => prev.filter((item) => item !== newTag))
    }
  }
  return [todoTags, onSelectTag]
}
