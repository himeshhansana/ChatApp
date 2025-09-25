import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useUserRegistration } from "../components/UserContext";
import { validateProfileImage } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function AvatarScreen() {
  const [image, setImage] = useState<string | null>(null);

  const { userData, setUserData } = useUserRegistration();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setUserData((previous) => ({
        ...previous,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ];



  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar hidden={true} />
      <View className="items-center flex-1 ">
        <View>
          <Image
            source={require("../../assets/logo.png")}
            className="h-40 w-36"
          />
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-slate-700">
            Choose a profile image
          </Text>
          <View className="items-center mt-2 h-72">
            <Pressable
              className="h-[120] w-[120] rounded-full bg-gray-100 justify-center items-center border-2 border-gray-400
            border-dashed"
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="h-[120] w-[120] rounded-full"
                />
              ) : (
                <View className="items-center">
                  <Text className="text-2xl font-bold text-slate-500">+</Text>
                  <Text className="text-lg font-bold text-slate-500">
                    Add Image
                  </Text>
                </View>
              )}
            </Pressable>
            <Text className="my-2 text-lg font-bold text-slate-700">
              Or select an avatar
            </Text>
            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setImage(Image.resolveAssetSource(item).uri);
                    setUserData((previous) => ({
                      ...previous,
                      profileImage: Image.resolveAssetSource(item).uri,
                    }));
                  }}
                >
                  <Image
                    source={item}
                    className="w-20 h-20 mx-2 border-2 border-gray-200 rounded-full"
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View className="w-full px-5 mt-2">
          <Pressable
            className="items-center justify-center bg-green-600 rounded-full h-14"
            onPress={() => {
              const validProfile = validateProfileImage(
                userData.profileImage
                  ? { uri: userData.profileImage, type: "", fileSize: 0 } : null
              );
              if (validProfile) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Warning",
                  textBody: "Select a Profile image or an avatar"
                });
              } else {
                console.log(userData);
                console.log("Done");
              }
            }}
          >
            <Text className="text-lg font-bold text-slate-50">
              Create Account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
