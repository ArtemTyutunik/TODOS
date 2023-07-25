import UserAvatar from './userAvatar';
import renderWithProviders from '@test/test-utils/renderWithProvider';
import {screen} from '@testing-library/react';

test('Render user avatar', () => {
  renderWithProviders(<UserAvatar/>)
  screen.debug()
})
