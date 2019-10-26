import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Home, navigationOptionsHome } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { SplashScreen } from './pages/SplashScreen'
import { Welcome } from './pages/Welcome'
import { Settings, navigationOptionsSettings } from './pages/Settings'

const AuthStack = createStackNavigator(
  {
    Login,
    Register,
    Welcome
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome',
    mode: 'modal'
  }
)

const AppStack = createStackNavigator(
  {
    Home: {
      navigationOptions: navigationOptionsHome,
      screen: Home
    },
    Settings: {
      navigationOptions: navigationOptionsSettings,
      screen: Settings
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#6a51ae'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    SplashScreen
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export default createAppContainer(AppNavigator)
