import { useEffect, useState, useCallback } from "react";
import { Image, LogBox, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TransitionSpecs } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SplashScreenManager from "expo-splash-screen";

import SplashScreen from "./src/screens/Splash";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Auth/Login";
import VerificationScreen from "./src/screens/Auth/Verification";
import UserNameScreen from "./src/screens/Auth/UserName";
import PasswordScreen from "./src/screens/Auth/Password";
import NotificationScreen from "./src/screens/Notifications";
import ResetPasswordScreen from "./src/screens/Auth/ResetPassword";

import { useAppStore } from "./src/store";
import EmailScreen from "./src/screens/Auth/EmailScreen";
import SignUpScreen from "./src/screens/Auth/SignUp";
import DisplaySetScreen from "./src/screens/Auth/DisplayName";
import ProfileScreen from "./src/screens/Home/Profile";
import CompatibilityScreen from "./src/screens/Compatibility";
import SearchFriendScreen from "./src/screens/Compatibility/Search";
import AddFriendScreen from "./src/screens/Compatibility/AddFriend";
import ChatBotAIScreen from "./src/screens/ChatBotAI";
import ChatBotRoomScreen from "./src/screens/ChatBotAI/ChatBotRoom";
import ChatBotHistoryScreen from "./src/screens/ChatBotAI/History";
import UserInfoScreen from "./src/screens/Home/UserInfo";
import { navigationKeys } from "./src/actions";
import MemberShipScreen from "./src/screens/Home/MemberShip";

import BottomBar from "./src/components/BottomBar";
import Timing from "./src/screens/Home/Timing";

import splash1 from "./src/assets/images/splash1.png";
import splash2 from "./src/assets/images/splash2.png";
import splash3 from "./src/assets/images/splash3.png";
import splash4 from "./src/assets/images/splash4.png";
import loginBG from "./src/assets/images/loginBG.png";

const {
  SPLASH,
  HOME,
  LOGIN,
  VERIFICATION,
  USERNAME,
  PASSWORD,
  EMAIL,
  NOTIFICATION,
  RESETPASSWORD,
  SIGNUP,
  USERINFO,
  MEMBERSHIP,
  MAINPAGE,
  FRIEND,
  SEARCH,
  SEARCHFRIEND,
  ADDFRIEND,
  TIMING,
  CHATBOT,
  CHATBOTAI,
  CHATBOTROOM,
  CHATBOTHISTORY,
  PROFILE,
} = navigationKeys;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}
      initialRouteName={"FIRST"}
    >
      <Stack.Screen name={"FIRST"} component={HomeScreen} />

      <Stack.Screen name={USERINFO} component={UserInfoScreen} />
      <Stack.Screen name={NOTIFICATION} component={NotificationScreen} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const FriendPage = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}
      initialRouteName={SEARCH}
    >
      <Stack.Screen name={SEARCH} component={CompatibilityScreen} />
      <Stack.Screen name={SEARCHFRIEND} component={SearchFriendScreen} />
      <Stack.Screen name={ADDFRIEND} component={AddFriendScreen} />
    </Stack.Navigator>
  );
};

const ChatBotPage = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: "slide_from_bottom",
      }}
      initialRouteName={CHATBOTAI}
    >
      <Stack.Screen name={CHATBOTAI} component={ChatBotAIScreen} />
      <Stack.Screen name={CHATBOTROOM} component={ChatBotRoomScreen} />
      <Stack.Screen name={CHATBOTHISTORY} component={ChatBotHistoryScreen} />
    </Stack.Navigator>
  );
};
const MainPage = () => {
  LogBox.ignoreLogs(["new NativeEventEmitter"]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        tabBarTransition: "slide_from_right",
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName={HOME}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tab.Screen name={HOME} component={MainHome} />
      <Tab.Screen
        name={CHATBOT}
        component={ChatBotPage}
        options={{ title: "Bot" }}
      />
      <Tab.Screen
        name={FRIEND}
        component={FriendPage}
        options={{ title: "Compatibility" }}
      />
      <Tab.Screen name={TIMING} component={Timing} />
    </Tab.Navigator>
  );
};

// Keep the splash screen visible while we fetch resources
SplashScreenManager.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const currentSplashStep = useAppStore((state) => state.currentSplashStep);
  const authorized = useAppStore((state) => state.authorized);
  const setAuthorized = useAppStore((state) => state.setAuthorized);
  const setUserinfo = useAppStore((state) => state.setUserinfo);
  const initialRouteName = !authorized
    ? currentSplashStep < 4
      ? SPLASH
      : LOGIN
    : MAINPAGE;

  const checkAuth = async () => {
    try {
      const auth = await AsyncStorage.getItem("auth");
      if (auth) {
        setAuthorized(true);
        setUserinfo(JSON.parse(auth));
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    checkAuth();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreenManager.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <>
        <Image source={splash1} style={{ width: 0, height: 0 }} />
        <Image source={splash2} style={{ width: 0, height: 0 }} />
        <Image source={splash3} style={{ width: 0, height: 0 }} />
        <Image source={splash4} style={{ width: 0, height: 0 }} />
        <Image source={loginBG} style={{ width: 0, height: 0 }} />
      </>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            forceInset: { top: "always", bottom: "always" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name={SPLASH} component={SplashScreen} />
          <Stack.Screen name={MAINPAGE} component={MainPage} />
          <Stack.Screen name={LOGIN} component={LoginScreen} />
          <Stack.Screen name={VERIFICATION} component={VerificationScreen} />
          <Stack.Screen name={USERNAME} component={UserNameScreen} />
          <Stack.Screen name={PASSWORD} component={PasswordScreen} />
          <Stack.Screen name={EMAIL} component={EmailScreen} />
          <Stack.Screen name={RESETPASSWORD} component={ResetPasswordScreen} />
          <Stack.Screen name={SIGNUP} component={SignUpScreen} />

          <Stack.Screen name="DisplayName" component={DisplaySetScreen} />

          <Stack.Screen name={MEMBERSHIP} component={MemberShipScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
