import renderWithProviders from '@test/test-utils/renderWithProvider';
import InfoBoardDescription from './InfoBoardDescription';
import {screen} from '@testing-library/react';

describe('InfoBoardDescription', () => {
  it('should render with correct value', async function() {
    const initValue = 'test';
    const onTodoUpdate = jest.fn();
    const {user} = renderWithProviders(<InfoBoardDescription initValue={initValue} onTodoUpdate={onTodoUpdate}/>);

    const textArea = screen.getByTestId('description-input');

    expect(textArea).toHaveValue(initValue);

    await user.type(textArea, ' additional text');
    textArea.blur()

    expect(onTodoUpdate).toHaveBeenCalledTimes(1);

    expect(onTodoUpdate).toHaveBeenCalledWith({
      description: initValue + ' additional text',
    })

    expect(textArea).toHaveValue(initValue + ' additional text');
  });
})
