import {
  questionnairesReducer,
  questionnairesInitialState,
} from '../questionnairesReducer';
import * as actions from '../questionnairesActions';
import { mockResult } from '../testUtils';

describe('questionnairesReducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(questionnairesReducer(undefined, {})).toEqual(
      questionnairesInitialState
    );
  });

  it('should handle [questionnaires] FETCH_SUBMISSIONS_PAGE_INIT', () => {
    expect(
      questionnairesReducer(undefined, actions.fetchSubmissionsPageInit(0))
    ).toEqual(
      Object.assign({}, questionnairesInitialState, {
        isFetching: true,
      })
    );
  });

  it('should handle [questionnaires] FETCH_SUBMISSIONS_PAGE_SUCCESS', () => {
    expect(
      questionnairesReducer(
        undefined,
        actions.fetchSubmissionsPageSuccess({
          submissions: mockResult.results,
          count: mockResult.count,
          next: mockResult.next,
          previous: mockResult.previous,
        })
      )
    ).toEqual(
      Object.assign(
        questionnairesInitialState,
        {},
        {
          isFetching: false,
          submissions: mockResult.results,
          count: mockResult.count,
          next: mockResult.next,
          previous: mockResult.previous,
        }
      )
    );
  });

  it('should handle [questionnaires] FETCH_SUBMISSIONS_PAGE_FAILED', () => {
    const error = Error('Failed to fetch submissions');
    expect(
      questionnairesReducer(
        undefined,
        actions.fetchSubmissionsPageFailed(error)
      )
    ).toEqual(
      Object.assign({}, questionnairesInitialState, {
        isFetching: false,
        error,
      })
    );
  });
});
