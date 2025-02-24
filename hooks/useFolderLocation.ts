import Api from "@/components/mech/api";
import { User } from "./useUserAuth";
import { useEffect, useState } from "react";

export interface Data {
    directs: string[],
    files: string[]
}

let folder: React.MutableRefObject<string> | null = null;
let dataState: Data = {
    directs: [],
    files: []
};

let setDataState: (data: Data) => void;

export default function useFolderLocation() {

    useEffect(()=> {
        console.log(dataState)
    }, [dataState])

    async function askApi(str: string = '/') {
        return await Api.askLS(User.getToken(), folder?.current || str)
    }
    
    async function setLocation(str: string) {
        if (folder === null) {
            return null
        }
        else if (folder.current !== str) {
            folder.current = str
            askApi(str)
            .then((res: any)=> {
                console.log('apiRes')
                console.log(res.data)
                setDataState(res.data as Data)
            }).catch((e: any)=> {
                console.log('apicatch')
                console.log(e)
            });
        }
        return folder?.current
    }
    
    function getLocation() {
        return folder?.current
    }
    
    function createLocation(ref: React.MutableRefObject<string>, dataB: Data, setDataB: (data: Data) => void) {
        console.log('createLocationState')
        folder = ref;
        dataState = dataB;
        setDataState = setDataB;
        return folder?.current
    }

    function update() {

    }

    return {
        set: setLocation,
        get: getLocation,
        create: createLocation,
        update,
        data: dataState
    }

}