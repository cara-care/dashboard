import { authReducer, authInitialState, AuthStatus } from '../authReducer';
import * as actions from '../authActions';

const patientDataMock = {
  id: 1,
  nickname: 'test',
  timezone: 'Europe/Berlin',
  enrolledProgrammes: [],
};
const errorMock = { name: 'Error', message: 'Failed' };

describe('authReducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore
    expect(authReducer(undefined, {})).toEqual(authInitialState);
  });

  it('should handle auth/LOGIN_INIT', () => {
    expect(
      authReducer(
        undefined,
        actions.loginInitAction({ username: 'username', password: 'password' })
      )
    ).toEqual(
      Object.assign({}, authInitialState, { status: AuthStatus.FETCHING })
    );
  });

  it('should handle auth/LOGIN_SUCCESS', () => {
    expect(authReducer(undefined, actions.loginSuccessAction())).toEqual(
      Object.assign({}, authInitialState, { status: AuthStatus.AUTHENTICATED })
    );
  });

  it('should handle auth/LOGIN_FAILED', () => {
    expect(
      authReducer(undefined, actions.loginFailedAction(errorMock))
    ).toEqual(
      Object.assign({}, authInitialState, {
        status: AuthStatus.ERROR,
        error: errorMock,
      })
    );
  });

  it('should handle auth/SELECT_PATIENT_INIT', () => {
    expect(
      expect(
        authReducer(undefined, actions.selectPatientInitAction('string'))
      ).toEqual(
        Object.assign({}, authInitialState, {
          isSelectingPatient: true,
        })
      )
    );
  });

  it('should handle auth/SELECT_PATIENT_SUCCESS', () => {
    expect(
      expect(
        authReducer(
          undefined,
          actions.selectPatientSuccessAction(patientDataMock)
        )
      ).toEqual(
        Object.assign({}, authInitialState, {
          isSelectingPatient: false,
          patientId: patientDataMock.id,
          patientNickname: patientDataMock.nickname,
        })
      )
    );
  });

  it('should handle auth/SELECT_PATIENT_FAILED', () => {
    expect(
      authReducer(undefined, actions.selectPatientFailedAction(errorMock))
    ).toEqual(
      Object.assign({}, authInitialState, {
        isSelectingPatient: false,
        error: errorMock,
      })
    );
  });

  it('should handle auth/UNSELECT_PATIENT', () => {
    expect(authReducer(undefined, actions.unselectPatientAction())).toEqual(
      Object.assign(
        {},
        {
          ...authInitialState,
          patientId: patientDataMock.id,
          patientNickname: patientDataMock.nickname,
        },
        {
          patientId: null,
          patientNickname: null,
        }
      )
    );
  });

  it('should handle auth/RESET_ERROR', () => {
    expect(
      authReducer(
        { ...authInitialState, error: errorMock },
        actions.resetErrorAction()
      )
    ).toEqual(
      Object.assign({}, authInitialState, {
        error: null,
      })
    );
  });
});
