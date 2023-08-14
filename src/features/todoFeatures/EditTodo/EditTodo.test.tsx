import renderWithProviders from '@test/test-utils/renderWithProvider';
import EditTodoForm from '@features/todoFeatures/EditTodo/components/EditTodoForm';
import configureRandomTodo from '@test/test-utils/configureRandomTodo';
import {screen} from '@testing-library/react';

describe('edit todo form tests', () => {
  test('render edit todo form', () => {
    const mockTodo = configureRandomTodo()
    const onClose = jest.fn();
    renderWithProviders(<EditTodoForm onClose={onClose} todo={mockTodo}/>);

    expect(screen.getByTestId('base-todo-form')).toBeInTheDocument();
  })

  test('render edit todo form', async () => {
    const onClose = jest.fn();

    const mockTodo = configureRandomTodo()

    const {user} = renderWithProviders(<EditTodoForm onClose={onClose} todo={mockTodo}/>);

    await user.click(screen.getByTestId('form-cancel-button'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
