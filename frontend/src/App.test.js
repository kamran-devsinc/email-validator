import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Email validator', () => {
  const wrapper = render(<App />);

  expect(wrapper.getByTestId('emailValidator')).toBeInTheDocument();
});
