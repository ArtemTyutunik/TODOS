import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {addNewTodoTag, allTodosSelector, deleteTodoTag} from '@entities/todos/store/todo';
import {ITodo, tagIdType} from '@shared/interfacesAndTypes';


export const useTags = (formState: ITodo, doesTodoExist: boolean):
    [tagIdType[], (tagId: tagIdType) => void] => {
  const dispatch = useDispatch()
  const allTodos = useSelector(allTodosSelector)

  const existingTodoTags: tagIdType[] = allTodos.find((todo) => todo.id === formState.id)?.tags || []
  const [creatingTodoTags, setCreatingTodoTags] = useState<tagIdType[]>(formState.tags)

  const todoTags = doesTodoExist ? existingTodoTags: creatingTodoTags

  const onSelectTag = (tagId: tagIdType) => {
    const payload = {tagId: tagId, id: formState.id}

    if (!todoTags.includes(tagId)) {
            doesTodoExist ? dispatch(addNewTodoTag(payload)) :
                setCreatingTodoTags((prev) => [...prev, tagId])
    } else {
            doesTodoExist ? dispatch(deleteTodoTag(payload)):
                setCreatingTodoTags((prev) => prev.filter((item) => item !== tagId))
    }
  }
  return [todoTags, onSelectTag]
}
