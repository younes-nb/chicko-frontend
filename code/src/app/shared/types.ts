export type SupportChatComponent = 'register' | 'rooms' | 'chat';

export interface User {
  username: string;
  email: string;
  phone_number: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
}

export interface Menu {
  name: string;
  number_of_items: string;
  number_of_categories: string;
}

export interface ChatUser {
  _id: string;
  email: string;
  active: boolean;
  name?: string;
}

export interface Room {
  _id: string;
  title: string;
  users: string[];
  createdAt: Date;
}

export interface RoomDialogData {
  title: string;
  label: string;
}

export interface Message {
  _id: string;
  room_id: string;
  user_id: string;
  message: string;
  type: string;
  time: Date;
  isFirst: boolean;
  isCurrentUser: boolean;
  showDate: boolean;
}
