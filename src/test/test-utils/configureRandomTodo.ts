import {ITodo} from '@shared/interfacesAndTypes';

const configureRandomTodo = (specialValues?: Partial<ITodo>) => {
  const randomTodo: ITodo = {
    id: Date.now(),
    label: 'test label',
    description: 'test desc',
    date: 'May 12',
    priority: '2',
    done: false,
    tags: [],
    projectId: '',
  }

  return {...randomTodo, ...specialValues}
}

export default configureRandomTodo
