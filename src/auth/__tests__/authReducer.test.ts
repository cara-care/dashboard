import {
  authReducer,
  authInitialState,
  AuthStatus,
  isAuthenticating,
  isAuthenticated,
  getPatientId,
  hasPatientId,
  isSelectingPatient,
  hasError,
  getPatientNickname,
  getPatientTimezone,
  getPatientEnrolledPrograms,
  EnrolledProgram,
} from '../authReducer';
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
          patientTimezone: patientDataMock.timezone,
          patientEnrolledPrograms: patientDataMock.enrolledProgrammes,
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

  it('should handle auth/TRY_AUTO_LOGIN_FAILED', () => {
    expect(
      authReducer(
        { ...authInitialState, status: AuthStatus.FETCHING },
        actions.tryAutoLoginFailedAction()
      )
    ).toEqual(authInitialState);
  });

  it('should handle auth/LOGOUT_SUCCESS', () => {
    expect(
      authReducer(
        { ...authInitialState, status: AuthStatus.FETCHING },
        actions.logoutSuccessAction()
      )
    ).toEqual(authInitialState);
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

  it('[isAuthenticating] selector - returns false if not fetching', () => {
    const state = { auth: { status: AuthStatus.IDLE } };
    // @ts-ignore
    expect(isAuthenticating(state)).toBe(false);
    // @ts-ignore
    expect(isAuthenticated(state)).toBe(false);
  });

  it('[isAuthenticating] selector - returns true if fetching', () => {
    const state = { auth: { status: AuthStatus.FETCHING } };
    // @ts-ignore
    expect(isAuthenticating(state)).toBe(true);
    // @ts-ignore
    expect(isAuthenticated(state)).toBe(false);
  });

  it('[isAuthenticated] selector - returns true if nutritionist is authenticated', () => {
    const state = { auth: { status: AuthStatus.AUTHENTICATED } };
    // @ts-ignore
    expect(isAuthenticating(state)).toBe(false);
    // @ts-ignore
    expect(isAuthenticated(state)).toBe(true);
  });

  it('[isAuthenticated] selector - returns false if nutritionist is not authenticated', () => {
    const state = { auth: { status: AuthStatus.ERROR } };
    // @ts-ignore
    expect(isAuthenticated(state)).toBe(false);
    // @ts-ignore
    expect(isAuthenticating(state)).toBe(false);
  });

  it('[hasPatientId] selector - returns true if patientId is truthy', () => {
    const state = { auth: { patientId: 1 } };
    // @ts-ignore
    expect(getPatientId(state)).toBe(1);
    // @ts-ignore
    expect(hasPatientId(state)).toBe(true);
  });

  it('[hasPatientId] selector - returns false if patientId is falsy', () => {
    const state = { auth: { patientId: null } };
    // @ts-ignore
    expect(getPatientId(state)).toBe(null);
    // @ts-ignore
    expect(hasPatientId(state)).toBe(false);
  });

  it('[isSelectingPatient] selector - returns isSelectingPatient from auth state', () => {
    // @ts-ignore
    expect(isSelectingPatient({ auth: { isSelectingPatient: false } })).toBe(
      false
    );
    // @ts-ignore
    expect(isSelectingPatient({ auth: { isSelectingPatient: true } })).toBe(
      true
    );
  });

  it('[hasError] selector - returns true if error has a truthy value', () => {
    // @ts-ignore
    expect(hasError({ auth: { error: Error('err') } })).toBe(true);
  });

  it('[hasError] selector - returns false if error has a falsy value', () => {
    // @ts-ignore
    expect(hasError({ auth: { error: null } })).toBe(false);
  });

  it('[getPatientNickname] selector - returns patientNickname from auth state', () => {
    const nickname = 'tester';
    // @ts-ignore
    expect(getPatientNickname({ auth: { patientNickname: nickname } })).toBe(
      nickname
    );
  });

  it('[getPatientTimezone] selector - returns patientTimezone from auth state', () => {
    const timezone = 'Europe/Berlin';
    // @ts-ignore
    expect(getPatientTimezone({ auth: { patientTimezone: timezone } })).toBe(
      timezone
    );
  });

  it('[getPatientEnrolledPrograms] selector - returns patientEnrolledPrograms from auth state', () => {
    const enrolledPrograms: EnrolledProgram[] = [
      {
        id: 1,
        type: 'programme',
        title: 'Title',
        image: '',
        duration: '12 weeks',
        started: '',
        video: '',
        videoDuration: 0,
        videoCaptions: '',
      },
    ];
    expect(
      getPatientEnrolledPrograms({
        // @ts-ignore
        auth: { patientEnrolledPrograms: enrolledPrograms },
      })
    ).toBe(enrolledPrograms);
  });
});
