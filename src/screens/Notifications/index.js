import { useRef } from "react";
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
  Animated,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { getNotifications } from "../../actions";
import moment from "moment";
import GradientCard from "../../components/GradientCard";
import { acceptResponse, rejectResponse } from "../../actions/friendAction";

export default Notifications = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifys] = useState([]);
  const userInfo = useAppStore((state) => state.userinfo);
  const [detailIndex, setDetailIndex] = useState(-1);

  const animateFade = useRef(new Animated.Value(0)).current;

  const animation = () => {
    animateFade.setValue(0);
    Animated.timing(animateFade, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const getNotificationData = async () => {
    try {
      const result = await getNotifications(userInfo._id);
      if (result.data.success) {
        setNotifys(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAccept = async (id, notifyId) => {
    try {
      var res = await acceptResponse(userInfo._id, id, notifyId);
      if (res.data.success) {
        // notifications
        setNotifys(
          notifications.filter((n) => {
            return n._id !== notifyId;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (id, notifyId) => {
    try {
      var res = await rejectResponse(userInfo._id, id, notifyId);
      if (res.data.success) {
        // notifications
        setNotifys(
          notifications.filter((n) => {
            return n._id !== notifyId;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    animation();
  }, [detailIndex]);
  useEffect(() => {
    getNotificationData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#071952", "#061443", "#061A5E", "#051030"]}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: insets.top,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={navigation.goBack}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 5,
                marginRight: 4,
              }}
            >
              Notifications
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView overScrollMode="never" style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: 16,
              paddingBottom: 70,
              // marginTop: 50,
              width: "100%",
            }}
          >
            {notifications.map((c, i) => (
              <GradientCard style={styles.conversationWraper} key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.notificationTitle}>{c.title}</Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: 300, color: "white" }}
                  >
                    {moment(c.createdAt).format("DD/MM/YY hh:mm ")}
                  </Text>
                </View>
                {c.title == "friend request" ? (
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={styles.notificationContant}>
                      {c.receiver} has a friend request.
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 8,
                          borderRadius: 14,
                          backgroundColor: "#5F66FD",
                        }}
                        onPress={() => onAccept(c.content, c._id)}
                      >
                        <Text style={{ fontSize: 14, color: "white" }}>
                          accept
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 8,
                          borderRadius: 14,
                          backgroundColor: "#5F66FD",
                        }}
                        onPress={() => onReject(c.content, c._id)}
                      >
                        <Text style={{ fontSize: 14, color: "white" }}>
                          reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <Animated.View
                      style={{ opacity: i == detailIndex ? animateFade : 1 }}
                    >
                      <Text style={styles.notificationContant}>
                        {c.content.length > 50
                          ? i == detailIndex
                            ? c.content
                            : String(c.content).substring(0, 50) + "..."
                          : c.content}
                      </Text>
                    </Animated.View>

                    {String(c.content).length > 50 && i == detailIndex ? (
                      <TouchableOpacity onPress={() => setDetailIndex(-1)}>
                        <Text style={{ color: "#FDE74D", fontSize: 13 }}>
                          Less
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setDetailIndex(i)}>
                        <Text style={{ color: "#FDE74D", fontSize: 13 }}>
                          More
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </GradientCard>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conversationWraper: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
    flexDirection: "column",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: -0.17,
    color: "white",
  },
  notificationContant: {
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: -0.17,
    lineHeight: 22,
    color: "white",
  },
});
