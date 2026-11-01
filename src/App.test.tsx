import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

test('converts HTML entered in the textarea and clears the result', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: '<p>Hello <strong>world</strong></p>' } });
  expect(screen.getByText('Hello **world**')).toBeInTheDocument();
  fireEvent.change(input, { target: { value: '' } });
  expect(screen.queryByText('Hello **world**')).not.toBeInTheDocument();
});
