import { IconComponentProvider, Icon, IconComponent } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function loginIcon ({color, name, community}: {color: string, name: string, community?: boolean}) {
    return (
    <IconComponentProvider IconComponent={MaterialIcons as IconComponent}>
      <Icon name={name} size={24} color={color}/>
    </IconComponentProvider>
    )
  }