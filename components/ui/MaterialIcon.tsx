import { IconComponentProvider, Icon, IconComponent } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function loginIcon ({color, name}: {color: string, name: string}) {
    return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons as IconComponent}>
      <Icon name={name} size={24} color={color}/>
    </IconComponentProvider>
    )
  }