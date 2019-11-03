import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Home, navigationOptionsHome } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { SplashScreen } from './pages/SplashScreen'
import { Welcome } from './pages/Welcome'
import { ReadQRCode } from './pages/ReadQRCode'
import { Settings, navigationOptionsSettings } from './pages/Settings'
import { colors } from './style/cores'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { CheckInviteEmail } from './pages/Invite'

const AuthStack = createStackNavigator(
  {
    Login,
    Register,
    Welcome,
    ReadQRCode,
    Invite: CheckInviteEmail
  },
  {
    headerMode: 'none',
    initialRouteName: 'Welcome',
    mode: 'modal'
  }
)

const HomeStack = createStackNavigator(
  {
    Home: {
      navigationOptions: navigationOptionsHome,
      screen: Home
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.vrdesc
      },
      headerTintColor: colors.claro,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
      }
    }
  }
)

const SettingsStack = createStackNavigator(
  {
    Settings: {
      navigationOptions: navigationOptionsSettings,
      screen: Settings
    }
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.vrdesc
      },
      headerTintColor: colors.claro,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
      }
    }
  }
)

const AppTabs = createMaterialTopTabNavigator({
  HomeTab: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  SettingTab: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: 'Settings'
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tabStyle: {
      backgroundColor: colors.vrdmed
    },
    inactiveTintColor: colors.escr,
    activeTintColor: colors.fl
  }
})

const AppNavigator = createSwitchNavigator(
  {
    App: AppTabs,
    Auth: AuthStack,
    SplashScreen
  },
  {
    initialRouteName: 'SplashScreen'
  }
)

export default createAppContainer(AppNavigator)
