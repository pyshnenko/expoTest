import { useEffect, useState, useRef } from "react";
import { Data } from "@/hooks/useFolderLocation";
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import FolderShortcat from "../ui/FolderShortcat";
import { TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useLoading } from '@/components/pageElements/loading';
import { getContent } from '@/hooks/useFolderLocation';
import ElementMenue from '@/components/pageElements/elementMenue';

const windowDimensions = Dimensions.get('window');

const loading = useLoading;

export default function FilesList({folds, location, setLocation, setData}: {folds: Data, location: string, setLocation: (str: string) => void, setData: (data: Data)=>void }) {
    const [ pos, setPos ] = useState<number>(-3);
    const [width, setWidth] = useState(windowDimensions);
    const [ open, setOpen ] = useState(true)

    useEffect(()=>{
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setWidth(window);
            },
        );
        return () => subscription?.remove();
    })

    useEffect(()=>{
        console.log(width.width%100)
        console.log(`width: ${width.width - (width.width%100)}`)
    }, [width])

    const nameToType = (str: string) => {
        const extArr: string [] = str.split('.')
        const ext: string = extArr[extArr.length-1];
        //console.log(ext)
        switch (ext) { 
            case 'txt': return 'text-snippet'
            case 'rar': return 'archive'
            case 'zip': return 'archive'
            case 'pdf': return 'picture-as-pdf'
            case 'doc': return 'edit-document'
            case 'docx': return 'edit-document'
            case 'png': return 'image'
            case 'jpg': return 'image'
            case 'jpeg': return 'image'
            case 'ico': return 'image'
            default: return "insert-drive-file"
        }
    }

    let lastTap = useRef(0);
    const doubleClick = (index: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 1000;
        if ((now - lastTap.current) < DOUBLE_PRESS_DELAY) {
            setPos(-2)
            if ((index >= 0)&&(index < folds.directs.length)) {
                const objName: string = folds.directs[index]
                setLocation((location||'/') + objName + '/')
            }
            else if (index === -1) {
                let buf: string[] = location.split('/')
                let newAddr: string = '/'
                for (let i = 1; i < buf.length-2; i++ ) newAddr += buf[i]+'/'
                setLocation(newAddr);
            }
            else if (index === -2) {
                loading(true, 'indexUpdate');
                getContent(location)
                .then((res: Data | null) => {
                    console.log(res)
                    if (res !== null) setData(res)
                })
                .catch((e: any) => console.log(e))
                .finally(()=>loading(false, 'indexUpdate'))
            }
        } else {
            setPos(index)
            lastTap.current = now;
        }
    }

    const longPress = (index: number) => {
        console.log(index)
        setOpen(true)
    }
    return (
        <Box style={{width: '100%', minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {open&&<ElementMenue open={open} setOpen={setOpen} />}
            <ScrollView>
                <Box style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', maxWidth: width.width - (width.width%100)}}>
                    <FolderShortcat 
                        name={'Обновить'} 
                        type="update"
                        active={false}
                        index={-2}
                        doubleClick={doubleClick}
                        longPress={longPress}
                        location={''}
                    />
                    {location !== '/' && 
                        <FolderShortcat 
                            name={'Назад'} 
                            type="arrow-back"
                            active={false}
                            index={-1}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            location={''}
                    />}
                    {folds.directs.map((item: string, index: number) => { return (
                        <FolderShortcat 
                            name={item} 
                            key={`folds-${index}`}
                            type="folder"
                            active={index === pos}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            index={index}
                            location={location}
                        />
                    )})}
                    {folds.files.map((item: string, index: number) => { return (
                        <FolderShortcat 
                            key={`files-${index}`}
                            doubleClick={doubleClick}
                            longPress={longPress}
                            index={index + folds.directs.length}
                            name={item} 
                            type={nameToType(item)}
                            active={index === (pos - folds.directs.length)}
                            location={location}
                        />
                    )})}
                </Box>
            </ScrollView>
        </Box>
    )
}