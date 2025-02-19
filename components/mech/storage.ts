import AsyncStorage from '@react-native-async-storage/async-storage'

const addData = async (key: string, data: string) => {
    console.log('smth add')
    await AsyncStorage.setItem(key, data)
}

const getData = async (key: string) => {
    console.log('smth get')
    return await AsyncStorage.getItem(key)
}

const clearData = () => {
    console.log('clear')
    AsyncStorage.clear();
}

export default {
    set: addData,
    get: getData,
    setItem: addData,
    getItem: getData,
    clear: clearData
}