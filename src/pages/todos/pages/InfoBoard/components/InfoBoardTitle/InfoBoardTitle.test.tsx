import renderWithProviders from '@test/test-utils/renderWithProvider';
import InfoBoardTitle from './InfoBoardTitle';
import {screen} from '@testing-library/react';

describe('InfoBoardTitle', () => {
  it('should render with correct value', () => {
    const mockValue = 'test';
    const mockHandler = jest.fn();

    renderWithProviders(<InfoBoardTitle initValue={mockValue} onTitleChange={mockHandler}/>);

    const textArea = screen.getByTestId('title-input');
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue(mockValue)
  });

  it('should calls onTitleChange', async () => {
    const mockValue = 'test';
    const mockHandler = jest.fn();

    const {user} = renderWithProviders(<InfoBoardTitle initValue={mockValue} onTitleChange={mockHandler}/>);

    const textArea = screen.getByTestId('title-input');

    const additionalText = ' updated';
    await user.type(textArea, additionalText);
    await user.type(textArea, '{Enter}');

    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toBeCalledWith({label: mockValue + additionalText});
  });

  it('shouldn`t call onTitleChange when value is empty', async () => {
    const mockValue = 'test';
    const mockHandler = jest.fn();

    const {user} = renderWithProviders(<InfoBoardTitle initValue={mockValue} onTitleChange={mockHandler}/>);

    const textArea = screen.getByTestId('title-input');

    await user.clear(textArea)
    await user.type(textArea, '{Enter}');

    expect(mockHandler).not.toBeCalled()
    expect(textArea).toHaveValue(mockValue)
  });
})
