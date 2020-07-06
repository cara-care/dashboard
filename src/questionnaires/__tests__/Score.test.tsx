import React from 'react';
import { render } from '@testing-library/react';
import Score from '../components/Score';

describe('<Score />', () => {
  const title = 'Test title';
  const subtitle = 'Test subtitle';

  beforeAll(() => {
    // hide the propTypes warnings of <Score /> component
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  it('shows title, subtitle and score', () => {
    const score = 33;
    const { getByText } = render(
      <Score title={title} subtitle={subtitle} score={score} total={100} />
    );
    expect(getByText(title)).toHaveTextContent(title);
    expect(getByText(subtitle)).toHaveTextContent(subtitle);
    expect(getByText(`${score}`)).toHaveTextContent(`${score}`);
  });
});
