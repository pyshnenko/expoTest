import ReactNativeBlobUtil from 'react-native-blob-util'
import { User } from '@/hooks/useUserAuth';
import { dataUrl } from './httpserv';

//const { dirs } = ReactNativeBlobUtil.fs;
//const dirToSave = dirs.DownloadDir;

export function download(location: string, name: string) {

    console.log('download 2')

    /*ReactNativeBlobUtil
        .config({
            path: dirToSave + '/' + name
        })
        .fetch('GET', `${dataUrl}${location}${name}`, {
            Authorization: `Bearer ${User.getToken()}`
        })
        .then((res)=>console.log(res))
        .catch((e: any)=>console.log(e))*/

    console.log(`${dataUrl}${location}${name}`)
    /*config(options).fetch('GET', `${dataUrl}${location}${name}?t=${User.getToken()}`)
    .then((res: any)=>{
        console.log(res)
    })
    .catch((e: any)=>console.log(e))*/
}
