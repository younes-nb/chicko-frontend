import {Menu, MenuDetails, User} from "../../../shared/types";


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
  telephone: '',
  phone: '',
  address: '',
  link: '',
}
