import {sortTodosByProperty} from '@shared/helpers';
import {ITodo} from '@shared/interfacesAndTypes';
import configureRandomTodo from '@test/test-utils/configureRandomTodo';


test('Returns all items of array', () => {
  const mockTodos: ITodo[] = [configureRandomTodo(), configureRandomTodo(), configureRandomTodo()]
  const mockSortingType = 'default'
  const mockOrdering = 'ascending'

  const returnedValue = sortTodosByProperty(mockSortingType, mockTodos, mockOrdering)

  expect(returnedValue.length).toBe(mockTodos.length)
})

test('Correct sorting by name in ascending order', () => {
  const mockTodos: ITodo[] = [
    configureRandomTodo({label: 'the longest name'}),
    configureRandomTodo({label: 'middle name'}),
    configureRandomTodo({label: 'shortest'}),
  ]
  const mockSortingType = 'name'
  const mockOrdering = 'ascending'

  const ascendingSortedArray = sortTodosByProperty(mockSortingType, mockTodos, mockOrdering)

  expect(ascendingSortedArray[0].label).toBe('middle name')
  expect(ascendingSortedArray[ascendingSortedArray.length - 1].label).toBe('the longest name')
})

test('Correct sorting by name in descending order', () => {
  const mockTodos: ITodo[] = [
    configureRandomTodo({label: 'the longest name'}),
    configureRandomTodo({label: 'middle name'}),
    configureRandomTodo({label: 'shortest'}),
  ]
  const mockSortingType = 'name'
  const mockOrdering = 'descending'
  const descendingSortedArray = sortTodosByProperty(mockSortingType, mockTodos, mockOrdering)

  expect(descendingSortedArray[0].label).toBe('the longest name')
  expect(descendingSortedArray[descendingSortedArray.length - 1].label).toBe('middle name')
})

test('Correct sorting by date in ascending order', () => {
  const mockTodos: ITodo[] = [
    configureRandomTodo({date: 'Mar 1'}),
    configureRandomTodo({date: 'Mar 4'}),
    configureRandomTodo({date: 'May 14'}),
  ]

  const mockSortingType = 'date'
  const mockOrdering = 'ascending'

  const ascendingSortedArray = sortTodosByProperty(mockSortingType, mockTodos, mockOrdering)

  expect(ascendingSortedArray[0].date).toBe('Mar 1')
  expect(ascendingSortedArray[ascendingSortedArray.length -1].date).toBe('May 14')
})
