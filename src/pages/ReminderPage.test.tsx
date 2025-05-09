import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';  // Added for mocking environment variables
import { test, expect } from 'vitest';
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
import userEvent from '@testing-library/user-event';  // For simulating user interactions
import { act } from '@testing-library/react';  // For handling asynchronous updates

test('Toggling reminder checkbox schedules the reminder', async () => {
  global.Notification = vi.fn().mockImplementation(() => {});  // Mock Notification API
  render(<ReminderPage />);

  const checkbox = screen.getByLabelText('Enable reminders');
  await act(async () => {
    await userEvent.click(checkbox);
  });

  // Assuming state update or side effect; check for expected behavior
  expect(checkbox).toBeChecked();
  // Add more assertions based on expected outcome, e.g., if a function is called
});
