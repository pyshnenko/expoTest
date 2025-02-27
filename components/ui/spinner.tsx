import '@/assets/styles/spinner.css'
import { Box, Text } from '@react-native-material/core'

export default function Spinner() {
    return (
        <Box className={'spinner'}>
            <Box className="spinner-circle spinner-circle-outer"></Box>
            <Box className="spinner-circle-off spinner-circle-inner"></Box>
            <Box className="spinner-circle spinner-circle-single-1"></Box>
            <Box className="spinner-circle spinner-circle-single-2"></Box>
            <Text className="text">...Загрузка...</Text>
        </Box>
    )
}