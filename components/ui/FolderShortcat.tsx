import { Box, Text, IconButton, Button } from "@react-native-material/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, Dimensions, Image } from "react-native";
import { User } from "@/hooks/useUserAuth";
import { dataUrl } from "../mech/httpserv";

interface Props {name: string, type: string, active: boolean, index: number, doubleClick: (n: number)=> void, longPress: (n: number)=> void, location: string}

export default function FolderShortcat({name, type, active, index, doubleClick, longPress, location}: Props) {

    return (
        
        <TouchableOpacity onPress={()=>doubleClick(index)} onLongPress={()=>longPress(index)}>
            <Box 
                style={{ 
                    width: 100, 
                    padding: 4,
                    height: 100, 
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    backgroundColor: active ? 
                        ('antiquewhite') :
                        ''
                }}
            >
                {FileView(type, name, location)}
                <Text style={{textAlign: 'center', fontSize: 14}} android_hyphenationFrequency="normal">{name}</Text>
            </Box>
        </TouchableOpacity>)
}

function FileView(type: string, name: string, location: string) {
    console.log(location)
    switch (type) {
        case 'image': return (<Box style={{width: 48, height: 48}}>
            <Image 
                style={{zIndex: 3, width: 48, height: 48, backgroundColor: 'aliceblue', borderRadius: 10}} 
                source={{uri: `${dataUrl}${location||'/'}${name}?t=${User.getToken()}`}} />
            <MaterialIcons name='image' style={{
                color: 'rgb(10, 213, 141);', 
                fontSize: 48,
                position: 'relative',
                top: -48,
                left: 0,
                zIndex: 2
            }} />
        </Box>)//`https://cloud.spamigor.ru/data${location||'/'}${name}?t=${User.getToken()}`
        default: return (<MaterialIcons name={type as any} style={{
            color: type === 'folder' ? 'rgb(255, 156, 12)' : 'rgb(10, 213, 141);', 
            fontSize: 48
        }} />)
    }
}