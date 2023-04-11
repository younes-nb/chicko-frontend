export interface User {
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
  createdAt: string,
  updatedAt: string
}
