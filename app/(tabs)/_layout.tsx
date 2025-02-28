import React, {useState, useEffect, useRef, createContext} from 'react';
import { useUserAuth, createUserAuth } from '@/hooks/useUserAuth';
import { LoginTabs, GuestsTabs } from '@/components/pageElements/tabs';
import {Data} from '@/hooks/useFolderLocation';
import { startAuth } from '@/components/mech/startAuth';
import { saveContext, getContent } from '@/hooks/useFolderLocation';
import { useLoading } from '@/components/pageElements/loading';

const FolderContext = createContext({
  folds: {}, 
  location: '', 
  setLocation: (s: string)=>{}, 
  setData: (d: {directs: string[], files: string[]})=>{}
});

export default function TabLayout() {

  const loading = useLoading;
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
    loading(true, 'updateLocation');
    setData({directs: [], files: []})
    console.log(location);
    getContent(location)
    .then((res: Data | null) => {
      console.log(res)
      if (res !== null) setData(res)
    })
    .catch((e: any) => console.log(e))
    .finally(()=>loading(false, 'updateLocation'))
  }, [location])

  /*async function openLocation(str: string) {
    console.log(await )
  }*/

  createUserAuth(loginState, setLoginState, setData);

  return (
    <FolderContext.Provider value={{folds: data, location: location, setLocation, setData }}>{loginState ? <LoginTabs /> : <GuestsTabs />}</FolderContext.Provider>
  )
}
