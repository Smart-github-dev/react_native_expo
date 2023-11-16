import { LinearGradient } from "expo-linear-gradient";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  // SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  // MaterialIcons,
  SimpleLineIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
// import { useAppStore } from "../../store";
import { navigationKeys } from "../../actions";
import GradientCard from "../../components/GradientCard";
import SpeechToTextComponent from "../../components/SpeechToText";
import { HeaderBar } from "../../components/HeaderBar";
import { getQuestionList } from "../../actions/chatbotAction";

export default ChatBotAIScreen = ({ navigation }) => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [query, setQuery] = useState("");
  const [questionShow, setQuestionShow] = useState("");

  const [chatHistory, addChatHistory] = useState("");

  useEffect(() => {
    getQuestionList()
      .then((res) => {
        setNumbers(res.data);
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
      <HeaderBar
        navigation={navigation}
        title={
          <>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "500",
                marginLeft: 8,
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
          <TouchableOpacity
            onPress={() => navigation.push(navigationKeys.CHATBOTHISTORY)}
          >
            <Entypo name="chat" size={24} color="white" />
          </TouchableOpacity>
        }
        isTitleElement={true}
      />

      <View
        style={{
          flexDirection: "row",
          position: "relative",
          paddingHorizontal: 16,
          marginVertical: 15,
        }}
      >
        <TextInput
          placeholder="Hi.you can ask me anything"
          style={{
            borderRadius: 10,
            borderTopLeftRadius: 0,
            backgroundColor: "#ECECEC",
            width: "100%",
            padding: 10,
            fontSize: 14,
          }}
        ></TextInput>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "#8F9CF9",
            position: "absolute",
            right: 25,
            top: 10,
          }}
        >
          <SpeechToTextComponent handleQuery={setQuery} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#FFFFFF",
          paddingHorizontal: 16,
          marginVertical: 15,
        }}
      >
        I suggest you some topics you cam ask me.
      </Text>
      <ScrollView overScrollMode="never" style={{ height: "40%" }}>
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 16,
          }}
        >
          {numbers.map((num) => (
            <GradientCard
              key={num}
              colors={["#3C48AC", "#081168"]}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 10,
                borderRadius: 8,
                flexDirection: "column",
              }}
            >
              <TouchableOpacity
                onPress={() => setQuestionShow(num === questionShow ? "" : num)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white" }}>Question number {num}</Text>

                  {num === questionShow ? (
                    <Entypo name="chevron-down" size={20} color="white" />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="white" />
                  )}
                </View>
              </TouchableOpacity>

              {num === questionShow && (
                <View style={{ padding: 5 }}>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    It correctly bundles React in production mode and optimizes
                    the build for the best performance. The build is minified
                    and the filenames include the hashes. Your app is ready to
                    be deployed!
                  </Text>
                </View>
              )}
            </GradientCard>
          ))}
        </View>
      </ScrollView>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 32,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
          You have 4 free message left.
        </Text>
        <Text
          style={{
            color: "#8F9CF9",
            fontSize: 14,
            borderBottomColor: "#8F9CF9",
            borderBottomWidth: 1,
            marginLeft: 5,
          }}
        >
          Go Premium
        </Text>
      </View> */}
      <View
        style={{
          marginBottom: 80,
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
          onPress={() => navigation.push(navigationKeys.CHATBOTHISTORY)}
        >
          <TextInput
            placeholder="Type a message"
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
  );
};
