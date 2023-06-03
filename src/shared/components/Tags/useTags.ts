import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {addNewTodoTag, allTodosSelector, deleteTodoTag} from '@entities/todos/store/todo';
import {ITag, ITodo} from '@shared/interfaces';
import {configureNewTag} from '@entities/tag/utils/configureInitialTag';


export const useTags = (formState: ITodo, firstCreation: boolean):
    [ITag[], (newTag: string) => void] => {
  const dispatch = useDispatch()
  const allTodos = useSelector(allTodosSelector)

  const existingTodoTags: ITag[] = allTodos.find((todo) => todo.id === formState.id)?.tags || []
  const [todoWithoutIdTags, setTodoWithoutIdTags] = useState<ITag[]>([])

  const todoTags = firstCreation ? existingTodoTags: todoWithoutIdTags

  const onSelectTag = (newTag: string) => {
    const configuredTag = configureNewTag(newTag)
    const payload = {tag: configuredTag, id: formState.id}

    const isIncludes = (arr: ITag[], newTag: string) => {
      const allNames = arr.map((item) => item.name)
      return allNames.includes(newTag)
    }

    if (!isIncludes(todoTags, newTag)) {
            firstCreation ? dispatch(addNewTodoTag(payload)) :
                setTodoWithoutIdTags((prev) => [...prev, configuredTag])
    } else {
            firstCreation ? dispatch(deleteTodoTag(payload)):
                setTodoWithoutIdTags((prev) => prev.filter((item) => item.name !== newTag))
    }
  }
  return [todoTags, onSelectTag]
}
