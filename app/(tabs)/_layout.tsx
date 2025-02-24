import React from 'react';
import { useUserAuth, createUserAuth } from '@/hooks/useUserAuth';
import { useState, useEffect, useRef } from 'react';
import storage from '@/components/mech/storage';
import { TokenLocalData } from '@/constants/types';
import jwt from 'react-jwt';
import { User } from '@/hooks/useUserAuth';
import Api from '@/components/mech/api';
import { LoginTabs, GuestsTabs } from '@/components/pageElements/tabs';
import useFolderLocation, {Data} from '@/hooks/useFolderLocation';

export default function TabLayout() {
  //storage.clear()
  console.log('hello')
  const [ loginState, setLoginState ] = useState<boolean>(false);
  const [ data, setData ] = useState<Data>({directs: [], files: []});

  let folderRef: React.MutableRefObject<string> = useRef('/');

  const folder = useFolderLocation();

  useEffect(() => {
      //loading(true, 'start');
      //if (!notVerify&&trig.current) {
          const crypt: string = String(storage.get('cloudAToken'));
          console.log('crypt');
          console.log(crypt);
          const saved: string = String(storage.get('cloudToken'));
          console.log(saved);
          let decr: TokenLocalData & {exp: number};
          folder.create(folderRef, data, setData);
          try {
              decr = jwt.decodeToken(saved) as TokenLocalData & {exp: number};
              console.log('decr');
              console.log(decr);
              User.setToken(saved, crypt, decr);
              //folder('/', saved);
              //cookie.set('token', saved);
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
                          console.log('tokenUPD');
                          let usData = res.data;
                          const token = res.data.token;
                          const atoken = res.data.atoken;
                          delete(usData.token);
                          delete(usData.atoken);
                          User.setToken(token, atoken, usData);
                          //cookie.set('token', token);
                          //folder('/', token);
                          //setDatal(usData.login);
                          //loading(false, 'tokenUPD')
                          //alarm('Успешная авторизация', 'info')
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

  useEffect(()=> {
    console.log('layout use effect')
    console.log(data)
  }, [data])

  console.log(storage.get('cloudToken').then((res: any)=>console.log(res)))

  createUserAuth(loginState, setLoginState);

  return (
    <>{loginState ? <LoginTabs /> : <GuestsTabs />}</>
  )
}
