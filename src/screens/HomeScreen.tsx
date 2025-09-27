import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const chats = [
    {
        id: 1,
        name: "Sahan Perera",
        lastMessage: "Hello Kamal",
        time: "9.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_1.png")
    },
    {
        id: 2,
        name: "Kusal Perera",
        lastMessage: "Hello Kamal",
        time: "9.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_2.png")
    },
    {
        id: 3,
        name: "Saman Perera",
        lastMessage: "Hello Kamal",
        time: "9.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_3.png")
    },
    {
        id: 4,
        name: "Amila",
        lastMessage: "Hello buddy..how aree youu..im fine ...Wht r you doing bay",
        time: "10.00 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_4.png")
    },
    {
        id: 5,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    },
    {
        id: 6,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    },
    {
        id: 7,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    },
    {
        id: 8,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    },
    {
        id: 9,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    },
    {
        id: 10,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    }, {
        id: 11,
        name: "Suresh",
        lastMessage: "Go your lane",
        time: "10.46 p.m",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png")
    }
]

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenProps>();
    const [search, setSearch] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "ChatApp",
            headerTitleStyle: { fontWeight: "bold" },
            headerRight: () => (
                <View className="flex-row space-x-4">
                    <TouchableOpacity>
                        <Ionicons name="camera" size={26} color="black" />
                    </TouchableOpacity>


                    <TouchableOpacity className="ml-10">
                        <Ionicons name="ellipsis-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )

        });
    }, [navigation]);


    const filteredChats = chats.filter((chat) => {
        return (chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase()));
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity className="flex-row items-center px-3 py-2 my-1 bg-gray-100">
            <Image source={item.profile} className="w-20 h-20 rounded-full" />
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-bold" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    <Text className="text-xs font-semibold">{item.time}</Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="flex-1 text-base text-gray-500"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{item.lastMessage}</Text>
                    {item.unread > 0 && (
                        <View className="px-2 py-2 bg-green-500 rounded-full ms-2">
                            <Text className="text-xs font-bold text-slate-50">{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView className="flex-1 bg-white " edges={["right", "bottom", "left"]}>

            <View className="flex-row items-center justify-center px-3 mx-2 mt-3 bg-gray-200 rounded-full h-14">
                <Ionicons name="search" size={20} color="gray" />
                <TextInput placeholder="Search" className="flex-1 text-lg font-bold ps-2" value={search} onChangeText={(text) => {
                    setSearch(text);
                }} />
            </View>
            <View className="mt-1">
                <FlatList
                    data={filteredChats}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </View>

            <View className="absolute w-20 h-20 bg-green-500 bottom-24 right-10 rounded-3xl">
                <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-3xl">
                    <Ionicons name="chatbox-ellipses" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}