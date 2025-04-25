import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';  // Added for mocking environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'http://dummy-supabase-url.com');  // Mock Supabase URL for testing
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'dummy-key');  // Mock Supabase anon key for testing
import HomePage from './HomePage';

test('HomePage renders correctly with updated UI elements', () => {
  render(<HomePage />);
  expect(screen.getByText('Drink Tracker')).toBeInTheDocument();  // Check for header
  const progressBar = screen.getByLabelText('Goal progress: 50%');  // Check for progress bar
  expect(progressBar).toHaveStyle('width: 50%');  // Verify style
});
