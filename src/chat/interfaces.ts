//
// Kabelwerk-related interfaces
//

export interface HubInfo {
  id: number;
  name: string;
  users: User[];
}

export interface Inbox {
  search: (query: { query: string }) => Promise<{ items: InboxItem[] }>;
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

export interface Marker {
  messageId: number;
  updatedAt: Date;
  userId: number;
}

export interface Message {
  html: string;
  id: number;
  insertedAt: Date;
  roomId: number;
  text: string;
  type: MessageType;
  updatedAt: Date;
  upload: Upload | null;
  user: User;
}

export enum MessageType {
  Text = 'text',
  RoomMove = 'room_move',
  Image = 'image',
}

export interface Room {
  archive: () => Promise<void>;
  connect: () => void;
  disconnect: () => void;
  getHubUser: () => User;
  getUser: () => User;
  isArchived: () => boolean;
  loadEarlier: () => Promise<{ messages: Message[] }>;
  moveMarker: () => Promise<Marker>;
  on: (event: string, callback: Function) => string;
  postMessage: (params: {
    text?: string;
    uploadId?: number;
  }) => Promise<Message>;
  postUpload: (file: File) => Promise<Upload>;
  unarchive: () => Promise<void>;
  updateHubUser: (hubUserId: number | null) => Promise<void>;
}

export interface Upload {
  id: number;
  mimeType: string;
  name: string;
  original: {
    height: number;
    url: string;
    width: number;
  };
  preview: {
    height: number;
    url: string;
    width: number;
  };
}

export interface User {
  id: number;
  key: string;
  name: string;
}
