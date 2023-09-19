import React from 'react';
import { render } from '@testing-library/react';
import Layout from '.';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div data-testid="child">Child Component</div>
      </Layout>
    );

    const childElement = getByText('Child Component');
    expect(childElement).toBeInTheDocument();
  });
});