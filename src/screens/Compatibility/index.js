import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

import { useEffect } from "react";
import { navigationKeys } from "../../actions";
import SpeechToTextComponent from "../../components/SpeechToText";
import { HeaderBar } from "../../components/HeaderBar";

export default SearchScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const [result, setResult] = useState("");
  const [query, setQuery] = useState("");

  return (
    <ScrollView
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <LinearGradient
        colors={["#040D2A", "#061443", "#061A5E", "#051030"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0,
          y: 1,
        }}
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <HeaderBar
          navigation={navigation}
          title={"Search your friend"}
          // item={
          //   <TouchableOpacity
          //     onPress={() => {
          //       navigation.push(navigationKeys.SEARCHFRIEND);
          //     }}
          //   >
          //     <Text
          //       style={{
          //         fontSize: 17,
          //         fontWeight: 400,
          //         color: "#FFFFFF",
          //       }}
          //     >
          //       ADD
          //     </Text>
          //   </TouchableOpacity>
          // }
        />

        {/* <ScrollView overScrollMode="never" style={{ flex: 1 }}> */}
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 16,
            paddingVertical: 21,
          }}
        >
          <View style={{ flexDirection: "row", position: "relative" }}>
            <TextInput
              style={{
                borderRadius: 10,
                backgroundColor: "#ECECEC",
                borderTopLeftRadius: 0,
                elevation: 0,
                fontSize: 14,
                width: "100%",
                padding: 10,
              }}
              onChangeText={(text) => setResult(text)}
              placeholder="Search"
            />
            <View
              style={{
                borderRadius: 50,
                backgroundColor: "#8F9CF9",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <SpeechToTextComponent handleQuery={setQuery} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 10,
              marginVertical: 16,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#A19D9D",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}>
              Quick Add
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/LockIcon.png")}
                  style={{ width: 18, height: 18 }}
                ></Image>
                <Text style={{ color: "#FFFFFF", marginLeft: 5 }}>
                  Add a custom friend chart
                </Text>
              </View>
              <Ionicons
                style={{
                  color: "#FFFFFF",
                }}
                name="arrow-forward"
                size={16}
                color="black"
              />
            </View>
          </View>
          <ScrollView style={{ height: "47%" }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginVertical: 10,
                paddingVertical: 20,
              }}
            >
              <Text style={{ color: "#8F9CF9", fontSize: 18, fontWeight: 400 }}>
                See how compatible you are
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#FFFFFF",
                  marginTop: 10,
                  textAlign: "center",
                  lineHeight: 25,
                }}
              >
                Add friends to see their charts, understand which planets are
                affecting their life right now, and see how compatible you are.
              </Text>
              <Image
                source={require("../../assets/images/compatible.png")}
                style={{ marginTop: 21, width: 205, height: 163 }}
              ></Image>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.push(navigationKeys.ADDFRIEND)}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 36,
              backgroundColor: "#5F66FD",
              paddingVertical: 14,
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
              Add friends
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userCardWrapper: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 31,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    width: "90%",
    top: -157,
  },
  userAvatar: {
    flexDirection: "row",
    borderRadius: 110,
    width: 110,
    height: 110,
    alignItems: "center",
    position: "absolute",
    top: -50,
  },
  userWrapper: {
    width: "100%",
  },
  username: {
    // color: "#FFFFFF",
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
  },
  userItems: {
    flexDirection: "row",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  controlWrapper: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "column",
    marginVertical: 95,
  },
  inputGroup: {
    flexDirection: "column",
    marginVertical: 7,
  },
  Input: {
    // color: "#FFFFFF",
    fontSize: 16,
    // fontWeight: 400,
    // marginLeft: 5,
    width: "100%",
    // height: 100,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    padding: 8,
    height: 48,
  },
  switchWrraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    height: 24,
    alignItems: "center",
  },
});
