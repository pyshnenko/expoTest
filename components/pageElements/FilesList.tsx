import { useState } from "react";
import { Data } from "@/hooks/useFolderLocation";
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import FolderShortcat from "../ui/FolderShortcat";
import { TouchableOpacity } from "react-native";

export default function FilesList({folds, location, setLocation}: {folds: Data, location: string, setLocation: (str: string) => void}) {
    const [ pos, setPos ] = useState<number>(-2);

    let lastTap = 0;
    const doubleClick = (index: number) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            setPos(-2)
            if ((index !== -1)&&(index < folds.directs.length)) {
                const objName: string = folds.files[index]
                setLocation(location + objName + '/')
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
            lastTap = now;
        }
    }

    const longPress = (index: number) => {
        console.log(index)
    }
    return (
        <Box style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {location !== '/' && <TouchableOpacity onPress={()=>doubleClick(-1)}>
                    <FolderShortcat 
                        name={'Назад'} 
                        type="arrow-back"
                        active={false}
                    />
                </TouchableOpacity>}
            {folds.directs.map((item: string, index: number) => { return (
                <TouchableOpacity key={`folds-${index}`} onPress={()=>doubleClick(index)} onLongPress={()=>longPress(index)}>
                    <FolderShortcat 
                        name={item} 
                        type="folder"
                        active={index === pos}
                    />
                </TouchableOpacity>
            )})}
            {folds.files.map((item: string, index: number) => { return (
                <TouchableOpacity 
                    key={`files-${index}`} 
                    onPress={()=>doubleClick(index + folds.directs.length)} 
                    onLongPress={()=>longPress(index + folds.directs.length)}
                >
                    <FolderShortcat 
                        name={item} 
                        type="insert-drive-file"
                        active={index === (pos - folds.directs.length)}
                    />
                </TouchableOpacity>
            )})}
        </Box>
    )
}