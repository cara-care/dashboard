import React from 'react';
import { renderWithReactIntl } from '../../utils/test-utils';
import { NOT_FOUND_TEXT_ID } from '../../utils/test-helpers';
import isMobileDevice from '../../utils/IsMobileDevice';
import en from '../../locale/en.json';
import NotFound from '../NotFound';

jest.mock('../../utils/IsMobileDevice');

describe('<NotFound />', () => {
  beforeEach(() => {
    // @ts-ignore
    isMobileDevice.mockClear();
  });

  afterAll(() => {
    // @ts-ignore
    isMobileDevice.mockRestore();
  });

  it('shows invalid link message', () => {
    const { getByTestId } = renderWithReactIntl(<NotFound />);
    const text = getByTestId(NOT_FOUND_TEXT_ID);
    expect(isMobileDevice).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(text).toHaveTextContent(en['404.invalidUrlGoToCara']);
  });

  it('shows only available on computer message', () => {
    // https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/
    // @ts-ignore
    isMobileDevice.mockImplementationOnce(() => ({
      __esModule: true,
      default: () => true,
    }));
    const { getByTestId } = renderWithReactIntl(<NotFound />);
    const text = getByTestId(NOT_FOUND_TEXT_ID);
    expect(isMobileDevice).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(text).toHaveTextContent(en['404.onlyAvailableOnComputer']);
  });
});
