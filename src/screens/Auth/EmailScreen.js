import React, { useState, useRef } from "react";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import { useAppStore } from "../../store";
import { TextInput } from "react-native-gesture-handler";
import {
  navigationKeys,
  sendEamilOtp,
  sendOtp,
  verifyExistsUser,
} from "../../actions";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";
import { DEFAULT_THEME, Flag } from "react-native-country-picker-modal";

export default function EmailScreen({ navigation }) {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const insets = useSafeAreaInsets();

  const setEmailId = useAppStore((state) => state.setEmailId);
  const setPhoneNumber = useAppStore((state) => state.setPhoneNumber);

  const emailId = useAppStore((state) => state.emailId);
  const phoneNumber = useAppStore((state) => state.phoneNumber);
  const setFormatedPhoneNumber = useAppStore(
    (state) => state.setFormatedPhoneNumber
  );

  const [isEmail, setIsEmail] = useState(true);
  const [err, setErr] = useState("");

  const phoneInput = useRef(null);

  const switchMobileEmail = () => {
    setIsEmail(!isEmail);
  };

  const sendOTP = () => {
    verifyExistsUser(
      isEmail ? { email: emailId } : { phonenumber: phoneNumber }
    ).then((response) => {
      if (response.data.exists) {
        setErr(`This ${isEmail ? "Email Id" : "Phone Number"} already exists`);
        return;
      }
      if (isEmail) {
        sendEamilOtp(emailId)
          .then((result) => {
            if (result.data.success) {
              navigation.navigate(navigationKeys.VERIFICATION, {
                next: navigationKeys.SIGNUP,
                isEmail,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        sendOtp(phoneNumber)
          .then((result) => {
            if (result.data.success) {
              navigation.push(navigationKeys.VERIFICATION, {
                next: navigationKeys.SIGNUP,
                isEmail,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View style={styles.Wrapper}>
        <View
          style={{
            width: "100%",
            paddingLeft: 15,
            paddingTop: insets.top,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.steps}>
          <Text style={styles.title}>Sing Up</Text>
          <Text style={styles.description}>
            Enter your {isEmail ? "Email Id" : "Phone Number"} to signup your
            account
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>
              {isEmail ? "Email Id" : "Phone Number"}
            </Text>
            <Text style={styles.error}>{err}</Text>
            {isEmail ? (
              <TextInput
                style={styles.InputCtrl}
                placeholder={isEmail ? "Email Id" : "Phone Number"}
                placeholderTextColor={"#FFFFFF"}
                onChangeText={(newText) => setEmailId(newText)}
                value={emailId}
              />
            ) : (
              <View style={styles.phoneNumberWrapper}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="US"
                  layout="second"
                  placeholder="Enter Mobile Number"
                  withDarkTheme={true}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormatedPhoneNumber(text);
                  }}
                  autoFocus={false}
                  flagButtonStyle={{
                    color: "#FFFFFF",
                  }}
                  textContainerStyle={{
                    backgroundColor: "transparent",
                  }}
                  textInputStyle={{
                    borderColor: "#FFFFFF",
                    borderLeftWidth: 1,
                    paddingLeft: 12,
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                  containerStyle={{
                    borderRadius: 0,
                    width: "100%",
                    backgroundColor: "transparent",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                  textInputProps={{
                    keyboardType: "phone-pad",
                    placeholderTextColor: "#FFFFFF",
                  }}
                  codeTextStyle={{
                    color: "#FFFFFF",
                  }}
                  // disableArrowIcon={true}
                  renderDropdownImage={
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={18}
                      color="white"
                    />
                  }
                  countryPickerProps={{
                    renderFlagButton: (props) => {
                      return (
                        <Flag
                          countryCode={props.countryCode}
                          flagSize={DEFAULT_THEME.flagSize}
                        />
                      );
                    },
                  }}
                />
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={sendOTP}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#FFFFFF" }}>
              SEND OTP
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.steps,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 16,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <View
                style={{ backgroundColor: "#FFFFFF", width: "100%", height: 1 }}
              ></View>
            </View>
            <Text
              style={{ paddingLeft: 10, paddingRight: 10, color: "#FFFFFF" }}
            >
              Or
            </Text>
            <View style={{ flex: 1, alignSelf: "center" }}>
              <View
                style={{ backgroundColor: "#FFFFFF", width: "100%", height: 1 }}
              ></View>
            </View>
          </View>
        </View>
        <View style={{ ...styles.steps, paddingTop: 0 }}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={switchMobileEmail}
          >
            {!isEmail ? (
              <MaterialIcons
                name="email"
                size={24}
                color="#3E495A"
                style={{ paddingHorizontal: 8 }}
              />
            ) : (
              <Entypo
                name="mobile"
                size={24}
                color="#3E495A"
                style={{ paddingHorizontal: 8 }}
              />
            )}
            <Text>Continue with {!isEmail ? "Email Id" : "Mobile Number"}</Text>
          </TouchableOpacity>
          <View
            style={{
              textAlign: "center",
              width: "100%",
              flexDirection: "row",
              marginTop: 27,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              By signing up, you agree to our{" "}
            </Text>
            <Text style={{ color: "#8F9CF9", fontSize: 12 }}>
              Terms of Use{" "}
            </Text>
            <Text style={{ color: "white", fontSize: 12 }}> & </Text>
            <Text style={{ color: "#8F9CF9", fontSize: 12 }}> Privacy</Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: "#8F9CF9",
              fontSize: 12,
            }}
          >
            Policy
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    top: 0,
    width: "100%",
    position: "absolute",
    backgroundColor: "transparent",
  },
  steps: {
    width: "100%",
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {},
  title: {
    flexDirection: "row",
    color: "#F8F8F8",
    fontSize: 25,
    fontWeight: "400",
  },
  description: {
    flexDirection: "row",
    color: "#D1D1D1",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 24,
  },
  inputGroup: {
    marginTop: 28,
  },
  label1: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginVertical: 5,
  },
  error: {
    fontSize: 10,
    color: "#f22f46",
  },
  InputCtrl: {
    fontSize: 14,
    borderRadius: 8,
    fontWeight: "300",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: 10,
    height: 48,
    marginTop: 4,
    color: "#FFFFFF",
  },
  phoneNumberWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#FFFFFF",
    marginTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 41,
    backgroundColor: "#5F66FD",
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  continueBtn: {
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
  },
  notifition: {
    paddingVertical: 4,
    color: "#5F5C5C",
  },
});
