import { expect, afterEach, vi } from 'vitest';  // Included vi for mocking
import * as matchers from '@testing-library/jest-dom/matchers';
vi.stubEnv('VITE_SUPABASE_URL', 'http://dummy-supabase-url.com');  // Global mock for Supabase URL
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'dummy-key');  // Global mock for Supabase anon key
expect.extend(matchers);  // Extend expect globally
