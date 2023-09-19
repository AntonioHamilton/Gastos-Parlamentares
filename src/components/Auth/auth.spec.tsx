import React from 'react';
import { render } from '@testing-library/react';
import Auth from '.';

const mockPushRouter = jest.fn()

// Mock useRouter
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPushRouter,
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth Component', () => {
  it('renders children when authenticated', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue('fakeToken'),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const { getByText } = render(
      <Auth>
        <div data-testid="child">Child Component</div>
      </Auth>
    );

    const childElement = getByText('Child Component');
    expect(childElement).toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    // Mock useRouter
    render(
      <Auth>
        <div data-testid="child">Child Component</div>
      </Auth>
    );

    // Expect useRouter.push to have been called with /login
    expect(mockPushRouter).toHaveBeenCalledWith('/login');
  });
});