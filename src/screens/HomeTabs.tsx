import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CallsScreen from "./callsScreen";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import SettingsScreen from "./SettingScreen";

const Tabs = createBottomTabNavigator();
export default function HomeTabs() {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'chatbubble-ellipses';
                if (route.name === 'Chats') iconName = "chatbubble-ellipses";
                else if (route.name === 'Status') iconName = "time";
                else if (route.name === 'Calls') iconName = "call";
                else if (route.name === 'Settings') iconName = "settings";
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 13 },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
            tabBarStyle:{
                height:90,
                padding:8
            }
        })}>
            <Tabs.Screen name="Status" component={StatusScreen} />
            <Tabs.Screen name="Calls" component={CallsScreen} />
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="Settings" component={SettingsScreen} />
        </Tabs.Navigator>
    );
}


