import {
    UserRegistrationData,
} from "../components/UserContext";


const API = process.env.EXPO_PUBLIC_APP_URL + "/ChatApp";

export const createNewAccount = async (
    userRegistrationData: UserRegistrationData
) => {

    let formData = new FormData();
    formData.append("firstName", userRegistrationData.firstName);
    formData.append("lastName", userRegistrationData.lastName);
    formData.append("countryCode", userRegistrationData.countryCode);
    formData.append("contactNo", userRegistrationData.contactNo);
    formData.append("profileImage", {
        uri: userRegistrationData.profileImage,
        type: "image/jpeg",
        name: "profile.jpg",
    } as any);
    const response = await fetch(API + "/UserController", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "Account created unsuccessfully";
    }
};