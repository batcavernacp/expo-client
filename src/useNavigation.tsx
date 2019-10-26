import { NavigationScreenProp } from 'react-navigation'

let navigation: NavigationScreenProp<null>

export const setNavigation = ref => (navigation = ref._navigation)

const useNavigation = () => navigation

export default useNavigation
