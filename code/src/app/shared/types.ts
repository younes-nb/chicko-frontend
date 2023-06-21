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
  id: string;
  name: string;
  number_of_items: string;
  number_of_categories: string;
  link: string;
}

export interface MenuDetails {
  id: string;
  name: string;
  code: string;
  owner: User;
  is_paid: boolean;
  is_active: boolean;
  categories: Category[];
  telephone: string;
  phone: string;
  address: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  menu: string;
  number_of_items: string;
  menu_items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  is_available: boolean;
  menu: string;
  category: string;
  description?: string;
  price?: string;
  discount?: string;
  image?: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  background_image: string;
  font_family: string;
  menu_background_color: string;
  menu_text_color: string;
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

export interface DialogData {
  title: string;
  label: string;
}

export interface QRCodeDialogData {
  menuName: string;
  menuLink: string;
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
