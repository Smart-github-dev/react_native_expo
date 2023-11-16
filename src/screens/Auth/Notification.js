import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { useAppStore } from "../../store";
import { navigationKeys } from "../../actions";

const NotificationScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  return (
    <ImageBackground
      source={require("../../assets/images/loginBG.png")}
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <View style={{ ...styles.Wrapper, marginTop: 10 }}>
        <View
          style={{
            width: "100%",
            paddingLeft: 20,
            //   paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "500",
              marginLeft: 24,
            }}
          >
            Push notifications
          </Text>
        </View>

        <View style={styles.Wrraper}>
          <Text style={styles.title}>Accept Push Notification</Text>
          <Text style={styles.nofication}>
            Find out when friends add you know exactly what you should expect
            each day.
          </Text>
          <Image
            source={require("../../assets/images/notificationBg.png")}
            style={{ marginTop: 32, width: 236, height: 203 }}
          ></Image>
          <Text style={styles.Btn} onPress={() => navigation.navigate("Email")}>
            TURN ON NOTIFICATION
          </Text>
          <Text
            style={{ ...styles.Btn, marginTop: 24, borderColor: "#FFFFFF" }}
            onPress={() => navigation.navigate(navigationKeys.RESETPASSWORD)}
          >
            SKIP
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  // Wrapper: {
  //   color: "#FFFFF",
  //   paddingTop: 14,
  // },
  Wrraper: {
    paddingHorizontal: 10,
    marginTop: 34,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 400,
    textAlign: "center",
  },
  nofication: {
    marginTop: 24,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 300,
    textAlign: "center",
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
    borderRadius: 10,
    borderColor: "#FDE74D",
    borderWidth: 0.7,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
    alignItems: "center",
    marginTop: 60,
    width: 328,
  },
});
