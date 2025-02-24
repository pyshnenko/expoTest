import {useState, useEffect} from 'react';
import localStorage from '@/components/mech/storage';

let storage = false;
let setStorage: (e: boolean) => void;

export function useUserAuth(props: boolean | null) {
    console.log(props)
    console.log('useUserAuth')
    if ((props) || (props === false))
    {
        console.log(props)
        setStorage(props)
    }
    return storage
}

export function createUserAuth(state: boolean, setState: (e: boolean) => void) {
    setStorage = setState;
    storage = state;
}

let stoken: string;
let satoken: string;
let auth = false;
export let userData: any;

const getAuth = () => {
    return auth;
}

const getToken = () => {
    console.log(stoken)
    return stoken;
}

const setToken = (token: string, atoken: string, decr?: any, save: boolean = true) => {

    if (save) {
        localStorage.setItem('cloudToken', token);
        localStorage.setItem('cloudAToken', atoken);
    }
    console.log('token useUserAuth set')
    setStorage(true);
    console.log(token)
    stoken = token;
    satoken = atoken;
    auth = true;
    if (decr) userData = decr;
}

const exit = () => {
    localStorage.setItem('cloudToken', '');
    localStorage.setItem('cloudAToken', '');
    setStorage(false);
    stoken = '';
    satoken = '';
    auth = false;
}

export const User = {
    getAuth,
    getToken,
    setToken,
    exit
}