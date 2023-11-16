import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
  SimpleLineIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import SpinnerOverlay from "react-native-loading-spinner-overlay";

import { useEffect, useRef, useState } from "react";
import { HeaderBar } from "../../components/HeaderBar";
import { getChatHistory, aiAnswer } from "../../actions/chatbotAction";
import { useAppStore } from "../../store";
import SpeechToTextComponent from "../../components/SpeechToText";
import { Keyboard } from "react-native";
import { navigationKeys } from "../../actions";

export default ChatBotAI2Screen = ({ navigation, route }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const userinfo = useAppStore((state) => state.userinfo);
  const setUserInfo = useAppStore((state) => state.setUserinfo);
  const [chatBotHistory, setChatBotHistory] = useState({
    _id: route.params.historyId,
    userid: userinfo._id,
    question,
    history: [],
  });
  const [question, setQuestion] = useState("");
  const scrollViewRef = useRef(null);

  const queryChat = () => {
    setIsLoading(true);
    chatBotHistory.history.push({ isQuestion: true, content: question });
    setChatBotHistory({ ...chatBotHistory });
    aiAnswer(userinfo._id, chatBotHistory._id, question)
      .then((res) => {
        if (chatBotHistory._id == "") chatBotHistory._id = res.data.historyId;

        chatBotHistory.history.push({
          isQuestion: false,
          content: res.data.content,
        });

        setChatBotHistory({ ...chatBotHistory });

        setQuestion("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    setUserInfo({
      ...userinfo,
      availableMessages: userinfo.availableMessages - 1,
    });
  };

  useEffect(() => {
    getChatHistory(userinfo._id, chatBotHistory._id)
      .then((res) => {
        setChatBotHistory(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  }, [chatBotHistory]);

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
              Chatbot AI
            </Text>
            <Image
              source={require("../../assets/images/wave.png")}
              style={{ width: 24, height: 24 }}
            />
          </>
        }
        item={
          <TouchableOpacity>
            <Entypo name="chat" size={24} color="white" />
          </TouchableOpacity>
        }
        isTitleElement={true}
      />

      <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 16,
            width: "100%",
          }}
        >
          {chatBotHistory.history.map((chat, i) => {
            return chat.isQuestion ? (
              <View key={i} style={[styles.chatCard, styles.chatCardRight]}>
                <Text style={[styles.chatText, styles.right]}>
                  {chat.content}
                </Text>
              </View>
            ) : (
              <View key={i} style={[styles.chatCard, styles.chatCardLeft]}>
                <Text style={[styles.chatText, styles.left]}>
                  {chat.content}
                </Text>
              </View>
            );
          })}

          <SpinnerOverlay
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
            animation="fade"
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          You have {userinfo.availableMessages} free message left.
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 5,
          }}
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
          marginBottom: isKeyboardVisible ? 20 : 80,
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
        <TextInput
          placeholder="Today’s astrology"
          value={question}
          onChangeText={setQuestion}
          style={{ fontSize: 14, width: "70%" }}
          editable={userinfo.availableMessages > 0}
        ></TextInput>

        <SpeechToTextComponent handleQuery={setQuestion} />
        <View
          style={{
            borderRadius: 50,
            // backgroundColor: "#8F9CF9",
          }}
          // onPressIn={startRecording}
          // onPressOut={stopRecording}
        >
          <TouchableOpacity onPress={queryChat}>
            <FontAwesome name="send-o" size={20} color="#555555" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 16,
  },
  chatCardLeft: {
    justifyContent: "flex-start",
  },
  chatCardRight: {
    justifyContent: "flex-end",
  },
  chatText: {
    padding: 10,
    fontSize: 11,
    fontWeight: 300,
    borderRadius: 10,
    maxWidth: 204,
    lineHeight: 20,
  },
  left: {
    backgroundColor: "#ECECEC",
    borderTopLeftRadius: 0,
  },
  right: {
    backgroundColor: "#BB98F3",
    borderBottomRightRadius: 0,
  },
});
