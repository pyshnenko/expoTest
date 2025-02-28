import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, Button } from "@react-native-material/core";
import { useUserAuth, User } from '@/hooks/useUserAuth';
import { Box, Text } from "@react-native-material/core";
import storage from '../mech/storage';

export default function ExitButton () {

    return (
        <Stack fill center spacing={4}>
            <Text>Уверен что уходишь?</Text>
            <Box style={{display: 'flex', flexDirection:'row'}}>
                <Button 
                    style={{width: 100, margin: 4}} 
                    color="secondary" 
                    title='Нет' 
                    leading={props => <Icon name="account-arrow-left-outline" />} 
                    onPress={()=>{console.log('return')}} />
                <Button 
                    style={{width: 100, margin: 4}} 
                    color="pink" 
                    title='Да' 
                    trailing={props => <Icon name="exit-run" />} 
                    onPress={()=>{
                        storage.clear();
                        User.exit();
                }} />
            </Box>
        </Stack>
    )
}