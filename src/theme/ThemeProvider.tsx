import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeOption = "light" | "dark" | "system";
const THEME_KRY = "@app_color_scheme"

type ThemeContextType = {
    preference: ThemeOption;
    applied: "light" | "dark"; // use on run time
    setPreference: (themeOption: ThemeOption) => Promise<void>;
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const {getColorScheme, setColorScheme} = useColorScheme();
    const [getPreference, setPreference] = useState<ThemeOption>("system");
    const [isReady, setReady] = useState(false);

    useEffect(() => {

        async () => {
            try {
                const saveTheme = await AsyncStorage.getItem(THEME_KRY);
                if (saveTheme === "light" || saveTheme === "dark") {
                    setPreference(saveTheme);
                    setColorScheme(saveTheme);
                } else {
                    setPreference("system");
                    setColorScheme("system")
                }
            } catch (error) {
                console.log("Faild to load threm :" + error);
            } finally {
                setReady(true);
            }
        };
    }, [setColorScheme]);
}