import { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShepe";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackNavigationProp<RootStackParamList, "SplashScreen">;

export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);


    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 });

        const timeout = setTimeout(() => {
          navigation.replace("SignUpScreen");
        }, 4000);
        
        return () => {
            clearTimeout(timeout);
        };

    }, [navigation]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    return (
        <SafeAreaView className="items-center justify-center flex-1">
            <StatusBar hidden={true} />

            <CircleShape
                width={200}
                height={200}
                fillColor="#111827"
                borderRadius={999}
                className="bg-slate-900"
                topValue={-40}
                leftValue={-50}
            />
            <CircleShape
                width={200}
                height={200}
                borderRadius={999}
                className="bg-slate-900"
                topValue={-100}
                leftValue={50}
            />

            <Animated.View style={animatedStyle}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={{ height: 200, width: 220 }}
                />
            </Animated.View>

            <Animated.View className="absolute bottom-10" style={animatedStyle}>
                <View className="items-center justify-center">
                    <Text className="text-xs font-bold text-slate-600">
                        POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
                    </Text>
                    <Text className="text-xs font-bold text-slate-600">
                        VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
                    </Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}
