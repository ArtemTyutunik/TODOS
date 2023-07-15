import Todo from '@entities/todos/components/todo/todo';
import renderWithProvider from '@test/test-utils/renderWithProvider';


const mockTodo = {
  label: 'test',
  id: 1111,
  description: 'test desc',
  done: true,
  priority: '4',
  tags: [],
  projectId: 'May 17',
  isCurrent: true,
}

test('render todo', () => {
  // @ts-ignore
  renderWithProvider(<Todo todo={mockTodo}/>)
})
