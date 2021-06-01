// The following libraries are mocked at the global scale.

// Mocking react-native-reanimated
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Mocking @react-native-community/async-storage
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));
