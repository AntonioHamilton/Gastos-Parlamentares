// 'input, size, state, month, year'

import { fireEvent, render, screen } from "@testing-library/react"
import Filters from "."

// Mock useRouter
jest.mock('next/router');

describe('filters', () => {
  it('should render filters correctly', () => {
    render(<Filters filtersToShow={['input, size, state, month, year']}/>)

    const input = screen.findByTestId('input')
    const size = screen.findByTestId('size')
    const state = screen.findByTestId('state')
    const month = screen.findByTestId('month')
    const year = screen.findByTestId('year')


    expect(input).toBeTruthy()
    expect(size).toBeTruthy()
    expect(state).toBeTruthy()
    expect(month).toBeTruthy()
    expect(year).toBeTruthy()
  })

  it('changes the description input value when typing in the input field', () => {
    const { getByTestId } = render(<Filters filtersToShow={['input']} />);

    const inputElement = getByTestId('input') as any;

    fireEvent.change(inputElement, { target: { value: 'Test input value' } });

    expect(inputElement.value).toBe('Test input value');
  });

  it('calls change on select size', () => {
    const { getByTestId } = render(<Filters filtersToShow={['size']} />);

    const sizeSelect = getByTestId('sizeSelect') as any;

    fireEvent.change(sizeSelect, { target: { value: '20' } });

    expect(sizeSelect.value).toBe('20');
  });

  it('calls change on select state', () => {
    const { getByTestId } = render(<Filters filtersToShow={['state']} />);

    const stateSelect = getByTestId('stateSelect') as any;

    fireEvent.change(stateSelect, { target: { value: 'SP' } });

    expect(stateSelect.value).toBe('SP');
  });

  it('calls change on select month', () => {
    const { getByTestId } = render(<Filters filtersToShow={['month']} />);

    const monthSelect = getByTestId('monthSelect') as any;

    fireEvent.change(monthSelect, { target: { value: '2' } });

    expect(monthSelect.value).toBe('2');
  });

  it('calls change on select year', () => {
    const { getByTestId } = render(<Filters filtersToShow={['year']} />);

    const yearSelect = getByTestId('yearSelect') as any;

    fireEvent.change(yearSelect, { target: { value: '2017' } });

    expect(yearSelect.value).toBe('2017');
  });
})