import { TokenLocalData } from "@/constants/types";
import storage from "./storage";
import { getContent } from "@/hooks/useFolderLocation";
import { Data } from "@/hooks/useFolderLocation";
import jwt from 'react-jwt';
import { User } from "@/hooks/useUserAuth";
import Api from "./api";
import { useLoading } from "../pageElements/loading";

export async function startAuth(setLocation: (s: string)=>void) {
    const loading = useLoading;
    const crypt: string | null = (await storage.get('cloudAToken'));
    const saved: string | null = (await storage.get('cloudToken'));
    let decr: TokenLocalData & {exp: number};
    loading(true, 'startFuth');
    if ((saved)&&(crypt)) {
        try {
            decr = jwt.decodeToken(saved) as TokenLocalData & {exp: number};
            let updToken = await Api.tokenUPD(saved, crypt);
            if (updToken.status === 200) {
                storage.set('cloudAToken', String(updToken.data.atoken), 'updAToken startAuth')
                storage.set('cloudToken', String(updToken.data.token), 'updToken startAuth')
                User.setToken(String(updToken.data.token), String(updToken.data.atoken), decr);
                setLocation('/')
                //window.location.href='/Файлы';
            }
        } catch(e: any) {
            if (e){
                User.exit();
                //window.location.href='/Войти';
            }
        }
    }
    else {
        User.exit();
        //window.location.href='/Войти';
    }
    loading(false, 'startFuth');
}