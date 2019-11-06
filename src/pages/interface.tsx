import { NavigationScreenProp } from 'react-navigation'

export interface PageProps {
  navigation: NavigationScreenProp<null>;
}

export interface Item<T> {
  item: T;
}

export interface Payload<T> {
  payload: T;
}
