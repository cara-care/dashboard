import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { authInitialState } from '../../auth';
import { questionnairesInitialState } from '../questionnairesReducer';
import withProviders from '../../components/withProviders';
import Questionnaires from '../pages/Questionnaires';
import { renderWithRedux } from '../../utils/test-utils';
import { getQuestionnaires as mockGetQuestionnaires } from '../../utils/api';
import { mockResult } from '../testUtils';
import en from '../../locale/en.json';

jest.mock('../../utils/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({
    path: '/nutri/questionnaires',
  }),
}));

describe('<Questionnaires />', () => {
  const QuestionnairesWithProviders = withProviders(
    Questionnaires,
    MemoryRouter
  );

  beforeEach(() => {
    // @ts-ignore
    mockGetQuestionnaires.mockClear();
  });

  it('shows an error message when failed to fetch submissions', async () => {
    const errorMessage = 'Failed to fetch submissions';
    // @ts-ignore
    mockGetQuestionnaires.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const { getByText } = renderWithRedux(<QuestionnairesWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          patientId: 1,
        },
      },
    });
    expect(mockGetQuestionnaires).toBeCalledTimes(1);
    expect(mockGetQuestionnaires).toBeCalledWith({
      userId: 1,
      limit: questionnairesInitialState.limit,
      offset: 0,
    });
    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });
  });

  it('shows a message when there are no submissions', async () => {
    const emptyResponse = {
      count: 0,
      previous: null,
      next: null,
      results: [],
    };
    // @ts-ignore
    mockGetQuestionnaires.mockResolvedValueOnce({ data: emptyResponse });
    const { getByText } = renderWithRedux(<QuestionnairesWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          patientId: 1,
        },
      },
    });
    expect(mockGetQuestionnaires).toBeCalledTimes(1);
    expect(mockGetQuestionnaires).toBeCalledWith({
      userId: 1,
      limit: questionnairesInitialState.limit,
      offset: 0,
    });
    await waitFor(() => {
      expect(getByText(en['nutriRecord.noResults.noData'])).toBeVisible();
    });
    expect(
      getByText(en['nutriRecord.noResults.patientDidntProvideMedicalHistory'])
    ).toBeVisible();
  });

  it('shows submissions with links to submission detail page', async () => {
    const routePath = '/nutri/questionnaires';
    // @ts-ignore
    mockGetQuestionnaires.mockResolvedValueOnce({ data: mockResult });
    const { getByText } = renderWithRedux(<QuestionnairesWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          patientId: 1,
        },
      },
    });
    expect(mockGetQuestionnaires).toBeCalledTimes(1);
    expect(mockGetQuestionnaires).toBeCalledWith({
      userId: 1,
      limit: questionnairesInitialState.limit,
      offset: 0,
    });
    await waitFor(() => {
      mockResult.results.forEach((submission) => {
        expect(getByText(submission.name)).toBeVisible();
      });
    });
    mockResult.results.forEach((submission) => {
      expect(getByText(submission.name).closest('a')).toHaveAttribute(
        'href',
        `${routePath}/${submission.id}`
      );
    });
  });
});
