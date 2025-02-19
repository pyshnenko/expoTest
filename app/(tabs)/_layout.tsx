import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import TabTwoScreen from './explore';
import Login from './login';
import ExitButton from '@/components/ui/exitButton';
import { useUserAuth, createUserAuth } from '@/hooks/useUserAuth';
import { useState, useEffect } from 'react';
import materialIcon from '../../components/ui/MaterialIcon'
import storage from '@/components/mech/storage';
import { TokenLocalData } from '@/constants/types';
import jwt from '@pagopa/io-react-native-jwt';
import { User } from '@/hooks/useUserAuth';
import cookies from '@/components/mech/cookie';
import Api from '@/components/mech/api';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  //storage.clear()

  const [ loginState, setLoginState ] = useState<boolean>(false);

  useEffect(()=>{
      //loading(true, 'start');
      //if (!notVerify&&trig.current) {
          const crypt: string = String(storage.get('cloudAToken'));
          console.log(crypt);
          const saved: string = String(storage.get('cloudToken'));
          console.log(saved);
          let decr: TokenLocalData & {exp: number};
          try {
              decr = jwt.decode(saved, crypt) as TokenLocalData & {exp: number};
              console.log('decr');
              console.log(decr);
              User.setToken(saved, crypt, decr);
              //folder('/', saved);
              cookies.set('token', saved);
              //setDatal(decr.login);
              //alarm('Успешная авторизация', 'info')
          } catch(e: any) {
              //setDatal('токен протух');
              //alarm('Обновим данные', 'info')
              //console.log(e);
              //console.log(e.message);
              if (e){//.message === 'jwt malformed' || e.message === 'jwt expired') {
                  //console.log(e.expiredAt);
                  const date = new Date(e.expiredAt);
                  const days: number = (Number(new Date())- Number(date))/(1000*60*60*24);
                  //console.log(`days: ${days}`);
                  if (days > 5) window.location.href='/login';
                  else {
                      //loading(true, 'tokenUPD');
                      Api.tokenUPD(saved, crypt)
                      .then((res: any)=>{
                          console.log(res);
                          let usData = res.data;
                          const token = res.data.token;
                          const atoken = res.data.atoken;
                          delete(usData.token);
                          delete(usData.atoken);
                          User.setToken(token, atoken, usData);
                          cookies.set('token', token);
                          /*folder('/', token);
                          setDatal(usData.login);
                          loading(false, 'tokenUPD')
                          alarm('Успешная авторизация', 'info')*/
                      })
                      .catch((e: any)=>{
                          console.log(e);
                          User.exit();
                          //alarm('Авторизоваться не удалось', 'warning')
                      });
                      //loading(false, 'start');
                  }
              }
      }
      //loading(false, 'start');
}, [])

  useEffect(()=>{
    console.log('loginState')
    console.log(loginState)
  }, [loginState])

  console.log(storage.get('cloudToken').then((res: any)=>console.log(res)))

  createUserAuth(loginState, setLoginState);

  return (
    <Tab.Navigator>
      {loginState ? <Tab.Screen 
        name="Домой" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({color}) => <IconSymbol size={28} color={color} name='house.fill' />
        }}
      /> :
      <Tab.Screen 
        name="Войти" 
        component={Login} 
        options={{
          tabBarIcon: ({color}) => materialIcon({color, name: "login"})
        }}
      />}
      {loginState ? <Tab.Screen 
        name="Выход" 
        component={ExitButton} 
        options={{
          tabBarIcon: ({color}) => materialIcon({color, name: "exit-run"})
        }}
      /> : <Tab.Screen 
        name="Регистрация" 
        component={TabTwoScreen} 
        options={{
          tabBarIcon: ({color}) => materialIcon({color, name: "account-plus-outline"})
        }}
      />
      }
    </Tab.Navigator>
  )
}

  /*return (
    <Tabs
      screenOptions={{
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          tabBarBadge: 2
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: 'test',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="testPage"
        options={{
          title: 'Test',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
  
  
  */

