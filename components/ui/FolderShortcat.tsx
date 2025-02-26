import { Box, Text, IconButton, Button } from "@react-native-material/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, Dimensions, Image } from "react-native";
import { User } from "@/hooks/useUserAuth";

interface Props {name: string, type: string, active: boolean, index: number, doubleClick: (n: number)=> void, longPress: (n: number)=> void, location: string}

export default function FolderShortcat({name, type, active, index, doubleClick, longPress, location}: Props) {

    return (
        
        <TouchableOpacity onPress={()=>doubleClick(index)} onLongPress={()=>longPress(index)}>
            <Box 
                style={{ 
                    width: 100, 
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
                <Text style={{textAlign: 'center', fontSize: 14}}>{name}</Text>
            </Box>
        </TouchableOpacity>)
}

function FileView(type: string, name: string, location: string) {
    switch (type) {
        case 'image': return (<Image src={`https://cloud.spamigor.ru/data${location||'/'}${name}?t=${User.getToken()}`} />)
        default: return (<MaterialIcons name={type as any} style={{
            color: type === 'folder' ? 'rgb(255, 156, 12)' : 'rgb(10, 213, 141);', 
            fontSize: 48
        }} />)
    }
}