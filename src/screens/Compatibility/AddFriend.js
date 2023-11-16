import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { DEFAULT_THEME, Flag } from "react-native-country-picker-modal";
import * as Contacts from "expo-contacts";
import { useAppStore } from "../../store";
import SpeechToTextComponent from "../../components/SpeechToText";
import { getAllContactList, addRequest } from "../../actions/friendAction";
import { HeaderBar } from "../../components/HeaderBar";

export default AddFriendScreen = ({ navigation }) => {
  const [result, setResult] = useState("");
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [showType, setShowType] = useState("quick");
  const [query, setQuery] = useState("");
  const [friendPhoneNumber, setFriendPhoneNumber] = useState("");
  const [friendManualRequestResult, setFriendManualRequestResult] = useState({
    success: true,
    message: "",
  });

  const userinfo = useAppStore((state) => state.userinfo);

  const getContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
        }
        setContacts(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriendManually = async () => {
    const friend = allContacts.find(
      (contact, ind) => contact.phonenumber === friendPhoneNumber
    );
    if (friend) {
      const res = await addRequest(userinfo._id, friend._id);
      if (res.data.success) {
        setFriendManualRequestResult({
          success: true,
          message: "Sent friend request!",
        });
        setContacts(
          contacts.map((user) => {
            if (user.phonenumber == friendPhoneNumber) {
              user.pending = true;
            }
            return user;
          })
        );
      } else {
        setFriendManualRequestResult({
          success: false,
          message: res.data.message,
        });
      }
    } else {
      setFriendManualRequestResult({
        success: false,
        message: "Friend does not exists",
      });
    }
  };

  const sendFriendRequest = async (otherid) => {
    try {
      const res = await addRequest(userinfo._id, otherid);
      setContacts(
        contacts.map((user) => {
          if (user._id == otherid) {
            user.pending = true;
          }
          return user;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUserItems = () => {
    const _contacts = contacts
      .filter((contact) => {
        return contact.username.indexOf(query) > -1;
      })
      .slice(0, showType === "quick" ? 10 : undefined);

    if (showType === "quick" || showType === "contact")
      return _contacts.map((user, index) => (
        <View style={styles.userWrraper} key={index}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}>
              {user.fullname}
            </Text>
            <Text style={{ color: "#C6C6C7", fontSize: 14, fontWeight: 400 }}>
              @{user.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.userContainer}>
              <View>
                <Text style={styles.userItemText}>In your contacts</Text>
              </View>

              <TouchableOpacity
                onPress={() => sendFriendRequest(user._id)}
                disabled={user.pending}
                style={{
                  backgroundColor: "#8F9CF9",
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ fontSize: 14, color: "white" }}>
                  {user.pending ? "pending" : "ADD"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ));
    else if (showType === "contact") {
      return _contacts.map((item, index) => {
        return (
          <View style={styles.userWrraper} key={index}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ color: "#C6C6C7", fontSize: 14, fontWeight: 400 }}>
                @user 001
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.userContainer}>
                <View>
                  <Text style={styles.userItemText}>In your contacts</Text>
                </View>

                <TouchableOpacity
                  onPress={() => sendFriendRequest(item._id)}
                  disabled={item.pending}
                  style={{
                    backgroundColor: "#8F9CF9",
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 14, color: "white" }}>
                    {item.pending ? "pending" : "ADD"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      });
    } else if (showType === "manually") {
      return (
        <View>
          {/* <View style={styles.inputGroup}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFF",
                padding: 8,
              }}
            >
              Username
            </Text>
            <TextInput
              placeholder="user"
              placeholderTextColor={"#FFFFFF"}
              style={{
                fontSize: 16,
                color: "#FFFFFF",
                paddingVertical: 10,
                paddingHorizontal: 8,
                borderColor: "#FFFFFF",
                borderWidth: 1,
              }}
            />
          </View> */}
          <View style={styles.inputGroup}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFF",
                padding: 8,
              }}
            >
              Phone Number
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: friendManualRequestResult.success
                  ? "#FFFFFF"
                  : "#f22f46",
              }}
            >
              {friendManualRequestResult.message}
            </Text>
            <PhoneInput
              defaultCode="US"
              layout="first"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#FFFFFF"
              withDarkTheme
              withShadow
              autoFocus
              textContainerStyle={{
                backgroundColor: "transparent",
                fontSize: 16,
                color: "#FFFFFF",
                paddingVertical: 10,
                paddingHorizontal: 3,
              }}
              textInputStyle={{
                borderColor: "#FFFFFF",
                borderLeftWidth: 1,
                paddingLeft: 3,
                fontSize: 16,
                paddingLeft: 8,
                backgroundColor: "transparent",
                color: "#FFFFFF",
              }}
              containerStyle={{
                width: "100%",
                backgroundColor: "transparent",
                borderColor: "#FFFFFF",
                borderWidth: 1,
                alignItems: "center",
              }}
              textInputProps={{
                keyboardType: "phone-pad",
                placeholderTextColor: "#FFFFFF",
              }}
              codeTextStyle={{
                color: "#FFFFFF",
                marginRight: 3,
                marginLeft: -20,
              }}
              disableArrowIcon={true}
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
              onChangeText={(text) => {
                setFriendPhoneNumber(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#5F66FD",
              borderRadius: 67,
              paddingVertical: 14,
              marginBottom: 70,
              marginVertical: 20,
              width: "100%",
            }}
            onPress={addFriendManually}
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
      );
    }
  };

  useEffect(() => {
    setFriendManualRequestResult({ success: true, message: "" });
  }, [friendPhoneNumber]);

  useEffect(() => {
    setFriendManualRequestResult({ success: true, message: "" });
    if (showType == "quick") {
      getAllContactList(userinfo._id)
        .then((res) => {
          setAllContacts(res.data);
          setContacts(res.data.slice(0, 10));
        })
        .catch((err) => {
          console.log("=================>get contacts", err);
        });
    } else if (showType == "contact") {
      // getContacts();
      setContacts([...allContacts]);
    } else if (showType == "manually") {
    }
  }, [showType]);

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
        style={{ width: "100%", height: windowHeight }}
      >
        <HeaderBar navigation={navigation} title={"Add friend"} />

        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 16,
            paddingVertical: 21,
            height: "93%",
          }}
        >
          <View style={{ flexDirection: "row", position: "relative" }}>
            <TextInput
              style={{
                borderRadius: 10,
                borderTopLeftRadius: 0,
                padding: 10,
                backgroundColor: "#ECECEC",
                width: "100%",
              }}
              onChangeText={(text) => setResult(text)}
              placeholder="Search"
              iconColor="grey"
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
          <TouchableOpacity
            onPress={() => setShowType("contact")}
            style={{
              flexDirection: "row",
              borderColor: "#5D5F73",
              borderTopWidth: 1,
              paddingVertical: 6,
              marginTop: 18,
            }}
          >
            <AntDesign name="contacts" size={18} color="#F79F00" />
            <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 5 }}>
              Add from contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowType("manually")}
            style={{
              flexDirection: "row",
              borderColor: "#5D5F73",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingVertical: 6,
              marginBottom: 8,
            }}
          >
            <MaterialIcons name="lock" size={18} color="#F79F00" />
            <Text style={{ color: "#FFFFFF", fontSize: 14, marginLeft: 5 }}>
              Add manually
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              {showType === "quick" && "Quick add"}
              {showType === "contact" && "Contact add"}
              {showType === "manually" && "Manually add"}
            </Text>
          </View>
          <ScrollView overScrollMode="never">
            <View
              style={{
                flexDirection: "column",
                marginVertical: 10,
              }}
            >
              {getUserItems()}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </ScrollView>
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
