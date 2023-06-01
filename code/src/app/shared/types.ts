export type SupportChatComponent = 'register' | 'rooms' | 'chat'

export interface User {
  id: string,
  username: string,
  email: string,
  phone_number: string
}

export interface ChatUser {
  _id: string,
  email: string,
  active: boolean,
  name?: string
}

export interface Room {
  _id: string,
  title: string,
  users: string[],
  createdAt: Date
}

export interface RoomDialogData {
  title: string,
  label: string
}

export interface Message {
  _id: string,
  room_id: string,
  user_id: string,
  message: string,
  type: string,
  time: Date,
  isFirst: boolean,
  isCurrentUser: boolean,
  showDate: boolean
}
