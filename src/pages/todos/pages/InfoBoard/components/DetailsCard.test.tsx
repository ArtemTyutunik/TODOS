import renderWithProviders from '@test/test-utils/renderWithProvider';
import DetailsCard from '@pages/todos/pages/InfoBoard/components/DetailsCard';
import configureRandomTodo from '@test/test-utils/configureRandomTodo';
import {screen} from '@testing-library/react';

const checkValue = (expectedValue: string, element: HTMLElement) => {
  expect(element).toBeInTheDocument();
  expect(element).toHaveValue(expectedValue);
}


describe('DetailsCard', () => {
  const mockTodo = configureRandomTodo();

  it('should render', async function() {
    renderWithProviders(<DetailsCard todo={mockTodo}/>);

    const title = screen.getByTestId('title-input')
    checkValue(mockTodo.label, title)

    const description = screen.getByTestId('description-input')
    checkValue(mockTodo.description, description)
  });
})
