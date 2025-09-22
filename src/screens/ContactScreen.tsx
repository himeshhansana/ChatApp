import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar } from "react-native";
import "../../global.css";
import { View, Image, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { use, useState } from "react";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";



type ContactProps = NativeStackNavigationProp<RootStackParamList, "ContactScreen">;


export default function ContactScreen() {
    const navigation = useNavigation<ContactProps>();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);

    return (
        <SafeAreaView className="items-center flex-1 bg-white">
            <StatusBar hidden={true} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
            >
                <View className="items-center flex-1 p-5">
                    <View>
                        <Image
                            source={require("../../assets/logo.png")}
                            className="h-40 w-36"
                        />
                    </View>
                    <View>
                        <Text className="font-bold text-slate-600">
                            We use your contacts to help you find friends who are already on
                            the app. Your contacts stay private.
                        </Text>
                    </View>
                    <View className="w-full mt-5">
                        <Pressable
                            className="flex flex-row items-center justify-center w-full h-16 border-b-2 border-b-green-600"
                            onPress={() => {
                                setShow(true);
                            }}
                        >
                            <Text className="text-lg font-bold">Select Country </Text>
                            <AntDesign
                                name="caret-down"
                                size={18}
                                color="black"
                                style={{ marginTop: 5 }}
                            />
                        </Pressable>

                        <View className="flex flex-row justify-center mt-2">
                            <TextInput
                                inputMode="tel"
                                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[18%]"
                                placeholder="+94"
                            />
                            <TextInput
                                inputMode="tel"
                                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[80%] ml-2"
                                placeholder="77 #### ###"
                            />
                        </View>
                    </View>
                    <View className="w-full mt-16">
                        <Pressable
                            className="items-center justify-center w-full bg-green-600 rounded-full h-14"
                            onPress={() => {
                                navigation.replace("AvatarScreen");
                            }}
                        >
                            <Text className="text-xl font-bold text-slate-50">Next</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
