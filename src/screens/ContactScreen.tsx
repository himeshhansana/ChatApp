import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar } from "react-native";
import "../../global.css";
import { View, Image, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { use, useState } from "react";
// import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";



type ContactProps = NativeStackNavigationProp<RootStackParamList, "ContactScreen">;


export default function ContactScreen() {
    const navigation = useNavigation<ContactProps>();

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);

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

                        <View className="flex-row items-start justify-center h-12 my-3 mb-3 border-b-2 border-b-green-600">
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCountryNameButton
                                withCallingCode
                                visible={show}
                                onClose={() => {
                                    setShow(false);
                                }}
                                onSelect={(c) => {
                                    setCountryCode(c.cca2);
                                    setCountry(c);
                                    setShow(false);
                                }}
                            />
                            <AntDesign
                                name="caret-down"
                                size={18}
                                color="black"
                                style={{ marginTop: 5 }}
                            />

                        </View>


                        <View className="flex flex-row justify-center mt-2">
                            <TextInput
                                inputMode="tel"
                                className="h-16 font-bold text-lg border-y-2 border-y-green-600 w-[18%]"
                                placeholder="+94"
                                editable={false}
                                value={country?`+ ${country.callingCode}`: `+94`}
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
