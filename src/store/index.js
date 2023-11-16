import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAppStore = create((set) => {
  return {
    currentSplashStep: 0,
    authorized: false,
    phoneNumber: "",
    formatedPhoneNumber: "",
    emailId: "",
    userinfo: {},
    setAuthorized: (authorized) => set((state) => ({ authorized })),
    logout: async () => {
      try {
        await AsyncStorage.removeItem("auth");
        set(() => ({ authorized: false }));
      } catch (error) {
        console.log(error);
      }
    },
    setUserinfo: async (userinfo) => {
      await AsyncStorage.setItem("auth", JSON.stringify(userinfo));
      set(() => ({ userinfo }));
    },
    setPhoneNumber: (number) => {
      set(() => ({ phoneNumber: number }));
    },
    setFormatedPhoneNumber: (number) => {
      set(() => ({ formatedPhoneNumber: number }));
    },
    setEmailId: (id) => {
      set(() => ({ emailId: id }));
    },
    setNextSplashStep: () =>
      set((state) => ({ currentSplashStep: state.currentSplashStep + 1 })),
  };
});
