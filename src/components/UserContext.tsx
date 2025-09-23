import React, { createContext, useContext, ReactNode } from "react";

export interface UserRegistrationData {
    firstName: string;
    lastName: string;
    contactNumber: string;
    countryCode: string;
    profileImage: string | null;
}

interface UserRegistrationContextType {
    userData: UserRegistrationData;
    setUserData: React.Dispatch<React.SetStateAction<UserRegistrationData>>;
}

const UserRegistrationContext = createContext<
    UserRegistrationContextType | undefined
>(undefined);

export const UserRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [userData, setUserData] = React.useState<UserRegistrationData>({
        firstName: "",
        lastName: "",
        contactNumber: "",
        countryCode: "",
        profileImage: null
    });

    return (
        <UserRegistrationContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserRegistrationContext.Provider>
    );
};

export const userRegistration = (): UserRegistrationContextType => {
    const ctx = useContext(UserRegistrationContext);
    if (!ctx) {
        throw new Error(
            "UserRegistration must be used within a UserRegistrationProvider"
        );
    }
    return ctx;
};

