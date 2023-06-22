import {Menu, MenuDetails, Theme, User} from "../../../shared/types";


export interface MenusState {
  menus: Menu[];
}

export const menusInitialState: MenusState = {
  menus: [{
    id: '',
    name: '',
    number_of_categories: '',
    number_of_items: '',
    link: ''
  }]
};

export const menuDetailsInitialState: MenuDetails = {
  id: '',
  name: '',
  code: '',
  owner: {} as User,
  is_paid: false,
  is_active: false,
  categories: [],
  theme: {} as Theme,
  telephone: '',
  phone: '',
  address: '',
  link: '',
}
