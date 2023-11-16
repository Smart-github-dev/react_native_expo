import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppStore } from "../../store";
import { navigationKeys, sendOtp, verifyOtp } from "../../actions";
import { useRoute } from "@react-navigation/native";

const VerificationScreen = ({ navigation }) => {
  const route = useRoute();
  const windowWidth = Dimensions.get("screen").width;
  const { top } = useSafeAreaInsets();

  const formatedPhoneNumber = useAppStore((state) => state.formatedPhoneNumber);
  const emailId = useAppStore((state) => state.emailId);
  const setUserinfo = useAppStore((state) => state.setUserinfo);
  const setAuthorized = useAppStore((state) => state.setAuthorized);

  const isPhoneNumberVerification = !route.params.isEmail;

  const [err, setErr] = useState("");

  const [verifyCode1, setVerifyCode1] = useState("");
  const [verifyCode2, setVerifyCode2] = useState("");
  const [verifyCode3, setVerifyCode3] = useState("");
  const [verifyCode4, setVerifyCode4] = useState("");

  const verifyCodeInput1 = useRef(null);
  const verifyCodeInput2 = useRef(null);
  const verifyCodeInput3 = useRef(null);
  const verifyCodeInput4 = useRef(null);

  const onVerifyOTP = () => {
    verifyOtp(
      isPhoneNumberVerification ? formatedPhoneNumber : emailId,
      `${verifyCode1}${verifyCode2}${verifyCode3}${verifyCode4}`
    ).then((result) => {
      if (result.data.success) {
        if (result.data.user) {
          setUserinfo({
            ...result.data.user,
            accessToken: result.data.accessToken,
          });
          setAuthorized(true);
          navigation.navigate(route.params.next);
        } else {
          navigation.navigate(navigationKeys.SIGNUP);
        }
      } else {
        setErr(result.data.message);
      }
    });
  };
  useEffect(() => {
    if (verifyCode4 !== "") {
      onVerifyOTP();
    }
  }, [verifyCode4]);
  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: "100%",
      }}
    >
      <View style={styles.Wrapper}>
        <View
          style={{
            width: "100%",
            paddingLeft: 16,
            paddingVertical: 15,
            marginTop: top,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Verfication</Text>
          <Text
            style={{
              flexDirection: "row",
              width: "100%",
              color: "#FFFFFF",
              marginTop: 20,
            }}
          >
            Please Enter the OTP Sent to your registered
          </Text>
          <Text style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ color: "#FFFFFF" }}>
              {isPhoneNumberVerification ? "mobile number" : "email id"} :
            </Text>
            <Text style={{ color: "#8F9CF9" }}>
              {" "}
              {isPhoneNumberVerification ? formatedPhoneNumber : emailId}
            </Text>
          </Text>
        </View>
        <View style={styles.verificationCodeWrraper}>
          <View style={styles.VerficationLabel}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}>
              Verification Code
            </Text>
            <TouchableOpacity
              onPress={() => {
                sendOtp(formatedPhoneNumber);
                setErr("");
                setVerifyCode1("");
                setVerifyCode2("");
                setVerifyCode3("");
                setVerifyCode4("");
              }}
            >
              <Text style={{ color: "#BB98F3", fontSize: 14, fontWeight: 400 }}>
                Re-send Code
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#f22f46", fontSize: 10 }}>{err}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <TextInput
              ref={verifyCodeInput1}
              style={styles.verifyCodeInput}
              value={verifyCode1}
              keyboardType="numeric"
              onChangeText={(text) => {
                setVerifyCode1(text);
                if (text !== "") {
                  verifyCodeInput2.current.focus();
                }
              }}
            />
            <TextInput
              ref={verifyCodeInput2}
              style={styles.verifyCodeInput}
              value={verifyCode2}
              keyboardType="numeric"
              onChangeText={(text) => {
                setVerifyCode2(text);
                if (text !== "") {
                  verifyCodeInput3.current.focus();
                }
              }}
            />
            <TextInput
              ref={verifyCodeInput3}
              style={styles.verifyCodeInput}
              value={verifyCode3}
              keyboardType="numeric"
              onChangeText={(text) => {
                setVerifyCode3(text);
                if (text !== "") {
                  verifyCodeInput4.current.focus();
                }
              }}
            />
            <TextInput
              ref={verifyCodeInput4}
              style={styles.verifyCodeInput}
              value={verifyCode4}
              keyboardType="numeric"
              onChangeText={setVerifyCode4}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // paddingBottom: 34,
            position: "absolute",
            bottom: 20,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            onPress={onVerifyOTP}
            style={{ alignSelf: "flex-end", flex: 1 }}
          >
            <Text style={styles.Btn}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  Wrapper: {
    position: "absolute",
    color: "#FFFFF",
    top: 0,
    width: "100%",
    height: "100%",
    paddingTop: 14,
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: 600,
  },
  verificationCodeWrraper: {
    paddingHorizontal: 16,
    paddingTop: 41,
    flex: 1,
  },
  VerficationLabel: {
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
    textAlign: "center",
  },
  Btn: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 47,
    borderColor: "#5F66FD",
    backgroundColor: "#5F66FD",
    borderWidth: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    alignItems: "center",
  },
  underlineStyleBase: {
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    width: 74,
    fontSize: 14,
    color: "#0C1A30",
  },
  verifyCodeInput: {
    fontSize: 16,
    color: "#0C1A30",
    paddingHorizontal: 20.12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    height: 45,
    width: 74.454,
  },
});
