import renderWithProviders from '@test/test-utils/renderWithProvider';
import RenderedList from '@entities/todos/components/RenderedList/RenderedList';
import {screen} from '@testing-library/react'

const mockTodos = [
  {
    label: 'test',
    id: 1111,
    description: 'test desc',
    done: true,
    priority: '4',
    tags: [],
    projectId: 'May 17',
    isCurrent: true,
  },
  {
    label: 'test',
    id: 2222,
    description: 'test desc',
    done: true,
    priority: '4',
    tags: [],
    projectId: 'May 17',
    isCurrent: true,
  },
]


test('correct rendering todos array', () => {
  //@ts-ignore
  renderWithProviders(<RenderedList todos={mockTodos}/>)

  expect(screen.getAllByTestId('Todo card').length).toBe(mockTodos.length)
})
