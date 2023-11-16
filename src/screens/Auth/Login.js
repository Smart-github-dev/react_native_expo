import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { DEFAULT_THEME, Flag } from "react-native-country-picker-modal";
import { MaterialIcons } from "@expo/vector-icons";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

import { useAppStore } from "../../store";
import { navigationKeys, sendOtp } from "../../actions";

export default function LoginScreen({ navigation }) {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const phoneInput = useRef(null);

  const onPressSendOTP = async () => {
    try {
      const result = await sendOtp(formatedPhoneNumber);
      if (result.data.success) {
        navigation.push(navigationKeys.VERIFICATION, {
          next: navigationKeys.MAINPAGE,
          isEmail: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setPhoneNumber = useAppStore((state) => state.setPhoneNumber);
  const phoneNumber = useAppStore((state) => state.phoneNumber);
  const setFormatedPhoneNumber = useAppStore(
    (state) => state.setFormatedPhoneNumber
  );
  const formatedPhoneNumber = useAppStore((state) => state.formatedPhoneNumber);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const onGoogleSignin = () => {
    setIsSigninInProgress(true);
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
        <View style={styles.steps}>
          <Text style={styles.title}>Login/Sing Up</Text>
          <Text style={styles.description}>
            Enter your mobile number to login your account
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.labelMobileNumber}>Mobile Number</Text>
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
                autoFocus
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
          </View>

          <TouchableOpacity onPress={onPressSendOTP}>
            <Text style={styles.sendBtn}>SEND OTP</Text>
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
              style={{ paddingLeft: 10, paddingRight: 10, color: "#707070" }}
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
          {/* <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleSignin}
            disabled={isSigninInProgress}
          /> */}
          <View style={{ ...styles.continueBtn, marginTop: 16 }}>
            <Image source={require("../../assets/images/google.png")} />
            <Text style={{ marginLeft: 10 }}>Continue with Google</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 27,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.push(navigationKeys.EMAIL)}
            >
              <Text
                style={{
                  color: "#FDE74D",
                  fontWeight: 700,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontWeight: 300,
              }}
            >
              {" "}
              to join AeonZodiac
            </Text>
          </View>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Facebook login is no longer available
              </Text>

              <Text style={styles.notifition}>
                If you connected a phone number, you can reset
              </Text>
              <Text style={styles.notifition}>
                the password for that account. if you signed up
              </Text>
              <Text style={styles.notifition}>
                through facebook, contact support to merge
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(navigationKeys.NOTIFICATION);
                }}
              >
                <Text style={[styles.button, styles.textStyle]}>
                  GET SUPPORT
                </Text>
              </TouchableOpacity>

              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeBtn}>CLOSE</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    // position: "absolute",
    paddingTop: 80,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {},
  title: {
    flexDirection: "row",
    color: "#F8F8F8",
    fontSize: 25,
    fontWeight: 600,
  },
  description: {
    flexDirection: "row",
    color: "#D1D1D1",
    fontSize: 14,
    fontWeight: 400,
    marginTop: 24,
  },
  inputGroup: {
    marginTop: 28,
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
  sendBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 45,
    // borderColor: "#FDE74D",
    textAlign: "center",
    backgroundColor: "#5F66FD",
    // borderWidth: 1,
    fontSize: 14,
    fontWeight: 500,
    color: "#FFFFFF",
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  continueBtn: {
    borderRadius: 45,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: 50,
    backgroundColor: "#D9D9D9",
    // width: "100%",
    paddingVertical: 24,
    width: "92%",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 24,
    borderRadius: 10,
    borderColor: "#FDE74D",
    borderWidth: 1,
    width: 276,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  closeBtn: {
    fontSize: 14,
    marginVertical: 25,
  },
  textStyle: {
    color: "black",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    // backgroundColor: "#EFEFEF",
  },
  modalText: {
    marginBottom: 24,
    fontSize: 25,
    fontWeight: 600,
    width: 300,
    textAlign: "center",
  },
  notifition: {
    paddingVertical: 4,
    color: "#5F5C5C",
  },
});
