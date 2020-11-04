import { Reducer } from 'redux';
import { ChatActions, ChatActionTypes } from './chatActions';
import { RootState } from '../utils/store';

export enum RoomsStatues {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  ERROR = 'ERROR',
}

export interface ChatState {
  readonly rooms: any[];
  readonly roomsPage: number | null;
  readonly roomsStatus: RoomsStatues;
}

export const chatInitialState = {
  rooms: [],
  roomsPage: 0,
  roomsStatus: RoomsStatues.IDLE,
};

export const chatReducer: Reducer<ChatState, ChatActions> = (
  state = chatInitialState,
  action
) => {
  switch (action.type) {
    case ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_INIT:
      return { ...state, roomsStatus: RoomsStatues.FETCHING };
    case ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_SUCCESS:
      return {
        ...state,
        roomsStatus: action.next ? RoomsStatues.FETCHING : RoomsStatues.IDLE,
        roomsPage: action.next,
        rooms: state.rooms.concat(action.rooms),
      };
    case ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_FAILED:
      return { ...state, roomsStatus: RoomsStatues.ERROR };
    default:
      return state;
  }
};

export const getChatroomsPage = (state: RootState) => state.chat.roomsPage;

export const getChatRoomsStatus = (state: RootState) => state.chat.roomsStatus;

export const getChatRooms = (state: RootState) => state.chat.rooms;
