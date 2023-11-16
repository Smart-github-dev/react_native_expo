import React, { useState } from "react";

import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ImageBackground } from "react-native";
import { Dimensions, ScrollView } from "react-native";
import { navigationKeys } from "../../actions";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppStore } from "../../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UserNameScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const { top } = useSafeAreaInsets();

  const userinfo = useAppStore((state) => state.userinfo);
  const setUserinfo = useAppStore((state) => state.setUserinfo);
  const [username, setName] = useState("");
  const [error, setError] = useState(false);

  const choosUsername = async () => {
    userinfo.username = username;
    setUserinfo(userinfo);
    navigation.navigate(navigationKeys.PASSWORD);
  };
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
            paddingLeft: 15,
            paddingVertical: 18,
            flexDirection: "row",
            marginTop: top,
          }}
        >
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ flexDirection: "row" }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 15,
              }}
            >
              Username
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Wrraper}>
          <Text style={styles.title}>Choose a username</Text>
          <View
            style={{
              ...styles.userNameInputWrraper,
              borderColor: error ? "red" : "#FFFFFF",
            }}
          >
            <TextInput
              style={styles.userNameInput}
              placeholder="user"
              placeholderTextColor={"#FFFFFF"}
              onChangeText={(newText) => setName(newText)}
              defaultValue={username}
            />
          </View>

          <Text
            style={{
              color: "#FFFFFF",
              marginTop: 24,
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            Letters, numbers, and underscores only
          </Text>
        </View>
      </View>
      <View style={{ position: "absolute", width: "100%", bottom: 20 }}>
        <TouchableOpacity style={styles.Btn} onPress={choosUsername}>
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
    </ImageBackground>
  );
};

export default UserNameScreen;

const styles = StyleSheet.create({
  Wrapper: {
    position: "absolute",
    color: "#FFFFF",
    top: 0,
    width: "100%",
    paddingTop: 14,
  },
  Wrraper: {
    paddingHorizontal: 16,
    marginTop: 25,
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
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 31,
    backgroundColor: "#5F66FD",
    justifyContent: "center",
    alignItems: "center",
  },
  userNameInputWrraper: {
    marginTop: 24,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  userNameInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#FFFFFF",
  },
});
