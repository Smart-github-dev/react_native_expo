import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import GradientCard from "../../components/GradientCard";
import { HeaderBar } from "../../components/HeaderBar";
import moment from "moment";
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const d = new Date();
const months = [
  31,
  d.getFullYear() % 4 == 0 ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
export default TimingScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  const insets = useSafeAreaInsets();

  const [dailyData, setDailyData] = useState([]);

  const getDailyData = () => {
    var dailydata = [];
    for (var i = -2; i < 3; i++) {
      var d = new Date();
      var today = d.getDay();
      var todate = d.getDate();
      var tomonth = d.getMonth();
      var date = todate;
      var day = today;
      var month = tomonth;
      date = todate + i;
      if (todate + i < 1) {
        if (tomonth == 0) {
          month = 11;
        }
        d.setMonth(month);
        date = months[month] + i;
      } else if (todate + i > months[tomonth]) {
        if (tomonth == 11) {
          month = 0;
        }
        d.setMonth(month);
        date = months[month] + i;
      }
      d.setDate(date);
      day = d.getDay();

      dailydata.push({
        date,
        day,
        isToday: date === todate,
        isActive: date === todate,
      });
    }
    setDailyData(dailydata);
  };

  useEffect(() => {
    getDailyData();
  }, []);
  return (
    <ScrollView style={{ width: windowWidth, height: windowHeight }}>
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
        <HeaderBar
          navigation={navigation}
          title={"Timing"}
          item={
            <TouchableOpacity>
              <Entypo name="chat" size={24} color="#BB98F3" />
            </TouchableOpacity>
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 0,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#FFFFFF",
              marginRight: 20,
            }}
          >
            Key dates that impact your life & the world
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#101E4A",
            paddingVertical: 7,
            marginTop: 20,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "white",
                paddingHorizontal: 6,
                borderBottomWidth: 2,
                borderBottomColor: "#BB98F3",
              }}
            >
              {moment().format("MMMM")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {dailyData.map((data, i) => {
              return (
                <View style={{ flexDirection: "column", height: 40 }} key={i}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      flex: 1,
                      fontSize: 10,
                      fontWeight: 400,
                    }}
                  >
                    {data.isToday ? "Today" : days[data.day]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDailyData(
                        dailyData.map((item) => {
                          if (item.date == data.date) {
                            item.isActive = true;
                          } else {
                            item.isActive = false;
                          }
                          return item;
                        })
                      );
                    }}
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.day,
                        data.isActive && styles.activeDay,
                        data.isToday && styles.today,
                      ]}
                    >
                      {data.date}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            padding: 16,
            paddingBottom: 60,
            marginBottom: 30,
          }}
        >
          <GradientCard
            colors={["#3743A7", "#091269"]}
            style={{
              flexDirection: "column",
              borderRadius: 8,
              padding: 10,
              marginVertical: 15,
              paddingHorizontal: 17,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "white",
                borderBottomWidth: 0.6,
              }}
            >
              <View style={{ flexDirection: "column", paddingVertical: 3 }}>
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "700" }}
                >
                  Reality Check
                </Text>
                <Text
                  style={{ color: "white", fontSize: 9, fontWeight: "700" }}
                >
                  Your timing
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 15 }}>
              <View>
                <Image
                  source={require("../../assets/images/chart2.png")}
                  style={{ width: 122, height: 88 }}
                />
              </View>
              <View style={{ paddingLeft: 17 }}>
                <Text
                  style={{ fontSize: 14, color: "white", fontWeight: "700" }}
                >
                  Cycle Length
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    fontWeight: "400",
                    paddingTop: 5,
                  }}
                >
                  Feb 28, 2023 to Nov 4, 2023
                </Text>
              </View>
            </View>
          </GradientCard>
          <GradientCard
            colors={["#3743A7", "#091269"]}
            style={{
              flexDirection: "column",
              borderRadius: 8,
              padding: 10,
              paddingHorizontal: 17,
              marginVertical: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "white",
                borderBottomWidth: 0.6,
              }}
            >
              <View style={{ flexDirection: "column", paddingVertical: 3 }}>
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "700" }}
                >
                  Freedom from the Known
                </Text>
                <Text
                  style={{ color: "white", fontSize: 9, fontWeight: "700" }}
                >
                  Your timing
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 15 }}>
              <View>
                <Image
                  source={require("../../assets/images/chart1.png")}
                  style={{ width: 122, height: 88 }}
                />
              </View>
              <View style={{ paddingLeft: 17 }}>
                <Text
                  style={{ fontSize: 14, color: "white", fontWeight: "700" }}
                >
                  Cycle Length
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    fontWeight: "400",
                    paddingTop: 5,
                  }}
                >
                  Jun 2, 2023 to Apr 10, 2024
                </Text>
              </View>
            </View>
          </GradientCard>
        </View>
      </LinearGradient>
    </ScrollView>
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
  day: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 400,
    padding: 1,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "transparent",
  },
  today: {
    backgroundColor: "#BB98F3",
    color: "#000000",
    borderWidth: 1,
  },
  activeDay: {
    borderColor: "#BB98F3",
    borderWidth: 1,
  },
});
