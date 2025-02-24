import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, Button } from "@react-native-material/core";
import { useUserAuth } from '@/hooks/useUserAuth';
import { Box, Text } from "@react-native-material/core";
import storage from '../mech/storage';
import useFolderLocation from "@/hooks/useFolderLocation";

export default function ExitButton () {

    const folder = useFolderLocation();

    return (
        <Stack fill center spacing={4}>
            <Text>Уверен что уходишь?</Text>
            <Box style={{display: 'flex', flexDirection:'row'}}>
                <Button style={{width: 100, margin: 4}} color="secondary" title='Нет' leading={props => <Icon name="account-arrow-left-outline" />} onPress={()=>{console.log('return')}} />
                <Button style={{width: 100, margin: 4}} color="pink" title='Да' trailing={props => <Icon name="exit-run" />} onPress={()=>{
                    storage.clear();
                    useUserAuth(false);
                }} />
            </Box>
            <Button title="Storage2" onPress={async () => console.log(await storage.set('test', '1234'))}/>
            <Button title="getFolder" onPress={async () => console.log(folder.get())}/>
        </Stack>
    )
}