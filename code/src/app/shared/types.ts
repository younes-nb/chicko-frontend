export type MenuItemFormMethod = "post" | "put";
export type SupportChatComponent = 'register' | 'rooms' | 'chat';
type MessageType = 'send' | 'join' | 'leave';


export interface User {
  id: string;
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
  is_active: boolean;
  categories: Category[];
  theme: Theme;
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
  image: string;
  description?: string;
  price?: string;
  discount?: string;
}

export interface Theme {
  id: string;
  name: string;
  font_family?: string;
  menu_background_color?: string;
  menu_text_color?: string;
  logo_image?: string;
  header_color?: string;
  menu_item_background_color?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: PlanItem[];
}

export interface PlanItem {
  id: string;
  name: string;
  description: string;
}

export interface UserPlan {
  id: string;
  user: string;
  plan: Plan;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface Order {
  id: string;
  user_plan: UserPlan;
  payable_amount: string;
  is_paid: boolean;
  authority: string;
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

export interface SingleInputDialogData {
  title: string;
  label: string;
  value?: string;
}

export interface DeleteDialogData {
  name: string;
  isMenu: boolean;
}

export interface QRCodeDialogData {
  menuName: string;
  menuLink: string;
}

export interface ImageDialogData {
  image: string;
}

export interface Message {
  _id: string;
  room_id: string;
  user_id: string;
  message: string;
  type: MessageType;
  time: Date;
  isFirst: boolean;
  isCurrentUser: boolean;
  showDate: boolean;
}
