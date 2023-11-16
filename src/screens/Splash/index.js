import AppIntroSlider from "react-native-app-intro-slider";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import GradientCard from "../../components/GradientCard";

import { useAppStore } from "../../store";
import { navigationKeys } from "../../actions";

import splash1 from "../../assets/images/splash1.png";
import splash2 from "../../assets/images/splash2.png";
import splash3 from "../../assets/images/splash3.png";
import splash4 from "../../assets/images/splash4.png";

export default function SplashScreen({ navigation }) {
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;

  const authorized = useAppStore((state) => state.authorized);

  const gotoNextPage = () => {
    if (!authorized) {
      navigation.navigate(navigationKeys.LOGIN);
    } else {
      navigation.navigate(navigationKeys.MAINPAGE);
    }
  };

  const slides = [
    {
      key: 1,
      content: (
        <ImageBackground
          source={splash1}
          style={{ width: windowWidth, height: windowHeight }}
        ></ImageBackground>
      ),
    },
    {
      key: 2,
      content: (
        <ImageBackground
          source={splash2}
          style={{ width: windowWidth, height: windowHeight }}
        />
      ),
    },
    {
      key: 3,
      content: (
        <ImageBackground
          source={splash3}
          style={{ width: windowWidth, height: windowHeight }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // paddingHorizontal: 18,

              height: "100%",
              position: "relative",
              flexDirection: "column",
              // top: 0,
            }}
          >
            <Image
              source={require("../../assets/images/splash3-alert.png")}
              style={{
                width: 329,
                height: 239,
                position: "absolute",
              }}
            ></Image>
            <View
              style={{
                borderRadius: 32,
                backgroundColor: "#BB98F3",
                width: 251,
                height: 42,
                position: "relative",
                top: -115,
                paddingHorizontal: 20,
                flexDirection: "column",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: 700 }}
              >
                April 24 - May 10
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 12, fontWeight: 500 }}
              >
                Pluto square natal mercury
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                width: 329,
                height: 239,
                padding: 24,
                paddingTop: 40,
              }}
            >
              <ScrollView>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 24,
                    color: "#FFFFFF",
                    textAlign: "justify",
                  }}
                >
                  Because of an impulsive decision, there will be a chance
                  opportunity that affects your natural sense of imagination.
                  there will be an opportunity that you can use to get what you
                  really want. Resist cynicism and be courageous.
                </Text>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      ),
    },
    {
      key: 4,
      content: (
        <View style={styles.container}>
          <Image
            source={splash4}
            style={{
              width: windowWidth,
              height: windowHeight,
            }}
          />
          <View style={styles.userListWrapper}>
            <Text style={styles.title}>Add friends to see how</Text>
            <Text style={{ ...styles.title, marginBottom: 8 }}>
              compatible you are.
            </Text>

            <GradientCard style={styles.userWrapper}>
              <Text style={styles.username}>User01</Text>
              <View style={styles.userItems}>
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
                  <Text style={styles.userItemText}>Aquarius</Text>
                </View>
              </View>
            </GradientCard>
            <GradientCard style={styles.userWrapper}>
              <Text style={styles.username}>User02</Text>
              <View style={styles.userItems}>
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
                  <Text style={styles.userItemText}>Leo</Text>
                </View>
                <View style={styles.userItem}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    size={14}
                    color="white"
                  />
                  <Text style={styles.userItemText}>Cancer</Text>
                </View>
              </View>
            </GradientCard>
            <GradientCard style={styles.userWrapper}>
              <Text style={styles.username}>User03</Text>
              <View style={styles.userItems}>
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
            </GradientCard>
          </View>
        </View>
      ),
    },
  ];

  const RenderItem = ({ item }) => {
    return item.content;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={gotoNextPage}
        activeOpacity={0}
        renderDoneButton={() => {
          return (
            <Text
              style={{
                width: 120,
                height: 36,
                borderRadius: 8,
                paddingRight: 12,
                paddingTop: 8,
                textAlign: "center",
                paddingBottom: 8,
                paddingLeft: 12,
                backgroundColor: "#5F66FD",
                fontSize: 14,
                fontWeight: 600,
                color: "#FFFFFF",
                // fontFamily: "Articulat CF",
              }}
            >
              GET STARTED
            </Text>
          );
        }}
        renderNextButton={() => {
          return (
            <View style={{ width: 35, height: 35, marginTop: 5 }}>
              <Image
                source={require("../../assets/images/next-splash.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          );
        }}
        dotStyle={{
          backgroundColor: "#D2D2D2",
          width: 19,
          height: 6,
          borderRadius: 8,
          position: "relative",
          left: -100,
        }}
        activeDotStyle={{
          backgroundColor: "rgba(95, 102, 253, 1)",
          width: 42,
          height: 6,
          borderRadius: 8,
          position: "relative",
          left: -100,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  activeRetangle: {
    width: 42,
    height: 6,
    backgroundColor: "#FDE74D",
    borderRadius: 6,
    marginLeft: 5,
  },
  inactiveRetangle: {
    width: 19,
    height: 6,
    backgroundColor: "#D2D2D2",
    borderRadius: 6,
    marginLeft: 5,
  },
  userListWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    paddingTop: 100,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 34,
    paddingLeft: 11,
    paddingRight: 16,
  },
  steps: {
    flexDirection: "row",
  },
  btnStart: {
    width: 114,
    height: 40,
    borderRadius: 8,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
    backgroundColor: "#FDE74D",
    fontSize: 14,
    fontWeight: 600,
    color: "#282A47",
    // fontFamily: "Articulat CF",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 600,
  },
  userWrapper: {
    marginTop: 24,
    borderRadius: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: "#100F0FB2",
    width: "100%",
  },
  username: {
    color: "#FFFFFF",
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
    marginLeft: 5,
  },
});
