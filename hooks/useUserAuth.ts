import {useState, useEffect} from 'react';
import localStorage from '@/components/mech/storage';

let storage = false;
let setStorage: (e: boolean) => void;

export function useUserAuth(props: boolean | null) {
    if ((props) || (props === false))
    {
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
    return stoken;
}

const setToken = (token: string, atoken: string, decr?: any, save: boolean = true) => {

    if (save) {
        localStorage.setItem('cloudToken', token, 'useUserAuth');
        localStorage.setItem('cloudAToken', atoken, 'useUserAuth');
    }
    setStorage(true);
    stoken = token;
    satoken = atoken;
    auth = true;
    if (decr) userData = decr;
}

const exit = () => {
    localStorage.setItem('cloudToken', '', 'useUserAuth');
    localStorage.setItem('cloudAToken', '', 'useUserAuth');
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