import UserAvatar from './userAvatar';
import renderWithProviders from '@test/test-utils/renderWithProvider';
import {screen} from '@testing-library/react';
import {IUser} from '@shared/interfacesAndTypes';

test('Render user avatar', () => {
  const userAccount: IUser = {
    login: 'testUser@gmail.com',
    accessToken: '',
    name: 'test user name',
    user_id: 'test user id',
    picture: 'test picture url',
    emailIsVerified: true,
    todos: [],
  }

  const preloadState = {userReducer: {user: userAccount,
    errorMessage: null,
    isAuth: true,
    isError: false,
    verified: true},
  }

  renderWithProviders(<UserAvatar/>, {preloadedState: preloadState})
  const userAvatar = screen.getByTestId('user-avatar')
  expect(userAvatar).toBeInTheDocument()

  const avatarUrl = userAvatar.getAttribute('data-url')
  expect(avatarUrl).toBe(userAccount.picture)
})

test('Render default avatar', () => {
  const userAccount: IUser = {
    login: 'testUser@gmail.com',
    accessToken: '',
    name: 'test user name',
    user_id: 'test user id',
    picture: '',
    emailIsVerified: true,
    todos: [],
  }

  const preloadState = {userReducer: {user: userAccount,
    errorMessage: null,
    isAuth: true,
    isError: false,
    verified: true},
  }

  renderWithProviders(<UserAvatar/>, {preloadedState: preloadState})
  expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument()
  expect(screen.getByTestId('default-avatar')).toBeInTheDocument()
})
