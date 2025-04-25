import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('App component renders with responsive classes', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /ドリンクトラッカー/i });
  expect(header).toHaveClass('text-2xl sm:text-3xl md:text-4xl');
  const container = header.closest('div');  // Assuming it's within a div with responsive padding
  expect(container).toHaveClass('p-4 sm:p-6 md:p-8');
});
