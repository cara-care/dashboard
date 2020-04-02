import {
  questionnairesReducer,
  questionnairesInitialState,
} from '../questionnairesReducer';
import * as actions from '../questionnairesActions';

describe('questionnairesReducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(questionnairesReducer(undefined, {})).toEqual(
      questionnairesInitialState
    );
  });
  //   FETCH_SUBMISSIONS_PAGE_INIT
  // FETCH_SUBMISSIONS_PAGE_SUCCESS
  // FETCH_SUBMISSIONS_PAGE_FAILED
  it('should handle auth/LOGIN_FAILED', () => {
    expect(
      questionnairesReducer(undefined, actions.fetchSubmissionsPageInit(0))
    ).toEqual(
      Object.assign({}, questionnairesInitialState, {
        isFetching: true,
      })
    );
  });
});
