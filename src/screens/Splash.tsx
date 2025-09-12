import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import "../../global.css"
import CircleShape from "../components/CircleShepe";
import { useEffect, useRef } from "react";


export default function SplashScreen() {

    const fadeIn = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeIn]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <CircleShape
                width={200}
                height={200}
                fillColor="#111827"
                backgroundColor="transparent"
                borderRadius={999}
                topValue={-25}
                leftValue={-50}
            />
            <CircleShape
                width={160}
                height={160}
                fillColor="#111827"
                backgroundColor="transparent"
                borderRadius={999}
                topValue={-40}
                leftValue={70}
            />
            <Animated.View style={{ opacity: fadeIn }}>
                <Image source={require("../../assets/logo.png")}
                    style={{ width: 150, height: 200 }}
                />
            </Animated.View>

            <View style={styles.bottomContainer}>
                <View>
                    <Text style={styles.poweredByText}>POWERED BY :{process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                    <Text style={styles.versionText}>VERSION :{process.env.EXPO_PUBLIC_APP_VERSION}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },

    poweredByText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#475569',
        textAlign: 'center',
    },

    versionText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});