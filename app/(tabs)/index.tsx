import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@/components/mech/storage';
import Api from '@/components/mech/api';
import useFolderLocation, {Data} from '@/hooks/useFolderLocation';
import { useEffect } from 'react';
//import cookie from '@/components/mech/cookie';

export default function HomeScreen() {

  const useFolder = useFolderLocation();
  const data: Data = useFolder.data;

  useEffect(()=>{
    console.log('index Use Effect')
    console.log(data)
  }, [data])

  return (
    <Box style={{
      backgroundColor: 'aliceblue', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 15
    }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World</ThemedText>
        <ThemedText type="default">Первое приложение под андроид</ThemedText>
        <Button title="Типа кнопка" onPress={() => alert("🎉🎉🎉")}/>
        <Button title="Storage" onPress={async () => console.log(await storage.get('cloudToken'))}/>
        <Button title="Folder" onPress={async () => console.log(useFolder.get())}/>
        <Button title="setFolder" onPress={async () => console.log(useFolder.set('/test'))}/>
        <Button title="setFolder/" onPress={async () => console.log(useFolder.set('/'))}/>
      </ThemedView>
      <Text>Тут типа описание</Text>
      <Image 
        style={{}}
        source={require('../../assets/images/spamigorLogo.png')} />
    </Box>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'aliceblue',
    marginTop: 25
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
