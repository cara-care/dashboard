import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import Questionnaire from '../pages/Questionnaire';
import withProviders from '../../components/withProviders';
import { renderWithRedux } from '../../utils/test-utils';
import { authInitialState } from '../../auth';
import { getQuestionnaire as mockGetQuestionnaire } from '../../utils/api';
import { submissionBuilder } from '../testUtils';
import { QUESTIONNAIRE_NAME } from '../../utils/test-helpers';
import en from '../../locale/en.json';

jest.mock('../../utils/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 123,
  }),
}));

describe('<Questionnaire />', () => {
  const QuestionnaireWithProviders = withProviders(Questionnaire, MemoryRouter);

  beforeAll(() => {
    // hide the propTypes warnings of <Score /> component
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    // @ts-ignore
    mockGetQuestionnaire.mockClear();
  });

  afterAll(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  it('shows an error message when failed to fetch submission', () => {
    const errorMessage = 'Failed to fetch submission';
    // @ts-ignore
    mockGetQuestionnaire.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const { getByText } = renderWithRedux(<QuestionnaireWithProviders />, {
      preloadedState: {
        auth: {
          ...authInitialState,
          patientId: 1,
        },
      },
    });
    expect(getByText(errorMessage)).toBeVisible();
  });

  it('shows submission name, scores and group fields', async () => {
    const submission = submissionBuilder();
    // @ts-ignore
    mockGetQuestionnaire.mockResolvedValueOnce({ data: submission });
    const { getByText, getByTestId } = renderWithRedux(
      <QuestionnaireWithProviders />,
      {
        preloadedState: {
          auth: {
            ...authInitialState,
            patientId: 1,
          },
        },
      }
    );

    expect(mockGetQuestionnaire).toBeCalledTimes(1);
    expect(getByText(en['common.loadingData'])).toBeVisible();
    expect(mockGetQuestionnaire).toBeCalledWith({
      userId: 1,
      submissionId: 123,
    });

    await waitFor(() => {
      expect(getByTestId(QUESTIONNAIRE_NAME)).toBeVisible();
    });
    expect(getByTestId(QUESTIONNAIRE_NAME)).toHaveTextContent(submission.name);
    expect(getByText(`${submission.scoreSSS}`)).toBeVisible();
    expect(getByText(`${submission.scoreQOL}`)).toBeVisible();
    // TODO: add group field assertions
  });
});
