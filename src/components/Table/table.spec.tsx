import React from 'react';
import { render } from '@testing-library/react';
import Table from '.';

describe('Table Component', () => {
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
  ];

  it('renders Filters, DataTable, and Pagination when data is available and not loading', () => {
    const { getByTestId, getByText } = render(
      <Table
        data={mockData}
        loading={false}
        totalDocuments={mockData.length}
        menuState='Todos os dados'
        page={1}
        setPage={() => {}}
      >
        Additional Children
      </Table>
    );

    const filtersElement = getByTestId('filters');
    expect(filtersElement).toBeInTheDocument();

    const dataTableElement = getByTestId('data-table');
    expect(dataTableElement).toBeInTheDocument();

    const paginationElement = getByTestId('pagination');
    expect(paginationElement).toBeInTheDocument();
  });

  it('renders loading spinner when loading is true', () => {
    const { getByTestId } = render(
      <Table
        data={[]}
        loading={true}
        totalDocuments={0}
        menuState='Todos os dados'
        page={1}
        setPage={() => {}}
      >
        Additional Children
      </Table>
    );

    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('does not render Pagination when totalDocuments is less than or equal to 10', () => {
    const { queryByTestId } = render(
      <Table
        data={[]}
        loading={false}
        totalDocuments={10}
        menuState='Todos os dados'
        page={1}
        setPage={() => {}}
      >
        Additional Children
      </Table>
    );

    const paginationElement = queryByTestId('pagination');
    expect(paginationElement).not.toBeInTheDocument();
  });

  // Add more tests for other scenarios and edge cases.
});