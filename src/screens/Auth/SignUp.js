import React, { useState, useRef } from "react";

import {
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useAppStore } from "../../store";
import { MaterialIcons } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { navigationKeys } from "../../actions";
import GradientCard from "../../components/GradientCard";
const SignUpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [birthtime, setBirthTime] = useState(new Date());

  const [isShowDatepicker, setShowDatepicker] = useState(false);
  const [isShowTimepicker, setShowTimepicker] = useState(false);

  const [selectGender, setGender] = useState("male");
  const [birthPlace, setBirthPlace] = useState("");
  const userinfo = useAppStore((state) => state.userinfo);
  const setUserinfo = useAppStore((state) => state.setUserinfo);

  const onBirthDateChage = (event, selectedDate) => {
    setShowDatepicker(false);
    setBirthdate(selectedDate);
  };

  const onBirthTimeChage = (event, selectTime) => {
    setShowTimepicker(false);
    setBirthTime(selectTime);
  };

  const onPressSignup = () => {
    birthdate.setHours(birthtime.getHours());
    birthdate.setMinutes(birthtime.getMinutes());
    birthdate.setSeconds(birthtime.getSeconds());
    const newUserinfo = {
      ...userinfo,
      birth: birthdate,
      gender: selectGender === "male",
      birthplace: birthPlace,
      username: username,
    };
    setUserinfo(newUserinfo);
    navigation.navigate(navigationKeys.DISPLAYNAME);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <ScrollView
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <View style={styles.Wrapper}>
          <TouchableOpacity
            onPress={() => navigation.push(navigationKeys.LOGIN)}
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingBottom: 15,
              paddingTop: insets.top,
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "400",
                marginLeft: 20,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={{ ...styles.Wrraper, marginTop: 0 }}>
            <Text style={styles.description}>
              We use NASA data to paint a complete picture of sky when and where
              bore. Our AI uses this information to personalize your chart,
              horoscope, and compatibility to the second you were born.
            </Text>
            <View style={styles.InputCtrlWrraper}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: 300 }}>
                Name
              </Text>
              <TextInput
                style={styles.InputCtrl}
                placeholder="User01"
                placeholderTextColor={"#FFFFFF"}
                onChangeText={(newText) => setUsername(newText)}
                value={username}
              />
            </View>
            <View style={{ ...styles.InputCtrlWrraper, marginTop: 10 }}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: 300 }}>
                Birth Date
              </Text>
              {isShowDatepicker && (
                <DateTimePicker
                  mode="date"
                  value={birthdate}
                  onChange={onBirthDateChage}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  setShowDatepicker(true);
                }}
              >
                <View
                  style={{
                    padding: 12,
                    marginTop: 10,
                    borderColor: "#FFFFFF",
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "300",
                    }}
                  >
                    {birthdate.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                paddingVertical: 5,
              }}
            >
              <Image
                source={require("../../assets/images/LockIcon.png")}
                style={{ width: 18, height: 18 }}
              ></Image>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 300,
                  marginLeft: 8,
                }}
              >
                None of your friends can see this.
              </Text>
            </View>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 300,
                marginTop: 14,
              }}
            >
              Select your gender
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {selectGender === "male" ? (
                <GradientCard style={{ ...styles.switch }}>
                  <Image
                    source={require("../../assets/images/male.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                  <Text
                    style={{
                      color: selectGender === "male" ? "#000000" : "#FFFFFF",
                      textAlignVertical: "center",
                      fontSize: 16,
                      marginHorizontal: 10,
                    }}
                  >
                    Male
                  </Text>
                </GradientCard>
              ) : (
                <TouchableOpacity
                  style={[styles.switch, { borderWidth: 0 }]}
                  onPress={() => {
                    setGender("male");
                  }}
                >
                  <Image
                    source={require("../../assets/images/male.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>
                  <Text
                    style={{
                      color: selectGender === "male" ? "#000000" : "#FFFFFF",
                      textAlignVertical: "center",
                      fontSize: 16,
                      marginHorizontal: 10,
                    }}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
              )}
              {selectGender === "female" ? (
                <GradientCard style={[styles.switch, { marginLeft: 8 }]}>
                  <Image
                    source={require("../../assets/images/female.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>

                  <Text
                    style={{
                      color: selectGender === "female" ? "#000000" : "#FFFFFF",
                      textAlignVertical: "center",
                      marginHorizontal: 10,
                      fontSize: 16,
                    }}
                  >
                    Female
                  </Text>
                </GradientCard>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.switch,
                    { marginLeft: 8, borderWidth: 0 },
                    selectGender === "female" && styles.genderActive,
                  ]}
                  onPress={() => {
                    setGender("female");
                  }}
                >
                  <Image
                    source={require("../../assets/images/female.png")}
                    style={{ width: 32, height: 32 }}
                  ></Image>

                  <Text
                    style={{
                      color: selectGender === "female" ? "#000000" : "#FFFFFF",
                      textAlignVertical: "center",
                      marginHorizontal: 10,
                      fontSize: 16,
                    }}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ ...styles.InputCtrlWrraper, marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {isShowTimepicker && (
                  <DateTimePicker
                    mode="time"
                    value={birthtime}
                    onChange={onBirthTimeChage}
                  />
                )}

                <Text style={{ color: "white", fontSize: 14, fontWeight: 300 }}>
                  Birth Time
                </Text>

                <Text
                  style={{ color: "#BFBFBF", fontSize: 14, fontWeight: 300 }}
                >
                  I don’t know what time i was born
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowTimepicker(true);
                }}
              >
                <View
                  style={{
                    // height: 40,
                    padding: 12,
                    marginTop: 10,
                    borderColor: "#FFFFFF",
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "300",
                    }}
                  >
                    {birthtime.toLocaleTimeString()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.InputCtrlWrraper, marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 300 }}
                >
                  Birth place
                </Text>
                <Text
                  style={{ color: "#BB98F3", fontSize: 14, fontWeight: 300 }}
                >
                  Required
                </Text>
              </View>

              <TextInput
                style={{
                  ...styles.InputCtrl,
                  borderColor: birthPlace === "" ? "#BB98F3" : "#FFFFFF",
                }}
                placeholder="London"
                placeholderTextColor={"#FFFFFF"}
                onChangeText={(newText) => setBirthPlace(newText)}
                value={birthPlace}
              />
            </View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                onPressSignup();
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  Wrapper: {
    // position: "absolute",
    color: "#FFFFF",
    top: 0,
    width: "100%",
    paddingTop: 10,
  },
  Wrraper: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 400,
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
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 36,
    backgroundColor: "#5F66FD",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  InputCtrlWrraper: {
    marginTop: 14,
    // padding: 8,
  },
  InputCtrl: {
    fontSize: 16,
    height: 50,
    marginTop: 10,
    borderColor: "#FFFFFF",
    fontWeight: "300",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    color: "#FFFFFF",
  },
  switch: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  genderActive: {
    backgroundColor: "#FDE74D",
    borderWidth: 0,
  },
});
