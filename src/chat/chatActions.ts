export enum ChatActionTypes {
  FETCH_CHAT_ROOMS_PAGE_INIT = 'chat/FETCH_CHAT_ROOMS_PAGE_INIT',
  FETCH_CHAT_ROOMS_PAGE_SUCCESS = 'chat/FETCH_CHAT_ROOMS_PAGE_SUCCESS',
  FETCH_CHAT_ROOMS_PAGE_FAILED = 'chat/FETCH_CHAT_ROOMS_PAGE_FAILED',
}

export interface FetchChatRoomsPageInit {
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_INIT;
  page: number;
}

export const fetchChatRoomsPageInit = (
  page: number
): FetchChatRoomsPageInit => ({
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_INIT,
  page,
});

export interface FetchChatRoomsPageSuccess {
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_SUCCESS;
  next: number | null;
  // TODO: typing
  rooms: any[];
}

export const fetchChatRoomsPageSuccess = ({
  next,
  rooms,
}: {
  next: number | null;
  rooms: any[];
}): FetchChatRoomsPageSuccess => ({
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_SUCCESS,
  next,
  rooms,
});

export interface FetchChatRoomsPageFailed {
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_FAILED;
}

export const fetchChatRoomsPageFailed = (): FetchChatRoomsPageFailed => ({
  type: ChatActionTypes.FETCH_CHAT_ROOMS_PAGE_FAILED,
});

export type ChatActions =
  | FetchChatRoomsPageInit
  | FetchChatRoomsPageSuccess
  | FetchChatRoomsPageFailed;
