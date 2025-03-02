import Ionicons from "@expo/vector-icons/Ionicons";
import { View,StyleSheet,ActivityIndicator } from "react-native";
import { LoadingState } from "@/state/store";

export default function SendIconCustom() {
    const DisplayMode = LoadingState.useState(s=>{return s.isLoaded})
    if (DisplayMode) {
        return(
            <Ionicons name="send-sharp" size={36} />
        )
    } else{
        return(
            <ActivityIndicator size={"large"} color={"black"}/>   
        )
        
    }



}
const styles = StyleSheet.create({

})