import configureAvatarSymbols from './ConfigureAvatarSymbols';


test('Return correct avatar symbols', () => {
  // const mockUserFullName = 'Test User'
  const mockLogin = 'testUser'
  // expect(configureAvatarSymbols(mockUserFullName, mockLogin)).toBe('TU')

  const mockUserName = 'User'
  expect(configureAvatarSymbols(mockUserName, mockLogin)).toBe('U')
})

test('Return login if no user name', () => {
  const mockUserName = undefined
  const mockLogin = 'testUser'
  expect(configureAvatarSymbols(mockUserName, mockLogin)).toBe('T')
})
