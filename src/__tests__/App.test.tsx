import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('App component renders with responsive classes', () => {
  render(<App />);
// Simulate mobile screen size
  Object.defineProperty(window, 'innerWidth', { value: 320, writable: true });
  render(<App />);
  const headerMobile = screen.getByRole('heading', { name: /ドリンクトラッカー/i });
  expect(headerMobile).toHaveClass('text-2xl');

  // Simulate tablet screen size
  Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
  render(<App />);
  const headerTablet = screen.getByRole('heading', { name: /ドリンクトラッカー/i });
  expect(headerTablet).toHaveClass('text-3xl');

  // Simulate desktop screen size
  Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
  render(<App />);
  const headerDesktop = screen.getByRole('heading', { name: /ドリンクトラッカー/i });
  expect(headerDesktop).toHaveClass('text-4xl');
  const header = screen.getByRole('heading', { name: /ドリンクトラッカー/i });
  expect(header).toHaveClass('text-2xl sm:text-3xl md:text-4xl');
  const container = header.closest('div');  // Assuming it's within a div with responsive padding
  expect(container).toHaveClass('p-4 sm:p-6 md:p-8');
});
