import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Pagination from '.';

describe('Pagination Component', () => {
  const mockSetPage = jest.fn();

  it('renders pagination buttons correctly', () => {
    const { getByTestId, getAllByRole } = render(
      <Pagination resultsQTD={30} page={0} setPage={mockSetPage} />
    );

    // Check if pagination buttons are rendered
    const paginationButtons = getAllByRole('button');
    expect(paginationButtons.length).toBeGreaterThan(0);

    // Check if "Next" button is rendered
    const nextButton = getByTestId('next');
    expect(nextButton).toBeInTheDocument();

    // Check if "Back" button is rendered
    const backButton = getByTestId('back');
    expect(backButton).toBeInTheDocument();
  });

  it('calls setPage when a pagination button is clicked', () => {
    const { getByText } = render(
      <Pagination resultsQTD={30} page={0} setPage={mockSetPage} />
    );

    // Click a pagination button
    const page2Button = getByText('2');
    fireEvent.click(page2Button);

    // Expect setPage to have been called with the correct page number
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('renders ellipsis when there are many pages', () => {
    const { getByText } = render(
      <Pagination resultsQTD={100} page={0} setPage={mockSetPage} />
    );

    // Check if ellipsis is rendered
    const ellipsis = getByText('...');
    expect(ellipsis).toBeInTheDocument();
  });

  it('calls setPage with the previous page when Back button is clicked', () => {
    const { getByTestId } = render(
      <Pagination resultsQTD={30} page={1} setPage={mockSetPage} />
    );

    const backButton = getByTestId('back');
    fireEvent.click(backButton);

    expect(mockSetPage).toHaveBeenCalledWith(0);
  });

  it('calls setPage with the next page when Next button is clicked', () => {
    const { getByTestId } = render(
      <Pagination resultsQTD={30} page={1} setPage={mockSetPage} />
    );

    const nextButton = getByTestId('next');
    fireEvent.click(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
