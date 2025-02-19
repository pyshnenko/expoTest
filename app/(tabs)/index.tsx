import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from "@react-native-material/core";
import { Box, Text } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@/components/mech/storage';

export default function HomeScreen() {
  return (
    <Box style={{backgroundColor: 'aliceblue', height: '100%', display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center'}}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello World</ThemedText>
        <ThemedText type="default">Первое приложение под андроид</ThemedText>
        <Button title="Типа кнопка" onPress={() => alert("🎉🎉🎉")}/>
        <Button title="Storage" onPress={async () => console.log(await storage.get('cloudToken'))}/>
        <Button title="Storage1" onPress={async () => console.log(await storage.get('test'))}/>
        <Button title="Storage2" onPress={async () => console.log(await storage.set('test', '1234'))}/>
        <HelloWave />
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
