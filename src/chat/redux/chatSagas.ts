import {
  put,
  takeEvery,
  select,
  call,
  takeLatest,
  cancelled,
} from 'redux-saga/effects';
import { queryCache } from '../../components/withProviders';
import { getUserDataById } from '../../utils/api';
import {
  addNewMessageToChatRoom,
  AddNewMessageToChatRoom,
  ChatActionTypes,
  clearChatMessages,
  setCurrentChatUser,
  SetCurrentUserActionInit,
  setCurrentUserLoading,
} from './chatActions';
import { ChatRoom, chatRoomsSelector } from './chatReducer';
import { deletedUserData } from './utils';

export function* rootChatSaga() {
  yield takeEvery(
    ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT,
    addMessageToChatRooms
  );
  yield takeLatest(
    ChatActionTypes.SET_CURRENT_CHAT_USER_INIT,
    getCurrentUserData
  );
}

export function* getCurrentUserData({
  user: { id, username },
  refetchMessages,
}: SetCurrentUserActionInit) {
  try {
    if (!id) {
      return;
    }
    yield put(setCurrentUserLoading(true));
    const res = yield call(() => getUserDataById(id));
    yield put(setCurrentChatUser(res.data));
    if (refetchMessages) {
      queryCache.refetchQueries(`messages-${username}`);
    }
  } catch (error) {
    console.log(error);
    yield put(setCurrentChatUser(deletedUserData(id, username)));
  } finally {
    if (cancelled()) {
      yield put(clearChatMessages());
    }
    yield put(setCurrentUserLoading(false));
  }
}

export function* addMessageToChatRooms({ message }: AddNewMessageToChatRoom) {
  try {
    const chatRooms: ChatRoom[] = yield select(chatRoomsSelector);
    const roomIndex = chatRooms.findIndex(
      (room) => room.patient.username === message.room
    );

    if (roomIndex !== -1) {
      yield put(addNewMessageToChatRoom(roomIndex, message));
    } else {
      queryCache.refetchQueries('chatRooms');
      queryCache.refetchQueries('inboxList');
    } 
  } catch (error) {
    console.log(error);
  }
}
