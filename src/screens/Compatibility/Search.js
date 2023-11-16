import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import * as Contacts from "expo-contacts";

import { useEffect } from "react";
import SpeechToTextComponent from "../../components/SpeechToText";
import { HeaderBar } from "../../components/HeaderBar";
import { deleteFriend, getFriends } from "../../actions/friendAction";
import { useAppStore } from "../../store";
import { navigationKeys } from "../../actions";

export default SearchFriendScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [result, setResult] = useState("");
  const [friends, setFriends] = useState([]);
  const [query, setQuery] = useState("");
  const userinfo = useAppStore((state) => state.userinfo);

  const addFriend = () => {
    navigation.push(navigationKeys.ADDFRIEND);
  };

  const remove = async (id) => {
    try {
      var res = await deleteFriend(userinfo._id, id);
      if (res.data.success) {
        setFriends(friends.filter((f) => f._id == id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends(userinfo._id)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
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
      style={{ width: "100%", height: "100%" }}
    >
      <HeaderBar navigation={navigation} title={"Search friend"} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 21,
          height: "95%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            borderColor: "#A19D9D",
          }}
        >
          <TextInput
            style={{
              borderRadius: 10,
              borderTopLeftRadius: 0,
              backgroundColor: "#ECECEC",
              padding: 10,
              width: "100%",
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
        <ScrollView overScrollMode="never" style={{ marginVertical: 15 }}>
          {friends.map((item, i) => {
            return (
              <View style={styles.userWrraper} key={i}>
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}
                >
                  @{item.username}
                </Text>
                <View style={styles.userContainer}>
                  <View style={{ flexDirection: "row", width: "80%" }}>
                    <View style={styles.userItem}>
                      <MaterialCommunityIcons
                        name="record-circle-outline"
                        size={14}
                        color="white"
                      />
                      <Text style={styles.userItemText}>Aries</Text>
                    </View>
                    <View style={styles.userItem}>
                      <Ionicons name="moon-outline" size={14} color="white" />
                      <Text style={styles.userItemText}>Aries</Text>
                    </View>
                    <View style={styles.userItem}>
                      <MaterialCommunityIcons
                        name="arrow-up"
                        size={14}
                        color="white"
                      />
                      <Text style={styles.userItemText}>Leo</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => remove(item._id)}
                    style={{
                      backgroundColor: "#8F9CF9",
                      borderRadius: 10,
                      paddingHorizontal: 14,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "white" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 80,
            backgroundColor: "#5F66FD",
            borderWidth: 1,
            borderRadius: 36,
            paddingVertical: 14,
            width: "100%",
            marginTop: 10,
          }}
          onPress={addFriend}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  userWrraper: {
    flexDirection: "column",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#A19D9D",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
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
  userItemText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 400,
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
