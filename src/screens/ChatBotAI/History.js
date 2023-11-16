import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { MaterialIcons, SimpleLineIcons, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GradientCard from "../../components/GradientCard";
import { HeaderBar } from "../../components/HeaderBar";
import { navigationKeys } from "../../actions";
import { getChatHistorys } from "../../actions/chatbotAction";
import { useAppStore } from "../../store";
export default ChatBotAI3Screen = ({ navigation }) => {
  const userinfo = useAppStore((state) => state.userinfo);
  const [chatHistorys, setChatHistorys] = useState([]);
  const [detailId, setDetailId] = useState(-1);
  useEffect(() => {
    getChatHistorys(userinfo._id)
      .then((res) => {
        setChatHistorys(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <HeaderBar
          navigation={navigation}
          title={
            <>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "500",
                  marginLeft: 5,
                  marginRight: 4,
                }}
              >
                Conversation
              </Text>
              <Image
                source={require("../../assets/images/wave.png")}
                style={{ width: 24, height: 24 }}
              />
            </>
          }
          item={
            <TouchableOpacity>
              <Entypo name="chat" size={24} color="#BB98F3" />
            </TouchableOpacity>
          }
          isTitleElement={true}
        />

        <ScrollView overScrollMode="never" style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: 16,
              width: "100%",
            }}
          >
            {chatHistorys.map((c, i) => (
              <GradientCard
                colors={["#3743A7", "#091269"]}
                style={styles.conversationWraper}
                key={i}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(navigationKeys.CHATBOTROOM, {
                      historyId: c._id,
                    })
                  }
                >
                  <View style={{ flexDirection: "column", width: "90%" }}>
                    <Text style={styles.conversationTitle}>
                      {(c.history[0] &&
                        c.history[0].content.substring(0, 30) + "...") ||
                        ""}
                    </Text>
                    <Text style={styles.conversationContant}>
                      {c.history[1]
                        ? detailId === i
                          ? c.history[1].content
                          : c.history[1].content.substring(0, 55) + "..."
                        : ""}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginRight: 8,
                  }}
                  onPress={() => setDetailId(detailId !== i ? i : -1)}
                >
                  <Entypo name="dots-three-vertical" size={14} color="white" />
                </TouchableOpacity>
              </GradientCard>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 16,
            marginTop: 32,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
            You have {userinfo.availableMessages} free message left.
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => {
              navigation.navigate(navigationKeys.MEMBERSHIP);
            }}
          >
            <Text
              style={{
                color: "#8F9CF9",
                fontSize: 14,
                borderBottomColor: "#8F9CF9",
                borderBottomWidth: 1,
              }}
            >
              Go Premium
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 70,
            marginHorizontal: 14,
            marginTop: 8,
            borderRadius: 24,
            backgroundColor: "#ECECEC",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SimpleLineIcons name="paper-clip" size={24} color="#605F5F" />
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() =>
              navigation.navigate(navigationKeys.CHATBOTROOM, {
                historyId: "",
              })
            }
          >
            <TextInput
              placeholder="+ New Chat"
              style={{ fontSize: 14 }}
              editable={false}
            ></TextInput>
          </TouchableOpacity>
          {/* <View
            style={{
              borderRadius: 50,
              backgroundColor: "#8F9CF9",
            }}
            // onPressIn={startRecording}
            // onPressOut={stopRecording}
          >
            <TouchableOpacity>
              <MaterialIcons name="keyboard-voice" size={28} color="#555555" />
            </TouchableOpacity>
          </View> */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conversationWraper: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conversationTitle: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: "white",
  },
  conversationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: "white",
  },
});
