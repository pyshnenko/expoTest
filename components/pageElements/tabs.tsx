import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/(tabs)';
import ExitButton from '../ui/exitButton';
import Login from '@/app/(tabs)/login';
import materialIcon from '@/components/ui/MaterialIcon';
import TabTwoScreen from '@/app/(tabs)/explore';

const Tab = createBottomTabNavigator();

export function LoginTabs() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>  
        <Tab.Screen 
            name="Файлы" 
            component={HomeScreen}
            options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "folder"})
            }}
        />     
        <Tab.Screen 
          name="Выход" 
          component={ExitButton} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "create-new-folder"})
          }}
        /> 
        <Tab.Screen 
          name="Поиск" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "search"})
          }}
        />
        <Tab.Screen 
          name="Загрузить" 
          component={ExitButton} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "upload"})
          }}
        />
        <Tab.Screen 
          name="Параметры" 
          component={ExitButton} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "settings"})
          }}
        />
      </Tab.Navigator>
    )
  }
  
export function GuestsTabs() {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
          name="Войти" 
          component={Login} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "login"})
          }}
        />
        <Tab.Screen 
          name="Регистрация" 
          component={TabTwoScreen} 
          options={{
            tabBarIcon: ({color}) => materialIcon({color, name: "accessibility-new"})
          }}
        />
      </Tab.Navigator>
    )
  }