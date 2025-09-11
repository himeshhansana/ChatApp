import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, View } from "react-native";
import "../../global.css"

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <Image source={require("../../assets/logo.png")}
                style={{ width: 150, height: 200 }}
            />
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