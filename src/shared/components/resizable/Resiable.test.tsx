import renderWithProviders from '@test/test-utils/renderWithProvider';
import Resizable from '@shared/components/resizable/Resizable';
import {fireEvent, screen} from '@testing-library/react';

describe('Resizable component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Resizable direction={'right'} localStorageItem={'test-block'}>
      <div>test</div>
    </Resizable>)

    expect(screen.getByTestId('resizable')).toBeInTheDocument()
    expect(screen.getByTestId('resizer')).toBeInTheDocument()
  })

  it('should change width on mouse move', async () => {
    renderWithProviders(<Resizable direction={'right'}
      localStorageItem={'test-block'}
      width={'300px'}>
      <div>test</div>
    </Resizable>)

    const clientXAfterMove = 350;

    const resizer = screen.getByTestId('resizer')

    fireEvent.mouseDown(resizer, {clientX: 300}) // because width set 300px
    fireEvent.mouseMove(resizer, {clientX: clientXAfterMove})
    fireEvent.mouseUp(resizer)

    const resizable = await screen.findByTestId('resizable')
    expect(getComputedStyle(resizable).width).toBe(clientXAfterMove + 'px')
  })

  it('should not be more than max value', async () => {
    const maxValue = 600
    renderWithProviders(<Resizable direction={'right'}
      localStorageItem={'test-block'}
      maxWidth={maxValue}
      width={'400px'}
      minWidth={100}
    >
      <div>test</div>
    </Resizable>)

    const clientXStep1 = 599;
    const clientXThatBiggerMaxValue = 710;

    const resizer = screen.getByTestId('resizer')

    fireEvent.mouseDown(resizer, {clientX: 400})
    fireEvent.mouseMove(resizer, {clientX: clientXStep1})
    fireEvent.mouseMove(resizer, {clientX: clientXThatBiggerMaxValue})
    fireEvent.mouseUp(resizer)

    const resizable = await screen.findByTestId('resizable')
    expect(getComputedStyle(resizable).width).toBe(clientXStep1 + 'px')
  });
})


