import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status?: "sent" | "delivered" | "read";
};

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">;

export default function SingleChatScreen({
    route,
    navigation,
}: SingleChatScreenProps) {


    const [message, setMessage] = useState<Message[]>([
        {
            id: 3,
            text: "Hello, Kohomada",
            sender: "me",
            time: "10:58 AM",
            status: "read",
        },
        { id: 2, text: "Hi, Hello", sender: "friend", time: "10:57 AM" },
        { id: 1, text: "Hi", sender: "friend", time: "10:56 AM" },
    ]);

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <Image
                        source={require("../../assets/avatar/avatar_1.png")}
                        className="p-1 border-2 border-gray-400 rounded-full h-14 w-14"
                    />
                    <View className="space-y-2 ">
                        <Text className="text-2xl font-bold">Sahan Perera</Text>
                        <Text className="text-xs italic font-bold text-gray-500">
                            Last seen today at 11:00 am
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Message }) => {
        const isMe = item.sender === "me";
        return (
            <View
                className={`my-1 px-3 py-2 max-w-[75%] ${isMe
                    ? `self-end bg-green-900 rounded-tl-xl rounded-bl-xl rounded-br-xl`
                    : `rounded-tr-xl rounded-bl-xl rounded-br-xl self-start bg-gray-700`
                    }`}
            >
                <Text className={`text-white text-base`}>{item.text}</Text>
                <View className="flex-row items-center justify-end mt-1">
                    <Text className={`text-white italic text-xs me-2`}>{item.time}</Text>
                    {isMe && (
                        <Ionicons
                            name={
                                item.status === "read"
                                    ? "checkmark-done-sharp"
                                    : item.status === "delivered"
                                        ? "checkmark-done-sharp"
                                        : "checkmark"
                            }
                            size={20}
                            color={item.status === "read" ? "#0284c7" : "#9ca3af"}
                        />
                    )}
                </View>
            </View>
        );
    };

    const sendMessage = () => {
        if (input.trim()) {
            const newMsg: Message = {
                id: Date.now(),
                text: input,
                sender: "me",
                time: Date.now().toString(),
                status: "sent",
            };
            setMessage([newMsg, ...message]);
            setInput("");
        }
        return !input.trim();
    };

    return (
        <SafeAreaView
            className="flex-1 bg-white"
            edges={["right", "bottom", "left"]}
        >
            <StatusBar hidden={false} />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "android" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 90 : 90}
            >
                <FlatList
                    data={message}
                    renderItem={renderItem}
                    className="flex-1 px-3"
                    inverted
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
                <View className="flex-row items-end p-2 bg-white">
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder="Type a message"
                        className="flex-1 h-auto px-5 py-2 text-base bg-gray-200 min-h-14 max-h-32 rounded-3xl"
                    />
                    <TouchableOpacity
                        className="items-center justify-center bg-green-600 rounded-full w-14 h-14"
                        onPress={sendMessage}
                    >
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
