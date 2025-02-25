import { Box, Text, IconButton, Button } from "@react-native-material/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {name: string, type: string, active: boolean}

export default function FolderShortcat({name, type, active}: Props) {

    return (
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
        <IconButton icon={()=><MaterialIcons name={type as any} style={{
            color: type === 'folder' ? 'rgb(255, 156, 12)' : 'rgb(10, 213, 141);', 
            fontSize: 48,
            zIndex: -1
        }} />} />
        <Text style={{textAlign: 'center', fontSize: 14}}>{name}</Text>
    </Box>)
}