import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {addNewTodoTag, allTodosSelector, deleteTodoTag} from '@entities/todos/store/todo';
import {ITag, ITodo} from '@shared/interfacesAndTypes';
import {userTagsSelector} from '@entities/tag/store/tagStore';


export const useTags = (formState: ITodo, doesTodoExist: boolean):
    [ITag[], (newTag: string) => void] => {
  const dispatch = useDispatch()
  const allTodos = useSelector(allTodosSelector)
  const allUserTags = useSelector(userTagsSelector)

  const existingTodoTags: ITag[] = allTodos.find((todo) => todo.id === formState.id)?.tags || []
  const [creatingTodoTags, setCreatingTodoTags] = useState<ITag[]>([])

  const todoTags = doesTodoExist ? existingTodoTags: creatingTodoTags

  const onSelectTag = (newTag: string) => {
    const configuredTag = allUserTags.find((item) => item.name === newTag)!
    const payload = {tag: configuredTag, id: formState.id}

    const isIncludes = (arr: ITag[], newTag: string) => {
      const allNames = arr.map((item) => item.name)
      return allNames.includes(newTag)
    }

    if (!isIncludes(todoTags, newTag)) {
            doesTodoExist ? dispatch(addNewTodoTag(payload)) :
                setCreatingTodoTags((prev) => [...prev, configuredTag])
    } else {
            doesTodoExist ? dispatch(deleteTodoTag(payload)):
                setCreatingTodoTags((prev) => prev.filter((item) => item.name !== newTag))
    }
  }
  return [todoTags, onSelectTag]
}
