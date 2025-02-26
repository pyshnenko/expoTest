import { useEffect, useState } from "react";
import { Data } from "@/hooks/useFolderLocation";
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import FolderShortcat from "../ui/FolderShortcat";
import { TouchableOpacity, Dimensions } from "react-native";

const windowDimensions = Dimensions.get('window');

export default function FilesList({folds, location, setLocation}: {folds: Data, location: string, setLocation: (str: string) => void}) {
    const [ pos, setPos ] = useState<number>(-2);
    const [width, setWidth] = useState(windowDimensions);

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
        console.log(ext)
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

    let lastTap = 0;
    const doubleClick = (index: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 400;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            setPos(-2)
            if ((index !== -1)&&(index < folds.directs.length)) {
                const objName: string = folds.directs[index]
                setLocation((location||'/') + objName + '/')
            }
            else if (index === -1) {
                let buf: string[] = location.split('/')
                console.log(buf);
                let newAddr: string = '/'
                for (let i = 1; i < buf.length-2; i++ ) newAddr += buf[i]+'/'
                console.log(newAddr);
                setLocation(newAddr);
            }
            console.log(location)
        } else {
            setPos(index)
            console.log(folds.directs[index])
            lastTap = now;
        }
    }

    const longPress = (index: number) => {
        console.log(index)
    }
    return (
        <Box style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', maxWidth: width.width - (width.width%100)}}>
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
    )
}