import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';  // Added for mocking environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'http://dummy-supabase-url.com');  // Mock Supabase URL for testing
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'dummy-key');  // Mock Supabase anon key for testing
import ReminderPage from './ReminderPage';

test('ReminderPage renders correctly with updated UI elements', () => {
  render(<ReminderPage />);
  expect(screen.getByText('Reminder Settings')).toBeInTheDocument();  // Check for header
  expect(screen.getByLabelText('Enable reminders')).toBeInTheDocument();  // Check for checkbox
  expect(screen.getByLabelText('Reminder time')).toBeInTheDocument();  // Check for time input
  expect(screen.getByLabelText('Save reminders')).toBeInTheDocument();  // Check for save button
});
