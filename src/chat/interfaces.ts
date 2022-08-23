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
  connect: () => void;
  disconnect: () => void;
  loadMore: () => Promise<{ items: InboxItem[] }>;
  on: (event: string, callback: Function) => string;
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
  archive: () => Promise<void>;
  connect: () => void;
  disconnect: () => void;
  getHubUser: () => User;
  getUser: () => User;
  isArchived: () => boolean;
  loadEarlier: () => Promise<{ messages: Message[] }>;
  moveMarker: () => Promise<any>;
  on: (event: string, callback: Function) => string;
  postMessage: (message: { text: string }) => Promise<Message>;
  unarchive: () => Promise<void>;
  updateHubUser: (userId: number | null) => Promise<void>;
}

export enum MessageType {
  Text = 'text',
  RoomMove = 'room_move',
  Image = 'image',
}

export interface Message {
  html: string;
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
  type: MessageType;
  updatedAt: Date;
  user: User;
}

export interface Marker {
  messageId: number;
  updatedAt: Date;
  userId: number;
}
