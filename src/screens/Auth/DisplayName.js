import React, { useState } from "react";

import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { navigationKeys } from "../../actions";
import { useAppStore } from "../../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const DisplaySetScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const insets = useSafeAreaInsets();

  const [color, setColor] = useState("");
  const [fullName, setFullName] = useState("");
  const userinfo = useAppStore((state) => state.userinfo);
  const setUserinfo = useAppStore((state) => state.setUserinfo);

  const displayName = () => {
    userinfo.color = color;
    userinfo.fullname = fullName;
    setUserinfo(userinfo);
    navigation.navigate(navigationKeys.USERNAME);
  };
  return (
    <ScrollView>
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
              paddingBottom: 20,
              paddingTop: insets.top,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={navigation.goBack}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "400",
                marginLeft: 15,
              }}
            >
              Display Name
            </Text>
          </View>

          <View style={{ ...styles.Wrraper, marginTop: 0 }}>
            <View style={styles.InputWrraper}>
              <Text style={{ color: "white", fontSize: 14, fontWeight: 300 }}>
                Favourite color
              </Text>
              <TextInput
                style={styles.imputStyle}
                placeholder="Blue"
                placeholderTextColor={"#FFFFFF"}
                onChangeText={(newText) => setColor(newText)}
                value={color}
              />
            </View>
            <View style={{ ...styles.InputWrraper, marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "white", fontSize: 14, fontWeight: 300 }}>
                  Display Name
                </Text>
              </View>

              <TextInput
                style={styles.imputStyle}
                placeholder="Your Full Name"
                placeholderTextColor={"#FFFFFF"}
                onChangeText={(newText) => setFullName(newText)}
                value={fullName}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 300 }}
                >
                  Your display name helps
                </Text>
                <Text
                  style={{
                    color: "#8F9CF9",
                    fontSize: 14,
                    fontWeight: 300,
                    paddingHorizontal: 5,
                  }}
                >
                  friends recognize
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 300,
                  }}
                >
                  you on the app
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 20 }}>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              displayName();
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                width: "100%",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default DisplaySetScreen;

const styles = StyleSheet.create({
  Wrapper: {
    position: "absolute",
    color: "#FFFFF",
    top: 0,
    width: "100%",
    paddingTop: 10,
  },
  Wrraper: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  Input: {
    width: 74,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFF00",
    borderWidth: 0.5,
  },
  Btn: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 36,
    backgroundColor: "#5F66FD",
    borderWidth: 0.6,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 280,
  },
  InputWrraper: {
    marginTop: 14,
  },
  imputStyle: {
    fontSize: 16,
    // height: 45,
    paddingVertical: 13,
    marginTop: 10,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    fontWeight: "300",
    paddingHorizontal: 10,
    color: "#FFFFFF",
  },
});
