import renderWithProviders from '@test/test-utils/renderWithProvider';
import SortingMenu from '@pages/todos/components/SortMenu/Menu/SortingMenu';
import {screen} from '@testing-library/react';

test('render correct menu', () => {
  renderWithProviders(<SortingMenu/>)

  expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
})
