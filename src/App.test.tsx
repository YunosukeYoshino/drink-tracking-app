import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import { test, expect } from 'vitest';

test('App renders with BrowserRouter', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();  // Basic check to ensure App mounts
});
