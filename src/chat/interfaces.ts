//
// Kabelwerk-related interfaces
//

export interface HubInfo {
  id: number;
  name: string;
  users: User[];
}

export interface User {
  id: number;
  key: string;
  name: string;
}

//
// inboxes
//

export interface Inbox {
  loadMore: () => Promise<{ items: InboxItem[] }>;
}

export interface InboxItem {
  room: {
    archived: boolean;
    assignedTo: number | null;
    attributes: any;
    id: number;
    user: User;
  };
  message: Message | null;
  isNew: boolean;
}

//
// rooms and messages
//

export interface Room {
  loadEarlier: () => Promise<{ messages: Message[] }>;
  isArchived: () => boolean;
  postMessage: (message: { text: string }) => Promise<Message>;
  off: () => void;
  archive: () => Promise<void>;
  unarchive: () => Promise<void>;
  getUser: () => User;
  updateHubUser: (userId: number | null) => Promise<void>;
  getHubUser: () => User;
}

export enum MessageType {
  Text = 'text',
  RoomMove = 'room_move',
}

export interface Message {
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
  type: MessageType;
  updatedAt: Date;
  user: User | null;
}
