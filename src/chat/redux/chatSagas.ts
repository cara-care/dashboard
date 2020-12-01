import { put, takeEvery, select } from 'redux-saga/effects';
import { queryCache } from '../../components/withProviders';
import {
  addNewMessageToChatRoom,
  AddNewMessageToChatRoom,
  ChatActionTypes,
} from './chatActions';
import { ChatRoom, chatRoomsSelector } from './chatReducer';

export function* rootChatSaga() {
  yield takeEvery(
    ChatActionTypes.ADD_NEW_MESSAGE_TO_CHAT_ROOM_INIT,
    addMessageToChatRooms
  );
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
      // 1) fetch new Room and add to State, we need endpoint from backend
      // /dashboard/chat/rooms/<user_id: int> - which accepts backendID

      // - or refetch all Rooms (temporary)
      queryCache.refetchQueries('chatRooms');
    }
  } catch (error) {
    console.log(error);
  }
}
