import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { useAppStore } from "../../store";
import { navigationKeys, signUp } from "../../actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PasswordScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const { top } = useSafeAreaInsets();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const setLoginError = useAppStore((state) => state.setLoginError);
  const userinfo = useAppStore((state) => state.userinfo);
  const setUserinfo = useAppStore((state) => state.setUserinfo);
  const setAuthorized = useAppStore((state) => state.setAuthorized);

  const emailId = useAppStore((state) => state.emailId);
  const formatedPhoneNumber = useAppStore((state) => state.formatedPhoneNumber);

  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [password, setPassword] = useState("");

  const choosePassword = async () => {
    try {
      if (password === "") {
        setIsWrongPassword(true);
        return;
      }
      userinfo.email = emailId;
      userinfo.phonenumber = formatedPhoneNumber;
      userinfo.password = password;

      const result = await signUp(userinfo);
      if (result.data.success) {
        setUserinfo({
          ...result.data.user,
          accessToken: result.data.accessToken,
        });
        setAuthorized(true);
        navigation.push(navigationKeys.MAINPAGE);
      } else {
        setIsWrongPassword(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: "100%",
      }}
    >
      <View
        style={{
          ...styles.Wrapper,
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingLeft: 15,
            paddingVertical: 18,
            flexDirection: "row",
            marginTop: top,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "500",
              marginLeft: 15,
            }}
          >
            Password
          </Text>
        </View>

        <View style={styles.Wrraper}>
          <Text style={styles.title}>Choose a password</Text>
          {isWrongPassword && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 19,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(navigationKeys.RESETPASSWORD);
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: 300, color: "#FF0000" }}
                >
                  Forget password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setLoginError(false)}>
                <Text
                  style={{ fontSize: 14, fontWeight: 300, color: "#FF0000" }}
                >
                  Wrong password
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              ...styles.userNameInputWrraper,
              borderColor: isWrongPassword ? "#FF0000" : "#FFFFFF",
              marginTop: isWrongPassword ? 8 : 27,
            }}
          >
            <TextInput
              style={{
                ...styles.userNameInput,
                color: isWrongPassword ? "#FF0000" : "#FFFFFF",
              }}
              secureTextEntry={passwordVisible}
              placeholder=""
              placeholderTextColor={"#FFFFFF"}
              value={password}
              onChangeText={setPassword}
            />
            {passwordVisible ? (
              <Feather
                name="eye"
                onPress={() => setPasswordVisible(!passwordVisible)}
                size={24}
                color="#FFFFFF"
              />
            ) : (
              <Feather
                onPress={() => setPasswordVisible(!passwordVisible)}
                name="eye-off"
                size={24}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text
            style={{
              color: "#FFFFFF",
              marginTop: 24,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            Password must be at least 6 characters long
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, position: "absolute", bottom: 20 }}>
        <TouchableOpacity
          onPress={choosePassword}
          style={{
            flexDirection: "row",
            paddingVertical: 14,
            alignItems: "center",
            borderRadius: 31,
            // borderColor: "#FDE74D",
            // borderWidth: 1,
            backgroundColor: "#5F66FD",
            marginTop: 300,
          }}
        >
          <Text style={styles.Btn}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  Wrapper: {
    color: "#FFFFF",
    paddingTop: 14,
  },
  Wrraper: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: 600,
  },
  verificationCodeWrraper: {
    paddingHorizontal: 16,
    marginTop: 41,
  },
  VerficationLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  VerfiCationInput: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Input: {
    width: 74,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFF00",
    borderWidth: 1,
  },
  Btn: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
  },
  userNameInputWrraper: {
    flexDirection: "row",
    marginTop: 24,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    paddingRight: 30,
    justifyContent: "space-between",
  },
  userNameInput: {
    width: "100%",
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
