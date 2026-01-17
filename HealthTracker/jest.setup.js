// Jest setup file for global test configuration
/* eslint-disable no-undef */

// Mock console methods to keep test output clean
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
