import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout(){
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name="Home" options={{tabBarIcon:()=><FontAwesome size={28} name="home" />}}/>
            <Tabs.Screen name="Chat" options={{tabBarIcon:()=><FontAwesome size={28} name="wechat" />}}/>
            <Tabs.Screen name="Settings" options={{tabBarIcon:()=><FontAwesome size={28} name="cog" />}}/>
        </Tabs>
    )
}