import React, {useState, useEffect, useRef, createContext} from 'react';
import { useUserAuth, createUserAuth } from '@/hooks/useUserAuth';
import { LoginTabs, GuestsTabs } from '@/components/pageElements/tabs';
import {Data} from '@/hooks/useFolderLocation';
import { startAuth } from '@/components/mech/startAuth';
import { saveContext, getContent } from '@/hooks/useFolderLocation';

const FolderContext = createContext({folds: {}, location: '', setLocation: (s: string)=>{} });

export default function TabLayout() {
  console.log('\n\n\nhello\n\n\n')
  const [ loginState, setLoginState ] = useState<boolean>(false);
  const [ data, setData ] = useState<Data>({directs: [], files: []});
  const [ location, setLocation ] = useState<string>('');

  saveContext(FolderContext);

  useEffect(() => {
    console.log('tablayout useeffect')
    startAuth(setLocation)
  }, [])

  useEffect(()=>{
    console.log('loginState')
    console.log(loginState)
  }, [loginState])

  useEffect(()=> {
    console.log('layout use effect')
    console.log(data)
  }, [data])

  useEffect(()=>{
    console.log('layout use effect location')
    console.log(location);
    getContent(location)
    .then((res: Data | null) => {
      console.log(res)
      if (res !== null) setData(res)
    })
  }, [location])

  /*async function openLocation(str: string) {
    console.log(await )
  }*/

  createUserAuth(loginState, setLoginState);

  return (
    <FolderContext.Provider value={{folds: data, location: location, setLocation }}>{loginState ? <LoginTabs /> : <GuestsTabs />}</FolderContext.Provider>
  )
}
