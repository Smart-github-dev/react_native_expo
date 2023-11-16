import React, { useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { DEFAULT_THEME, Flag } from "react-native-country-picker-modal";
import { ImageBackground } from "react-native";
import { navigationKeys } from "../../actions";

const layouts = ["email", "mobileNumber", "sendAgain"];
export default function ResetPasswordScreen({ navigation }) {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const [resetPasswordLayout, setLayout] = useState("email");
  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View
        style={{ ...styles.Wrapper, width: windowWidth, height: windowHeight }}
      >
        <View
          style={{
            width: "100%",
            paddingLeft: 15,
            paddingVertical: 18,
            flexDirection: "row",
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
            Reset Password
          </Text>
        </View>
        {(resetPasswordLayout === "email" ||
          resetPasswordLayout === "mobileNumber") && (
          <>
            <View style={styles.steps}>
              <Text style={styles.title}>Forgot password</Text>
              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <Text style={styles.description}>Enter your </Text>
                <Text style={{ ...styles.description, color: "#8F9CF9" }}>
                  {resetPasswordLayout == "email"
                    ? "email address"
                    : "mobile number"}
                </Text>
                <Text style={styles.description}> and</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.description}>
                  we will send you a reset instructions.
                </Text>
              </View>

              {resetPasswordLayout === "email" ? (
                <View style={styles.inputGroup}>
                  <Text style={styles.labelEmail}>Email address</Text>
                  <TextInput
                    style={styles.emilInput}
                    placeholder="team@zodiac.in"
                    placeholderTextColor={"#FFFFFF"}
                    // textContentType="email"
                    inputMode="email"
                  />
                </View>
              ) : (
                <View style={styles.inputGroup}>
                  <Text style={styles.labelMobileNumber}>Mobile Number</Text>
                  <View style={styles.phoneNumberWrapper}>
                    <PhoneInput
                      // ref={phoneInput}
                      // defaultValue={}
                      defaultCode="US"
                      layout="first"
                      placeholder="Enter Mobile Number"
                      withDarkTheme={true}
                      onChangeText={(text) => {
                        // setPhoneNumber(text);
                      }}
                      onChangeFormattedText={(text) => {
                        // setFormattedPhoneNumber(text);
                      }}
                      autoFocus
                      flagButtonStyle={{
                        width: 0,
                        color: "#FFFFFF",
                      }}
                      textContainerStyle={{
                        backgroundColor: "transparent",
                        fontSize: 16,
                        color: "#FFFFFF",
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
                </View>
              )}

              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => {
                  if (resetPasswordLayout === "email") {
                    setLayout("mobileNumber");
                  } else if (resetPasswordLayout === "mobileNumber") {
                    setLayout("sendAgain");
                  }
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  RESET PASSWORD
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
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      height: 1,
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "#FFFFFF",
                  }}
                >
                  Or
                </Text>
                <View style={{ flex: 1, alignSelf: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      width: "100%",
                      height: 1,
                    }}
                  ></View>
                </View>
              </View>
            </View>
            <View style={{ ...styles.steps, paddingTop: 0 }}>
              <View style={{ ...styles.continueBtn, marginTop: 16 }}>
                <Entypo
                  name="mobile"
                  size={24}
                  color="#3E495A"
                  style={{ paddingHorizontal: 10 }}
                />
                <Text>Reset with Google</Text>
              </View>
              <View
                style={{
                  textAlign: "center",
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 27,
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>
                  By signing up, you agree to our{" "}
                </Text>
                <Text style={{ color: "#8F9CF9", fontSize: 12 }}>
                  Terms of Use
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
          </>
        )}
        {resetPasswordLayout === "sendAgain" && (
          <>
            <View style={styles.steps}>
              <Text style={styles.title}>Reset email sent</Text>
              <View style={{ marginTop: 12 }}>
                <Text style={{ ...styles.description, flexDirection: "row" }}>
                  We have sent a instructions email
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.description}> team@zodia.in </Text>
                  <Text style={{ ...styles.description, color: "#5F66FD" }}>
                    Having problem?
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  borderRadius: 31,
                  backgroundColor: "#5F66FD",
                  justifyContent: "center",
                  padding: 14,
                  marginTop: 24,
                }}
                onPress={() => {
                  navigation.navigate(navigationKeys.LOGIN);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  SEND OTP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    borderBottomWidth: 1,
                    borderBottomColor: "#FFFFFF",
                  }}
                >
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    top: 0,
    width: "100%",
    position: "absolute",
  },
  steps: {
    width: "100%",
    paddingTop: 44,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {},
  title: {
    flexDirection: "row",
    color: "#F8F8F8",
    fontSize: 18,
    fontWeight: 500,
  },
  description: {
    color: "#D1D1D1",
    fontSize: 14,
    fontWeight: 400,
  },
  inputGroup: {
    marginTop: 24,
  },
  labelEmail: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  emilInput: {
    marginTop: 24,
    borderRadius: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
    color: "#FFFFFF",
  },
  resetBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#8F9CF9",
    borderWidth: 1,
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 13,
  },
  continueBtn: {
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: "100%",
    marginTop: 24,
  },
  labelMobileNumber: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  phoneNumberWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#FFFFFF",
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
