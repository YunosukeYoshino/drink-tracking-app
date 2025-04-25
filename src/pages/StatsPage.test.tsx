import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';  // Added for mocking environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'http://dummy-supabase-url.com');  // Mock Supabase URL for testing
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'dummy-key');  // Mock Supabase anon key for testing
import StatsPage from './StatsPage';

test('StatsPage renders correctly with updated UI elements', () => {
  render(<StatsPage />);
  expect(screen.getByText('Statistics Dashboard')).toBeInTheDocument();  // Check for header
  expect(screen.getByLabelText('Sample stats graph')).toBeInTheDocument();  // Check for graph placeholder
  expect(screen.getByLabelText('Back to home')).toBeInTheDocument();  // Check for link
});
