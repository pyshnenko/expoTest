import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import storage from '@/components/mech/storage';
import Api from '@/components/mech/api';
import {Data, FolderContext} from '@/hooks/useFolderLocation';
import { useEffect, useContext } from 'react';
import FilesList from '@/components/pageElements/FilesList';
//import cookie from '@/components/mech/cookie';

export default function HomeScreen() {

  let data: {folds: Data, location: string, setLocation: (str: string) => void} = useContext(FolderContext);

  return (
    <Box style={{
      backgroundColor: 'aliceblue', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 35
    }}>
      <Text>{data.location}</Text>
      <FilesList folds={data.folds} location={data.location} setLocation={data.setLocation} />
    </Box>
  );
}

/*
      <Image 
        source={require('../../assets/images/spamigorLogo.png')} />*/
/*
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World</ThemedText>
        <ThemedText type="default">Первое приложение под андроид</ThemedText>
        <Button title="Типа кнопка" onPress={() => alert("🎉🎉🎉")}/>
        <Button title="Storage" onPress={async () => console.log(await storage.get('cloudToken'))}/>
        <Button title="Folder" onPress={async () => console.log(data.location)}/>
        <Button title="setFolder" onPress={async () => console.log(data.setLocation('/test'))}/>
        <Button title="setFolder/" onPress={async () => console.log(data.setLocation('/'))}/>
        <Button title="clear" onPress={async () => console.log(await storage.clear())}/>
      </ThemedView>
      */

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
