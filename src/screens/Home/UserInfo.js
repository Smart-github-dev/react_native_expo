import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
} from "react-native";
import {
  MaterialIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";

import mindfulness from "../../assets/images/mindfulness.png";
import { useAppStore } from "../../store";
import { SERVER_BASE_URL } from "../../actions";
import { Avatar } from "react-native-paper";
import GradientCard from "../../components/GradientCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getPlanetsReport,
  getPlanets,
  getPrediction,
} from "../../actions/horoscopeAction";

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
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const UpdatesScreen = ({ navigatekey, animatedStyle }) => {
  const [tabSelection, selectTab] = useState(navigatekey);

  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [wasThisUseful, setWasThisUseful] = useState(0);

  const [predictionItems, setPredictionItems] = useState([]);

  const [detailId, setDetailId] = useState(-1);
  const items = [
    { img: require("../../assets/images/mindfulness.png") },
    { img: require("../../assets/images/day-and-night.png") },
    { img: require("../../assets/images/brain.png") },
    { img: require("../../assets/images/hearts.png") },
    { img: require("../../assets/images/work.png") },
    { img: require("../../assets/images/difficulties.png") },
    { img: require("../../assets/images/life.png") },
  ];

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

  const getWeeklyData = () => {
    var data = [];
    for (var i = 0; i < 4; i++) {
      data.push({
        data: i + 1 + "week",
        isActive: i == 1,
      });
    }

    setWeeklyData(data);
  };

  const getMonthlyData = () => {
    var data = [];

    for (var i = -2; i < 3; i++) {
      var d = new Date();
      var m = d.getMonth();
      var tm = m + i;

      if (m + i < 0) {
        tm = 11 + i;
      } else if (m + i > 11) {
        tm = i;
      }
      data.push({
        isActive: tm == m,
        data: monthNames[tm],
      });
    }
    setMonthlyData(data);
  };

  const getYearlyData = () => {
    var data = [];
    var d = new Date();
    var toYear = d.getFullYear();
    for (var i = -2; i < 3; i++) {
      data.push({
        isActive: i == 0,
        isToYear: i == 0,
        data: toYear + i,
      });
    }
    setYearlyData(data);
  };

  const fetchPrediction = async () => {
    try {
      const zodiacName = "aries";
      const timeZone = 5.5;
      const type = "daily";

      const result = await getPrediction(zodiacName, timeZone, type);
      var _predictionItems = [];
      for (var i in result.data.data.prediction) {
        _predictionItems.push({
          title: i,
          content: result.data.data.prediction[i],
        });
      }
      setPredictionItems(_predictionItems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDailyData();
    getWeeklyData();
    getMonthlyData();
    getYearlyData();
    fetchPrediction();
  }, []);

  return (
    <Animated.View style={[{}, animatedStyle]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 10,
          backgroundColor: "#101E4A",
          borderBottomWidth: 0.3,
          borderColor: "#FDE74D",
        }}
      >
        <TouchableOpacity onPress={() => selectTab("Daily")}>
          <Text
            style={[
              styles.updateTabText,
              tabSelection === "Daily" && styles.tabActive,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectTab("Weekly")}>
          <Text
            style={[
              styles.updateTabText,
              tabSelection === "Weekly" && styles.tabActive,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectTab("Monthly")}>
          <Text
            style={[
              styles.updateTabText,
              tabSelection === "Monthly" && styles.tabActive,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectTab("Yearly")}>
          <Text
            style={[
              styles.updateTabText,
              tabSelection === "Yearly" && styles.tabActive,
            ]}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#101E4A",
        }}
      >
        {tabSelection === "Daily" &&
          dailyData.map((data, i) => {
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

        {tabSelection === "Weekly" &&
          weeklyData.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setWeeklyData(
                    weeklyData.map((data, j) => {
                      if (i == j) data.isActive = true;
                      else data.isActive = false;
                      return data;
                    })
                  );
                }}
                key={i}
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={[styles.day, item.isActive && styles.activeDay]}>
                  {item.data}
                </Text>
              </TouchableOpacity>
            );
          })}
        {tabSelection === "Monthly" &&
          monthlyData.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setMonthlyData(
                    monthlyData.map((data, j) => {
                      if (i == j) data.isActive = true;
                      else data.isActive = false;
                      return data;
                    })
                  );
                }}
                key={i}
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={[styles.day, item.isActive && styles.activeDay]}>
                  {item.data}
                </Text>
              </TouchableOpacity>
            );
          })}
        {tabSelection === "Yearly" &&
          yearlyData.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setYearlyData(
                    yearlyData.map((data, j) => {
                      if (i == j) data.isActive = true;
                      else data.isActive = false;
                      return data;
                    })
                  );
                }}
                key={i}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.day,
                    item.isActive && styles.activeDay,
                    item.isToYear && styles.today,
                  ]}
                >
                  {item.data}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <ScrollView>
        <View style={{ paddingBottom: 150, position: "relative" }}>
          <View style={{ position: "absolute", left: 20, top: -80 }}>
            <Image source={require("../../assets/images/Circlestock.png")} />
          </View>
          <View style={{ position: "absolute", left: 160, top: 10 }}>
            <Image
              source={require("../../assets/images/Vector.png")}
              style={{ width: 201, height: 189 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingTop: 58,
              paddingLeft: 16,
              paddingBottom: 16,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF" }}>
              Hello User,
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#FFFFFF",
                width: 151,
                marginTop: 10,
                lineHeight: 40,
              }}
            >
              Welcome to Aeon
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#FFFFFF",
                marginTop: 10,
              }}
            >
              LEO
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#FFFFFF" }}>
              02 MAY 2023 / 01:00 AM
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#FFFFFF" }}>
              NAPALES
            </Text>
          </View>
          <GradientCard
            colors={["#404BB0", "#091269"]}
            style={{
              flexDirection: "column",
              paddingVertical: 16,
              paddingHorizontal: 27,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 16,
              marginTop: 21,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500, color: "white" }}>
              Today
            </Text>
            <View style={{ flexDirection: "row", paddingTop: 16 }}>
              <Fontisto name="lightbulb" size={16} color="yellow" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Believe in yourself
              </Text>
            </View>

            <View style={{ flexDirection: "row", paddingTop: 16 }}>
              <MaterialCommunityIcons name="leaf" size={16} color="yellow" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Power in work and spirituality
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 16 }}>
              <Fontisto name="fire" size={16} color="yellow" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Trouble with thinking & creativity and sex & love
              </Text>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: 500,
                marginVertical: 16,
              }}
            >
              it is the nature of life that people move in and out of our
              circle. includes family members as well...
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "white" }}>
                MORE <AntDesign name="arrowright" size={14} color="white" />
              </Text>
            </TouchableOpacity>
          </GradientCard>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 35,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 400 }}>
              Was this useful?
            </Text>
            <TouchableOpacity onPress={() => setWasThisUseful(1)}>
              <AntDesign
                name="like2"
                size={18}
                style={{ padding: 8 }}
                color={wasThisUseful === 1 ? "yellow" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWasThisUseful(2)}>
              <SimpleLineIcons
                name="dislike"
                style={{ padding: 8 }}
                size={18}
                color={wasThisUseful === 2 ? "#ff24bd" : "white"}
              />
            </TouchableOpacity>
          </View>
          <GradientCard
            colors={["#3642A5", "#091269"]}
            style={{
              flexDirection: "column",
              backgroundColor: "#E5CCE3",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 42,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: "center",
                color: "white",
              }}
            >
              More about your relationship
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                maxWidth: 238,
                textAlign: "center",
                marginVertical: 5,
                color: "white",
              }}
            >
              An in-depth reading about how are in relationship.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#5F66FD",
                marginVertical: 6,
                borderRadius: 42,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 37,
                paddingVertical: 11,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  marginHorizontal: 5,
                  color: "white",
                }}
              >
                Send your future self a note
              </Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </GradientCard>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: "column",
              height: "100%",
              marginBottom: 60,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 27,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  borderColor: "#FFFFFF",
                  borderBottomWidth: 1,
                }}
              >
                Power
              </Text>
            </View>
            {/* <View style={{ width: "100%" }}> */}
            {predictionItems.map((item, i) => {
              return (
                <View
                  style={{
                    flexDirection: "column",
                    borderBottomWidth: 1,
                    borderColor: "#FFFFFF",
                    marginTop: 16,
                  }}
                  key={i}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{
                        uri: `${SERVER_BASE_URL}/predictions/${item.title}.png`,
                      }}
                      style={{ width: 62, height: 62 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        paddingHorizontal: 8,
                        color: "#FDE74D",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 14,
                      fontWeight: 300,
                      marginVertical: 16,
                      color: "#FFFFFF",
                      lineHeight: 20,
                    }}
                  >
                    {item.content.length > 100
                      ? detailId == i
                        ? item.content
                        : item.content.substring(0, 100) + "..."
                      : item.content}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginBottom: 16,
                      color: "#FDE74D",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        paddingHorizontal: 2,
                        color: "#FDE74D",
                      }}
                      onPress={() => {
                        setDetailId(detailId == i ? -1 : i);
                      }}
                    >
                      Details
                    </Text>
                    <Ionicons name="arrow-forward" size={24} color="#FDE74D" />
                  </TouchableOpacity>
                </View>
              );
            })}
            {/* </View> */}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const ChartScreen = ({ animatedStyle }) => {
  const windowWidth = Dimensions.get("screen").width;

  const [tabSelection, selectTab] = useState("table");

  const chartAnimate = useRef(new Animated.Value(-windowWidth)).current;

  const [horoscopes, setHoroscope] = useState([]);

  const [planets, setPlanets] = useState([]);
  const [detailId, setDetailId] = useState(-1);

  const slideLeft = () => {
    Animated.timing(chartAnimate, {
      toValue: -windowWidth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  const slideRight = () => {
    Animated.timing(chartAnimate, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const fetchHoroscompes = async () => {
    try {
      const result = await getPlanetsReport({});
      setHoroscope(result.data.data);

      const result1 = await getPlanets({});
      setPlanets(result1.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHoroscompes();
  }, []);

  return (
    <Animated.View style={[{}, animatedStyle]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 8,
          borderBottomWidth: 0.3,
          borderBottomColor: "#FFFFFF",
          backgroundColor: "rgba(0,0,0,0)",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (tabSelection != "natal") {
              slideRight();
              selectTab("natal");
            }
          }}
        >
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: 500,
                color: "#FFFFFF",
                paddingVertical: 8,
              },
              tabSelection === "natal" && styles.tabActive,
            ]}
          >
            NATAL CHART
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (tabSelection != "table") {
              slideLeft();

              selectTab("table");
            }
          }}
        >
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: 500,
                color: "#FFFFFF",
                paddingVertical: 8,
              },
              tabSelection === "table" && styles.tabActive,
            ]}
          >
            TABLE CHART
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flexDirection: "column", height: "100%" }}>
        <View style={{ flexDirection: "row" }}>
          <Animated.View
            style={{
              transform: [{ translateX: chartAnimate }],
              width: windowWidth,
            }}
          >
            {/* <ImageBackground
              source={require("../../assets/images/natalBg.png")}
              style={{
                position: "relative",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: windowWidth,
              }}
            > */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: windowWidth,
              }}
            >
              <Image
                source={require("../../assets/images/natalchart.png")}
                style={{ width: windowWidth, height: 360, marginTop: 35 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 36,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  alignItems: "center",
                  backgroundColor: "#5F66FD",
                  borderRadius: 36,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}
                >
                  View sample
                </Text>
              </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ translateX: chartAnimate }],
              width: windowWidth,
            }}
          >
            {/* <ImageBackground
              source={require("../../assets/images/userinfochartback.png")}
              style={{
                width: windowWidth,
                paddingVertical: 32,
                paddingHorizontal: 16,
              }}
            > */}
            <View
              style={{
                width: windowWidth,
                paddingVertical: 32,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  borderColor: "#FFFFFF",
                  justifyContent: "space-between",
                  borderWidth: 1,
                  width: windowWidth - 32,
                  // width: 328,
                  // height: 360,
                }}
              >
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>Leo</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>AC ASCENDANT</Text>
                  </View>
                  <View style={styles.col3}></View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col1}>
                    <Text style={styles.tableText}>Cancer</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>☼ SUN</Text>
                  </View>
                  <View style={styles.col3}></View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col1}></View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♀ VENUS </Text>
                  </View>
                  <View style={[styles.col3, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>01</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}></View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>☿ MERCURY </Text>
                  </View>
                  <View style={[styles.col3, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>02</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>Libra</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♂ MARS </Text>
                  </View>
                  <View style={[styles.col3, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>03</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>Sagittarius</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♃ JUPITER </Text>
                  </View>
                  <View style={styles.col3}></View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>Scorpio</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♇ PLUTO </Text>
                  </View>
                  <View style={[styles.col3, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>05</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>Aquarius</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}> MOON </Text>
                  </View>
                  <View style={styles.col3}></View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col1}>
                    <Text style={styles.tableText}>Capricorn</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♅ URANUS</Text>
                  </View>
                  <View style={styles.col3}></View>
                </View>
                <View style={styles.row}>
                  <View style={[styles.col1, styles.cellBorderBottom]}></View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♆ NEPTUNE</Text>
                  </View>
                  <View style={[styles.col3, styles.cellBorderBottom]}>
                    <Text style={styles.tableText}>07</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.col1}>
                    <Text style={styles.tableText}>Pisces</Text>
                  </View>
                  <View style={styles.col2}>
                    <Text style={styles.tableText}>♄ SATURN</Text>
                  </View>
                  <View style={styles.col3}>
                    <Text style={styles.tableText}>09</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* </ImageBackground> */}
          </Animated.View>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingVertical: 41,
            paddingHorizontal: 20,
            paddingBottom: 230,
          }}
        >
          {horoscopes.map((item, index) => {
            var planet = planets.find(({ name }) => name == item.name);
            if (!planet) {
              planet = planets[0];
            }
            return (
              <View style={styles.itemHoroscope} key={index}>
                {tabSelection == "table" && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent:
                        index % 2 == 1 ? "flex-start" : "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {index % 2 == 1 ? (
                      <>
                        <Image
                          source={{
                            uri: `${SERVER_BASE_URL}/planets/${item.name}.png`,
                          }}
                          style={{ width: 61, height: 61 }}
                        />
                        <Text style={styles.itemHoroscopeTitle}>
                          {item.name} in {item.sign}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.itemHoroscopeTitle}>
                          {item.name} in {item.sign}
                        </Text>
                        <Image
                          source={{
                            uri: `${SERVER_BASE_URL}/planets/${item.name}.png`,
                          }}
                          style={{ width: 61, height: 61 }}
                        />
                      </>
                    )}
                  </View>
                )}

                {tabSelection == "natal" && (
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: index % 2 == 0 ? "flex-end" : "flex-start",
                    }}
                  >
                    <Image
                      source={{
                        uri: `${SERVER_BASE_URL}/planet_icons/${item.name}.png`,
                      }}
                      style={{ width: 40, height: 40, padding: 4,margin:3 }}
                    />
                    <Text
                      style={{
                        color: "#FDE74D",
                        fontSize: 18,
                        fontWeight: "500",
                        padding: 4,
                      }}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                    <Text
                      style={{
                        color: "#FDE74D",
                        fontSize: 14,
                        fontWeight: "300",
                        padding: 4,
                      }}
                    >
                      {item.sign.toUpperCase()} ,
                      {Math.round(planet.normDegree * 100) / 100}
                    </Text>
                    <Text
                      style={{
                        color: "#FDE74D",
                        fontSize: 14,
                        fontWeight: "300",
                        padding: 4,
                      }}
                    >
                      {planet.house} HOUSE
                    </Text>
                  </View>
                )}

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    width: "100%",
                    color: "#FFFFFF",
                  }}
                >
                  {detailId == index
                    ? item.forecast
                    : item.forecast[0].substring(0, 200) + "..."}
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                  onPress={() => setDetailId(detailId == index ? -1 : index)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#FDE74D",
                      marginRight: 8,
                    }}
                  >
                    Details
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#FDE74D" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default UserInfoScreen = ({ route, navigation }) => {
  const windowWidth = Dimensions.get("screen").width;
  const insets = useSafeAreaInsets();
  const [rootTabAction, changeTabRoot] = useState("update");
  const userinfo = useAppStore((state) => state.userinfo);

  const animatedLeft = useRef(new Animated.Value(0)).current;

  const slideLeft = () => {
    Animated.timing(animatedLeft, {
      toValue: -1 * windowWidth,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const slideRight = () => {
    Animated.timing(animatedLeft, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const [imageUri, setImageUri] = useState(
    `${SERVER_BASE_URL}/avatars/${userinfo.avatar}`
  );

  const { navigatekey } = route.params;

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
      style={{ width: "100%", paddingBottom: 100, height: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 42,
          position: "relative",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              //   justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingBottom: 10,
              paddingTop: 10 + insets.top,
            }}
            onPress={navigation.goBack}
          >
            <MaterialIcons name="keyboard-arrow-left" size={23} color="white" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 400,
                marginLeft: 5,
              }}
            >
              User0004
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 400,
                marginLeft: 5,
              }}
            >
              @user0004
            </Text>
          </TouchableOpacity>
          <View style={{ ...styles.userWraper, marginLeft: 40 }}>
            <View style={styles.userItem}>
              <MaterialCommunityIcons
                name="record-circle-outline"
                size={14}
                color="white"
              />
              <Text style={styles.userItemText}>Leo</Text>
            </View>
            <View style={styles.userItem}>
              <Ionicons name="moon-outline" size={14} color="white" />
              <Text style={styles.userItemText}>Aries</Text>
            </View>
            <View style={styles.userItem}>
              <MaterialCommunityIcons name="arrow-up" size={14} color="white" />
              <Text style={styles.userItemText}>Aquarius</Text>
            </View>
          </View>
        </View>
        <Avatar.Image
          size={70}
          source={require("../../assets/images/avatar.png")}
          style={{
            width: 70,
            height: 70,
            position: "absolute",
            right: 35,
            top: 35,
          }}
        />
      </View>
      <View style={styles.rootTabbar}>
        <TouchableOpacity
          onPress={() => {
            if (rootTabAction != "update") {
              slideRight();
              changeTabRoot("update");
            }
          }}
        >
          <Text
            style={[
              styles.rootTabBtn,
              rootTabAction == "update" && styles.tabActive,
            ]}
          >
            UPDATES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (rootTabAction != "chart") {
              slideLeft();
              changeTabRoot("chart");
            }
          }}
        >
          <Text
            style={[
              styles.rootTabBtn,
              rootTabAction == "chart" && styles.tabActive,
            ]}
          >
            CHART
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <UpdatesScreen
          navigatekey={navigatekey}
          animatedStyle={{
            transform: [{ translateX: animatedLeft }],
          }}
        />
        <ChartScreen
          animatedStyle={{
            transform: [{ translateX: animatedLeft }],
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  userWraper: {
    flexDirection: "row",
    alignItems: "center",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  userItemText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 5,
  },
  rootTabbar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#101E4A",
    borderBottomWidth: 0.5,
    borderColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: 12,
    shadowOpacity: 0.15,
  },
  rootTabBtn: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 500,
    padding: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: "#BB98F3",
  },
  updateTabText: { color: "#FFFFFF", fontSize: 16, fontWeight: 500 },
  tabActive: { borderBottomColor: "#BB98F3", borderBottomWidth: 2 },
  tableFiled: {
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    width: "100%",
    height: 35,
  },
  tableText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 500,
    // textAlign: "center",
  },
  day: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 10,
    fontWeight: 400,
    borderWidth: 1,
    padding: 3,
    borderColor: "transparent",
  },
  today: {
    backgroundColor: "#BB98F3",
    borderRadius: 10,
    // height: 18,
    color: "#000000",
    padding: 3,
  },
  activeDay: {
    borderColor: "#BB98F3",
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    // height: 18,
  },
  row: { flexDirection: "row" },
  col1: {
    flex: 0.38,
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  col2: {
    flex: 0.43,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },
  col3: { flex: 0.19, paddingVertical: 8, paddingHorizontal: 10 },
  cellBorderBottom: {
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1,
  },
  itemHoroscope: {
    flexDirection: "column",
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: "#FFFFFF",
    paddingVertical: 16,
  },
  itemHoroscopeTitle: {
    color: "#FDE74D",
    fontSize: 18,
    fontWeight: 500,
    marginRight: 8,
  },
});
