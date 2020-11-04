import { takeLatest, select, put, call } from 'redux-saga/effects';
import { getChatroomsPage } from './chatReducer';
import {
  ChatActionTypes,
  fetchChatRoomsPageFailed,
  fetchChatRoomsPageSuccess,
} from './chatActions';
import { getChatRooms } from '../utils/api';

export function* rootChatSaga() {
  yield takeLatest(
    ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_INIT,
    fetchChatRoomsSaga
  );
}

export function* fetchChatRoomsSaga() {
  const currentPage = yield select(getChatroomsPage);
  const limit = 100;
  const offset = currentPage * limit;

  if (currentPage !== null) {
    try {
      const res = yield call(() => getChatRooms({ limit, offset }));
      yield put(
        fetchChatRoomsPageSuccess({
          next: res.data.next ? currentPage + 1 : null,
          rooms: res.data.results,
        })
      );
    } catch {
      yield put(fetchChatRoomsPageFailed());
    }
  } else {
    yield put(fetchChatRoomsPageFailed());
  }
}
