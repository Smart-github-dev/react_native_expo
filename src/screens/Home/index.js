import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Moment from "moment";

import { useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { navigationKeys } from "../../actions";
import GradientCard from "../../components/GradientCard";
import { getSignFromDate } from "../../utils/Astrology";
import {
  getHoroscopeToday,
  getTodayHints,
} from "../../actions/horoscopeAction";

export default function HomeScreen({ navigation }) {
  const [subscribeModalVisible, setSubscribeModalVisible] = useState(false);
  const [isExpendedHoroScope, setExpendedHoroscope] = useState(false);
  const [sign, setSign] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [hints, setHints] = useState([
    "Believe in yourself",
    "Power in work and spirituality",
    "Trouble with thinking & creativity and sex & love",
  ]);
  const insets = useSafeAreaInsets();
  const userinfo = useAppStore((state) => state.userinfo);
  const onPressDateType = (id) => {
    navigation.navigate(navigationKeys.USERINFO, { navigatekey: id });
  };

  const onHandleHoroscope = () => {
    setExpendedHoroscope(!isExpendedHoroScope);
  };

  const fetchHoroscope = () => {
    getHoroscopeToday(sign).then((data) => {
      setHoroscope(data);
    });
  };

  const fetchTodayHints = () => {
    getTodayHints(sign).then((data) => {
      setHints(Object.values(data));
    });
  };

  useEffect(() => {
    if (!userinfo) {
      navigation.navigate(navigationKeys.LOGIN);
    } else {
      setSubscribeModalVisible(true);
      const sign = getSignFromDate(userinfo.birth);
      setSign(sign);
      fetchHoroscope();
      // fetchTodayHints();
    }
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView overScrollMode="never">
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
          style={{ width: "100%" }}
        >
          <View style={{ position: "absolute", left: 50, top: 0 }}>
            <Image source={require("../../assets/images/Circlestock.png")} />
          </View>
          <View
            style={{ position: "absolute", left: 200, top: 70 + insets.top }}
          >
            <Image
              source={require("../../assets/images/Vector.png")}
              style={{ width: 155, height: 154 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: insets.top + 12,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate(navigationKeys.CHATBOT);
              }}
            >
              <Image
                source={require("../../assets/images/chat.png")}
                style={{ width: 34, height: 34 }}
              ></Image>
            </TouchableOpacity>
            <View
              style={{ width: 145, flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={{ width: 140, height: 48 }}
                source={require("../../assets/images/homemark.png")}
              />
            </View>
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={() => navigation.navigate(navigationKeys.NOTIFICATION)}
            >
              <FontAwesome5 name="bell" size={34} color="white" />
              <Octicons
                name="dot-fill"
                style={{ position: "absolute", top: 0, right: 0 }}
                size={16}
                color="red"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "column", paddingLeft: 15, paddingTop: 30 }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF" }}>
              Hello User,
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#FFFFFF",
                marginTop: 8,
              }}
            >
              Welcome to
            </Text>
            <Text style={{ fontSize: 26, fontWeight: 600, color: "#FFFFFF" }}>
              Zodiac
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#FFFFFF",
                marginTop: 25,
              }}
            >
              {sign}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: "#FFFFFF" }}>
              {Moment().format("DD MMM YYYY / H:mm a")} NAPALES
            </Text>
          </View>
          <GradientCard
            // colors={["#404BB0", "#0811687D"]}
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
                {hints[0]}
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
                {hints[1]}
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
                {hints[2]}
              </Text>
            </View>
            {/* <View style={{ flexDirection: "row", paddingTop: 16 }}>
              <SimpleLineIcons name="magic-wand" size={16} color="yellow" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                {hints[3]}
              </Text>
            </View> */}
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: 500,
                marginVertical: 16,
              }}
            >
              {isExpendedHoroScope
                ? horoscope
                : horoscope.substring(0, 100) + "..."}
            </Text>
            {horoscope.length > 100 ? (
              <TouchableOpacity onPress={onHandleHoroscope}>
                <Text style={{ color: "white" }}>
                  {isExpendedHoroScope ? "LESS" : "MORE"}{" "}
                  <AntDesign name="arrowright" size={14} color="white" />
                </Text>
              </TouchableOpacity>
            ) : null}
          </GradientCard>
          <View style={{ position: "relative", width: "100%", height: 144 }}>
            <ScrollView horizontal style={{ position: "absolute" }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 16,
                  marginVertical: 24,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    onPressDateType("Daily");
                  }}
                >
                  <GradientCard
                    style={{
                      backgroundColor: "#E5CCE3",
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 16,
                      marginRight: 20,
                      width: 102,
                    }}
                  >
                    <Text style={{ fontWeight: 500, color: "white" }}>
                      Tomorrow
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        paddingTop: 8,
                        color: "white",
                      }}
                    >
                      {Moment().add(1, "days").format("DD MMM")}
                    </Text>

                    <AntDesign
                      name="arrowright"
                      size={14}
                      color="white"
                      style={{ paddingTop: 8 }}
                    />
                  </GradientCard>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onPressDateType("Weekly");
                  }}
                >
                  <GradientCard
                    style={{
                      backgroundColor: "#E5CCE3",
                      borderRadius: 10,
                      paddingHorizontal: 8,
                      paddingVertical: 16,
                      marginRight: 20,
                      width: 102,
                    }}
                  >
                    <Text style={{ fontWeight: 500, color: "white" }}>
                      Weekly
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        paddingTop: 8,
                        color: "white",
                      }}
                    >
                      {Moment().startOf("week").format("DD")} to{" "}
                      {Moment().endOf("week").format("DD")}{" "}
                      {Moment().format("MMM")}
                    </Text>

                    <AntDesign
                      name="arrowright"
                      size={14}
                      style={{ paddingTop: 8 }}
                      color="white"
                    />
                  </GradientCard>
                </TouchableOpacity>

                <GradientCard
                  style={{
                    backgroundColor: "#E5CCE3",
                    borderRadius: 10,
                    paddingHorizontal: 19.5,
                    paddingVertical: 16,
                    marginRight: 20,
                    width: 102,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onPressDateType("Monthly");
                    }}
                  >
                    <Text style={{ fontWeight: 500, color: "white" }}>
                      Monthly
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        paddingTop: 8,
                        color: "white",
                      }}
                    >
                      {Moment().format("MMMM")}
                    </Text>

                    <AntDesign
                      name="arrowright"
                      size={14}
                      color="white"
                      style={{ paddingTop: 8 }}
                    />
                  </TouchableOpacity>
                </GradientCard>
                <GradientCard
                  style={{
                    backgroundColor: "#E5CCE3",
                    borderRadius: 10,
                    paddingHorizontal: 19.5,
                    paddingVertical: 16,
                    marginRight: 20,
                    width: 102,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onPressDateType("Yearly");
                    }}
                  >
                    <Text style={{ fontWeight: 500, color: "white" }}>
                      Yearly
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        paddingTop: 8,
                        color: "white",
                      }}
                    >
                      MAY
                    </Text>

                    <AntDesign
                      name="arrowright"
                      size={14}
                      color="white"
                      style={{ paddingTop: 8 }}
                    />
                  </TouchableOpacity>
                </GradientCard>
              </View>
            </ScrollView>
          </View>
          <View>
            {/* <ImageBackground
              source={require("../../assets/images/introducing.png")}
              style={{ width: "100%", height: 513, position: "relative" }}
            >
              <Image
                source={require("../../assets/images/line-dash.png")}
                style={{
                  position: "absolute",
                  width: 193,
                  height: 260,
                  transform: [{ translateX: 100 }, { translateY: 100 }],
                }}
              ></Image>
              <View
                style={{
                  flexDirection: "column",
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  height: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Introducing
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: "90%",
                    // backgroundColor: "red",
                    position: "relative",
                    top: 0,
                    left: 0,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={[
                      styles.intro_card,
                      styles.letf_pos,
                      { marginTop: 0 },
                    ]}
                  >
                    <Text style={styles.intro_content}>
                      Find new way to express affection
                    </Text>
                  </View>
                  <View style={[styles.intro_card, styles.right_pos]}>
                    <Text style={styles.intro_content}>
                      See the larger picture of your relationship
                    </Text>
                  </View>
                  <View style={[styles.intro_card, styles.letf_pos]}>
                    <Text style={styles.intro_content}>
                      Understand how you each operate
                    </Text>
                  </View>
                  <View style={[styles.intro_card, styles.right_pos]}>
                    <Text style={styles.intro_content}>
                      Learn to open up to each other
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "white",

                      borderColor: "#FFFFFF",

                      borderBottomWidth: 1,
                    }}
                  >
                    SELECT YOUR PARTNER
                  </Text>
                </View>
              </View>
            </ImageBackground> */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={subscribeModalVisible}
              onRequestClose={() => {
                setSubscribeModalVisible(!subscribeModalVisible);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  // marginTop: insets.top,
                  // backgroundColor: "#FFFFFF30",
                }}
              >
                <View
                  style={{
                    width: 300,
                  }}
                >
                  <GradientCard
                    style={{
                      backgroundColor: "#E5CCE3",
                      padding: 16,
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "white",
                        marginBottom: 20,
                      }}
                    >
                      Subscription
                    </Text>
                    <TouchableOpacity
                      style={{ position: "absolute", right: 10, top: 10 }}
                      onPress={() =>
                        setSubscribeModalVisible(!subscribeModalVisible)
                      }
                    >
                      <MaterialCommunityIcons
                        name="window-close"
                        size={22}
                        color="#757b93"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "white",
                        marginBottom: 20,
                      }}
                    >
                      Unlock the secrets of the stars with our premium astrology
                      app subscription today!
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSubscribeModalVisible(false);
                        navigation.navigate(navigationKeys.MEMBERSHIP);
                      }}
                      style={{
                        borderRadius: 39,
                        backgroundColor: "#5F66FD",
                        paddingHorizontal: 47,
                        paddingVertical: 15,
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "white",
                        }}
                      >
                        GO PRO{" "}
                        <AntDesign name="arrowright" size={14} color="white" />{" "}
                        TRANSCEND
                      </Text>
                    </TouchableOpacity>
                  </GradientCard>
                </View>
              </View>
            </Modal>

            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 38,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                Through {Moment().format("dddd")}
              </Text>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 500,
                  marginVertical: 16,
                  color: "#8F9CF9",
                }}
              >
                Stand up for yourself.
              </Text>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 14,
                  paddingHorizontal: 30,
                  color: "#FFFFFF",
                }}
              >
                Your competitive spirits are high today. Winning isn’t the
                point, but there is self-confidence to be gained. There is no
                wrong way to do this.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 141,
                    borderRadius: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#FFFFFF",
                  }}
                >
                  <GradientCard
                    colors={["#666DFC", "#B49AF1"]}
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: 400,
                        textAlign: "center",
                      }}
                    >
                      Do
                    </Text>
                  </GradientCard>

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Palettes
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Tulle
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Take a bow
                  </Text>
                </View>
                <View
                  style={{
                    width: 141,
                    borderRadius: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#FFFFFF",
                  }}
                >
                  <GradientCard
                    colors={["#666DFC", "#B49AF1"]}
                    style={{
                      width: "100%",
                      paddingVertical: 10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: 400,
                        textAlign: "center",
                      }}
                    >
                      Don’t
                    </Text>
                  </GradientCard>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Black and white
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Facades
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 500,
                      padding: 5,
                    }}
                  >
                    Square one
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 16,
                  paddingHorizontal: 20,
                  color: "#FFFFFF",
                }}
              >
                Peaked last Wednesday
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  textAlign: "center",
                  color: "#8F9CF9",
                  marginTop: 58,
                }}
              >
                Connect with your friends
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  textAlign: "center",
                  color: "#FFFFFF",
                  paddingHorizontal: 15,
                  marginTop: 5,
                }}
              >
                Vulnerability creates friendship. Add friends to understand how
                the planets affecting them and know to reach out.
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#5F66FD",
                  borderRadius: 39,
                  borderWidth: 1,
                  paddingVertical: 14,
                  marginHorizontal: 16,
                  marginTop: 10,
                  marginBottom: 60,
                }}
                onPress={() => navigation.navigate(navigationKeys.ADDFRIEND)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFFFFF",
                    width: "100%",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Add Friends
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  intro_content: {
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    textAlign: "center",
  },
  intro_card: {
    backgroundColor: "#101E4A",
    padding: 10,
    width: 158,
    borderRadius: 16,
    marginTop: 20,
  },
  right_pos: {
    transform: [{ translateY: 0 }, { translateX: 50 }, { rotate: "18deg" }],
  },
  letf_pos: {
    transform: [{ translateY: 0 }, { translateX: -80 }, { rotate: "-18deg" }],
  },
});
