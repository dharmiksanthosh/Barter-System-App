import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SideBarMenu from './SideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home:{screen:AppTabNavigator},
    },
    {
        contentComponent:SideBarMenu
    },
    {
        initialRouteName:'Home'
    }
)