import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from '.';
import { menuProperties } from '.';
import { useRouter } from '@/__mocks__/next/router';

const mockPushRouter = jest.fn()

// Mock useRouter
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPushRouter,
  }),
}));

describe('Menu Component', () => {
  const setMenuStateMock = jest.fn();

  it('renders without errors', () => {
    render(<Menu setMenuState={setMenuStateMock} menuState="" />);
  });

  it('renders menu buttons correctly', () => {
    const { getByText } = render(
      <Menu setMenuState={setMenuStateMock} menuState="" />
    );

    // Ensure that all menu buttons are rendered
    Object.keys(menuProperties).forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });

    // Ensure that the "sair" button is rendered
    expect(getByText('sair')).toBeInTheDocument();
  });

  it('calls setMenuState when a menu button is clicked', () => {
    const { getByText } = render(
      <Menu setMenuState={setMenuStateMock} menuState="" />
    );

    // Click a menu button
    fireEvent.click(getByText('Gastos totais por partido'));

    // Expect setMenuState to have been called with the correct name
    expect(setMenuStateMock).toHaveBeenCalledWith(
      'Gastos totais por partido'
    );
  });

  it('calls router.push when "sair" button is clicked', () => {
    const router = useRouter()

    const { getByText } = render(
      <Menu setMenuState={setMenuStateMock} menuState="" />
    );

    // Click the "sair" button
    fireEvent.click(getByText('sair'));

    // Expect router.push to have been called with the correct path
    expect(require('next/router').useRouter().push).toHaveBeenCalledWith('/login');
  });
});
